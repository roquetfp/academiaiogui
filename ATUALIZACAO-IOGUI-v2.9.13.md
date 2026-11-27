# Iogui v2.9.13 — correção manual da data do treino

Base: v2.9.12, preservando a ficha oficial "Ficha 3 — carregamento e piano · Big 3 em bloco próprio" (2026-11-23).

## O que mudou

- Novo campo opcional `dataManual` em cada treino salvo.
- `iso` e `started` nunca são sobrescritos.
- Ao finalizar uma sessão aberta em dia anterior, o diálogo pergunta em que dia o treino aconteceu.
- Se a data de hoje for mantida, não cria correção manual.
- Na aba Progresso, cada treino salvo ganhou `📅 Corrigir data`.
- O diálogo permite salvar uma data ou `Voltar ao original` quando já existe correção.
- Datas futuras são recusadas.
- Datas anteriores ao início do programa são aceitas com aviso.
- A hora original de `iso` é preservada ao mudar apenas o dia.
- Registros com `started` e `iso` em dias diferentes aparecem com `⚠ aberto em DD/MM` até serem conferidos.
- No topo de Progresso aparece a quantidade de treinos com data a conferir; o botão filtra a lista.
- Sessões antigas ainda abertas geram um diálogo com: Finalizar agora / Continuar o treino / Descartar.
- A data efetiva (`dataManual` quando existe; caso contrário `iso`) passou a alimentar calendário, histórico, evolução, último treino, meta semanal e Braço da Constância.
- Sopro Firme e cardio não foram alterados.

## Ficha

A ficha oficial incorporada nesta versão é a de 2026-11-23, com A/B/C em `musculacao` e D em `coluna`, incluindo Farmer hold e Y-W de bruços.

## Testes realizados

- Sintaxe de `app.js` e `sw.js` validada pelo Node.
- HTML sem IDs duplicados.
- CSP mantida com JavaScript externo (`app.js`), sem script inline.
- Execução do app em Chromium isolado sem erros de JavaScript.
- Backup de 21/11: 20 treinos preservados, 0 datas originais alteradas automaticamente e 0 `dataManual` criados na migração.
- Os 12 registros do backup com `started` e `iso` em dias diferentes continuam apenas sinalizados para revisão.
- Correção manual preserva `iso` e `started` e muda apenas a data efetiva.
- Sessão antiga: campo de data visível e preenchido com hoje.
- Sessão aberta hoje: nenhum campo extra.
- Manter hoje ao finalizar: `dataManual` permanece vazio.
- Aviso de sessão esquecida não se repete na mesma abertura após escolher Continuar.

Observação: a navegação HTTP local do Chromium do ambiente de geração é bloqueada por política administrativa. A execução foi validada em Chromium por conteúdo carregado no navegador e, separadamente, a CSP foi verificada estruturalmente.

## Arquivos para substituir no GitHub

- `index.html`
- `app.js`
- `sw.js`
- `ficha-iogui.json`
