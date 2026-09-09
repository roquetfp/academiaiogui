# Iogui v2.9.1 — script separado do HTML

## O que mudou

O JavaScript saiu de dentro do `index.html` e virou um arquivo próprio, `app.js`.
Com isso, a Content-Security-Policy passou de

    script-src 'self' 'sha256-+PNLUFNmL/...'

para

    script-src 'self'

**Consequência prática: acabou a necessidade de recalcular hash.** Editar o
`app.js` e publicar já funciona. A proteção contra scripts injetados continua
igual — a CSP segue bloqueando qualquer script que não venha do próprio site.

## Arquivos a publicar no GitHub

| Arquivo | Ação |
|---|---|
| `index.html` | substituir |
| `app.js` | **novo — precisa ser adicionado** |
| `sw.js` | substituir |
| `manifest.webmanifest` | manter |
| ícones | manter |
| `ficha-iogui.json` | manter |

Se o `app.js` não for enviado, o app abre em branco.

## Correção no Service Worker

Ao separar o script, apareceu um problema que os testes pegaram: o service worker
servia o `app.js` do cache antes da rede. Uma versão nova publicada no GitHub
**nunca chegaria ao iPhone** — a armadilha do hash teria sido trocada por uma
armadilha de cache.

O `sw.js` foi ajustado: `app.js` e `manifest.webmanifest` passam a ser buscados na
rede primeiro, com o cache apenas como reserva quando não há sinal. Os ícones
continuam vindo do cache, porque são grandes e praticamente não mudam.

## O que foi verificado

Tudo abaixo foi testado num servidor HTTPS real, com navegador de verdade:

- app carrega sem nenhuma recusa de CSP;
- service worker registra e guarda os sete arquivos;
- **editar o `app.js` e recarregar entrega a versão nova**;
- app continua abrindo **offline**, inclusive com a edição mais recente;
- sessão de treino, adicionar e apagar série, descanso pelo relógio, revisão antes
  de finalizar, gravação no histórico, tela de progresso, ajustes e braço da
  constância — todos funcionando.

## Sobre o histórico

Nada nos seus dados muda. Histórico, vídeos, ficha e preferências continuam onde
estavam, no armazenamento do próprio aparelho.
