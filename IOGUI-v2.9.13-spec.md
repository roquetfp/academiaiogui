# Iogui — especificação v2.9.13: corrigir a data do treino à mão

Versão de referência: **2.9.12** (`index.html`, `app.js`, `sw.js`,
`manifest.webmanifest`, ícones, `mascote.webp`, `ficha-iogui.json`).

---

## 1. O problema

Quando o usuário abre um treino e esquece de finalizá-lo, o app grava em `iso` o
momento em que ele toca "finalizar", não o dia em que treinou. O histórico, o
calendário e o Braço da Constância ficam com a data errada.

No backup de 21/11/2026, com 20 treinos salvos, **12 têm `started` e `iso` em
dias diferentes**, com atrasos de 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 9 e 14 dias.

### A decisão de projeto que vem antes de tudo

O app guarda `started`, a hora em que a sessão foi aberta. **Não usar `started`
como data do treino.** Abrir o treino no app não é começar a treinar: o usuário
pode abrir em casa, no caminho, ou no dia anterior. `started` é um palpite tão
ruim quanto `iso`, só errado para o outro lado.

**Nenhuma data é reescrita automaticamente em lugar nenhum desta
especificação.** Só o usuário sabe em que dia treinou, então só ele corrige. O
papel do app é dois: facilitar a correção e mostrar quais registros merecem
atenção.

---

## 2. O campo

Um campo novo por sessão do histórico:

```js
dataManual: ""   // ISO; vazio quando não houve correção
```

Leitura, com uma função perto de `weekStart` no `app.js`:

```js
function dataSessao(h){
  const m=isoSeguro(h?.dataManual);
  return m||h?.iso;
}
```

`iso` e `started` **nunca** são sobrescritos. `dataManual` tem precedência na
leitura; os dois originais ficam guardados, o que mantém a correção reversível e
auditável.

Em `sessaoSegura()` (linha 140), acrescentar
`dataManual:isoSeguro(raw.dataManual)` junto de `iso` e `started`. **Sem isso o
campo é descartado silenciosamente na próxima abertura e a correção se perde** —
é o mesmo erro que já aconteceu com `cardio` na 2.9.8 e com `grupo` na 2.9.9.
O backup usa a mesma função na importação, então passa a carregar o campo sem
mudança adicional.

### Onde trocar `h.iso` por `dataSessao(h)`

Todos os pontos onde a data da sessão decide algo, com as linhas da 2.9.12:

| Linha | Função | O que decide |
|---|---|---|
| 319-320 | `semanaCorteBraco` | semana em que a regra nova do braço passa a valer |
| 324 | `countThisWeek` | meta semanal de musculação |
| 330 | contador de musculação do braço | requisito de musculação |
| 347 | `entriesNow` | sessões da semana corrente |
| 352, 354 | laço de semanas do `armState` | semanas acumuladas do braço |
| 480, 484 | "Último treino" na tela inicial | treino e data mostrados |
| 525 | ordenação do `recentItemsFor` | qual execução é a "última" |
| 827, 829 | `renderEvolution` | gráfico de evolução por exercício |
| 1003 | `renderCalendar` | em que dia o círculo aparece |
| 1016 | card do histórico | data exibida |
| 1023 | `askDelete` | data no texto de confirmação |

**Não mexer** nas linhas 188 e 215: aquelas são o `iso` das sessões de **cardio**,
que não têm esse problema. O Sopro Firme fica intacto.

### Ordenação do histórico

`data.history` é mantido do mais recente para o mais antigo. Com datas
corrigidas, a ordem de exibição tem que seguir `dataSessao`, senão um treino
corrigido aparece fora de lugar. Em `renderProgress`, ordenar antes de cortar os
30:

```js
[...data.history]
  .sort((a,b)=>(Date.parse(dataSessao(b))||0)-(Date.parse(dataSessao(a))||0))
  .slice(0,30)
```

---

## 3. Parte 1 — corrigir no momento de finalizar

O jeito mais barato de não precisar corrigir depois.

Quando o usuário toca em finalizar, **se `started` for de um dia anterior ao de
hoje**, o diálogo de conclusão mostra um campo de data, já visível, sem precisar
de nenhum toque extra:

> Este treino foi aberto em 19/11 e você está finalizando em 21/11.
> **Em que dia você treinou?**
> `[ 21/11 ▾ ]`

O campo vem preenchido com **hoje**, não com `started`: hoje é o caso mais
provável quando a diferença é de um ou dois dias, e qualquer preenchimento é só
um ponto de partida que ele troca em dois toques. As duas datas aparecem no texto
para ele escolher com informação.

