# Como trocar a ficha do Iogui 2.7 pelo GitHub

A ficha fica em um arquivo `.json` separado. O HTML não precisa ser alterado quando você muda o programa.

## Configuração da ficha remota

1. Suba `ficha-iogui.json` em um repositório do GitHub.
2. Abra o arquivo, use **Raw** e copie o endereço.
3. No Iogui: **Ajustes → Ficha de exercícios**.
4. Cole o endereço e toque em **Buscar atualização**.

A partir daí, o app guarda uma cópia local e, quando abre, tenta atualizar a ficha **antes de abrir automaticamente o treino do dia**. Se a rede estiver lenta ou offline, ele continua com a última cópia válida.

## Trocar a ficha

Edite o JSON no GitHub e aumente `versao`. Na próxima abertura, a nova ficha será buscada. Para forçar a verificação, use **Buscar atualização**.

## Ficha padrão e arquivo local

- **Ficha padrão**: volta ao programa embutido e **desativa a atualização remota**. O histórico é mantido.
- **Carregar arquivo**: usa um JSON do próprio aparelho e **pausa a atualização remota** até você cadastrar uma URL novamente.

## Proteções da 2.7

- `weekday` só aceita 0 a 6 e dois treinos não podem ocupar o mesmo dia.
- `rest` precisa estar entre 15 e 300 segundos.
- `range` precisa conter dois números válidos e crescentes.
- `kind` precisa ser `strength`, `bird`, `plank`, `pallof` ou `curl`.
- IDs de exercícios são validados; não mude um ID de um exercício com histórico se quiser preservar a associação das cargas.
- `tip` aceita apenas `<b>`, `<strong>` e `<br>`; outros HTMLs são neutralizados.
- Se uma ficha nova for incompatível com um treino aberto (IDs, ordem ou tipo dos campos mudarem), a sessão aberta é encerrada para evitar misturar dados.
- Um treino já concluído no dia não é aberto automaticamente de novo; ainda é possível repeti-lo manualmente.

## Sinal vermelho

Ao marcar vermelho, o app cancela qualquer avanço automático e mostra o alerta. Você pode:

- tocar em **Foi engano · limpar** para remover a marcação; ou
- tocar em **Continuar no treino** para manter o vermelho registrado e voltar ao treino. O avanço permanece manual.

Se a marcação vermelha representar de fato dor irradiada, choque, formigamento, dormência ou fraqueza, a orientação exibida pelo app é interromper o exercício e procurar avaliação profissional.