Quando `started` é do mesmo dia, o diálogo de conclusão fica exatamente como é
hoje — nenhum campo novo, nenhum toque a mais.

Se o usuário escolher uma data diferente de hoje, gravar em `dataManual`.

---

## 4. Parte 2 — corrigir depois, no Progresso

É o que o usuário pediu, e é o caminho principal para os 12 registros que já
estão errados.

### 4.1 Interface

No card do histórico (linha 1016), ao lado do botão de apagar que já existe,
seguindo o mesmo padrão:

```html
<div class="hist-actions">
  <button class="hist-date" data-history-id="...">📅 Corrigir data</button>
  <button class="hist-delete" data-history-id="...">🗑 Apagar este treino</button>
</div>
```

E um diálogo novo no `index.html`, espelhando o `#dlgDelete` que já existe:

```html
<dialog id="dlgData">
  <p id="dataTxt"></p>
  <div class="form-row"><label>Data do treino</label><input id="dataInput" type="date"></div>
  <p class="tiny muted" id="dataAviso"></p>
  <div class="settings-actions">
    <button class="btn sec" id="dataCancel">Cancelar</button>
    <button class="btn sec" id="dataReset">Voltar ao original</button>
    <button class="btn blue" id="dataOk">Salvar data</button>
  </div>
</dialog>
```

`#dataInput` vem com a data efetiva atual (`dataSessao`). `#dataTxt` dá as duas
âncoras que o app conhece, para ele decidir:

> Treino B, hoje marcado em 21/11. A sessão foi aberta em 19/11 e finalizada em
> 21/11.

`#dataReset` limpa `dataManual` e devolve a sessão à data original. **Esconder
esse botão quando `dataManual` estiver vazio.**

### 4.2 Validação

Ao salvar, antes de gravar:

- Data inválida → recusar com aviso, não gravar.
- **Data no futuro → recusar.** Um treino não pode ter acontecido amanhã.
- Data anterior a `data.profile.start` → aceitar, mas avisar que é antes do
  início do programa, para o caso de erro de digitação.
- **Preservar a hora.** O `<input type="date">` devolve só o dia; montar o ISO com
  a hora de `iso`, para que dois treinos do mesmo dia mantenham a ordem entre si.

Construir a data no fuso local, não em UTC: `new Date(ano, mes-1, dia, hh, mm)`.
Usar `new Date("2026-11-19")` direto cria a data em UTC e, no fuso de São Paulo,
cai no dia 18 — toda correção sairia um dia atrasada.

### 4.3 Depois de salvar

Mesmo tratamento do apagar: `save()`, depois `renderProgress()` e `renderHome()`,
e um toast. O diálogo avisa antes:

> Mudar a data pode mover o treino para outra semana. O braço da constância e as
> semanas seguidas serão recalculados na hora.

---

## 5. Parte 3 — mostrar quais registros revisar

Com a correção sendo manual, o usuário precisa saber **quais** dos 20 cards
merecem atenção, sem abrir um por um.

No card do histórico, quando `dataManual` está vazio **e** `started` e `iso` caem
em dias diferentes, mostrar uma marca discreta ao lado da data:

> Treino B · 21/11 ⚠ *aberto em 19/11*

É informação, não acusação: pode estar certo (treinou no 21 e abriu o app antes)
ou errado. A marca só diz "aqui vale conferir". Uma vez que `dataManual` é
preenchido, a marca sai, mesmo que a data escolhida tenha sido a mesma — o
usuário já olhou.

No topo da aba Progresso, uma linha com a contagem:

> 12 treinos com data a conferir.

Clicável, filtrando a lista para só esses. Se forem zero, a linha não aparece.

---

## 6. Parte 4 — avisar da sessão esquecida

Na abertura do app, dentro de `conferirSessao()` (linha 242), que já roda no
`load()`: se existe `data.inProgress` e `started` é de um dia anterior ao de hoje,
avisar antes de deixar a sessão aberta.

```
Você tem o Treino B aberto desde 19/11.

[ Finalizar agora ]  [ Continuar o treino ]  [ Descartar ]
```

- **Finalizar agora**: leva ao fluxo de conclusão da parte 3, com o campo de data
  visível. O app não escolhe a data; ele pergunta.
- **Continuar**: deixa como está — é o caso legítimo de treinar em dois dias. Não
  repetir o aviso na mesma sessão do app.
- **Descartar**: joga a sessão fora, com confirmação.

Não usar `confirm()` nativo para três opções; usar um `<dialog>` no padrão dos que
já existem no app.

---

## 7. Restrições técnicas

**Leia antes de editar.**

1. O JavaScript vive em `app.js`, não dentro do `index.html`. Toda a lógica vai no
   `app.js`.
2. A Content-Security-Policy do `index.html` é `script-src 'self'`. **Não
   reintroduzir script inline** — scripts dentro do HTML são bloqueados pelo
   navegador e o app abre em branco, sem mensagem de erro visível.
3. Subir `APP_VERSAO` para `"2.9.13"` e o cache do `sw.js`
   (`iogui-v2.9.12-shell-v1` → `iogui-v2.9.13-shell-v1`).
4. `iso` e `started` **nunca** são sobrescritos. A correção vive só em `dataManual`.
5. **Nenhuma data é alterada sem o usuário escolher.** Não há migração, não há
   correção em massa, não há "arrumar" registros antigos na abertura.
6. Nenhum dado existente pode ser perdido: histórico, cardio, vídeos, ficha e
   preferências permanecem intactos. `dataManual` é opcional em toda a cadeia de
   sanitização.
7. O Sopro Firme e as sessões de cardio não são tocados.
8. **Implementar apenas estas quatro partes.** Não aproveitar para mexer em outras
   coisas do app.
9. Ao terminar, abrir o app uma vez no navegador e confirmar que não há nenhuma
   recusa de CSP no console.

---

## 8. Checklist de teste

Nada automático:

- [ ] Depois de atualizar, **nenhuma** data do histórico mudou sozinha
- [ ] O número de semanas do braço continua igual ao de antes da atualização
- [ ] Sessões de cardio e o Sopro Firme não mudaram em nada

Correção no fim do treino:

- [ ] Treino aberto ontem e finalizado hoje mostra o campo de data no diálogo
- [ ] O campo vem com a data de hoje, e o texto cita as duas datas
- [ ] Escolher outra data grava em `dataManual`
- [ ] Manter a data de hoje não cria `dataManual`
- [ ] Treino aberto e finalizado no mesmo dia **não** mostra campo nenhum

Correção no Progresso:

- [ ] Corrigir a data move o treino no calendário na hora
- [ ] Corrigir a data recalcula braço, semanas seguidas e meta semanal
- [ ] "Voltar ao original" limpa a correção e devolve a data original
- [ ] "Voltar ao original" não aparece em treino sem correção
- [ ] Data no futuro é recusada
- [ ] Data anterior ao início do programa é aceita com aviso
- [ ] Dois treinos no mesmo dia mantêm a ordem entre si depois da correção
- [ ] Teste de fuso: escolher o dia 1 de um mês salva o dia 1, não o último do mês anterior
- [ ] `dataManual` sobrevive a fechar e reabrir o app
- [ ] `dataManual` sobrevive a exportar e reimportar backup
- [ ] Backup antigo, sem o campo, importa sem erro
- [ ] O histórico aparece em ordem de data corrigida

Marca de revisão:

- [ ] Registro com `started` e `iso` em dias diferentes mostra a marca
- [ ] Registro do mesmo dia não mostra marca
- [ ] A marca sai depois de salvar uma data, mesmo que seja a mesma de antes
- [ ] A contagem no topo bate com o número de cards marcados
- [ ] Com zero registros marcados, a linha de contagem não aparece

Sessão esquecida:

- [ ] Sessão aberta desde ontem faz o diálogo aparecer na abertura
- [ ] "Finalizar agora" abre o fluxo de conclusão com o campo de data
- [ ] "Continuar" mantém a sessão e não repete o diálogo na mesma sessão do app
- [ ] "Descartar" pede confirmação
- [ ] Sessão aberta hoje mesmo não dispara nada

Geral:

- [ ] App abre offline
- [ ] Nenhuma recusa de CSP no console
- [ ] Nenhum erro de JavaScript no console

---

## 9. Decisões deliberadas registradas

**`started` não é a data do treino.** Foi considerado usá-lo para corrigir os 12
registros antigos automaticamente e **descartado**: abrir o treino no app não é
começar a treinar, e o usuário pode abrir em casa, no caminho ou no dia anterior.
Trocaria um dado errado por outro. `started` serve apenas como informação exibida
nos diálogos, para o usuário decidir, e como gatilho das partes 3, 5 e 6.

**Nenhuma correção em massa.** Só o usuário sabe em que dia treinou. O app
facilita e sinaliza; não adivinha.

**A correção vive em `dataManual`, não sobrescreve.** Dá para voltar atrás, e o
histórico nunca perde a informação original.

**A marca de revisão sai quando o usuário salva, mesmo sem mudança.** Salvar a
mesma data é um "já conferi", e é informação tão útil quanto a correção.
