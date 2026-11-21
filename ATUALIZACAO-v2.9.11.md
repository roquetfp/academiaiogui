# Iogui v2.9.11 — interface mais limpa

## Início
- removido o título grande `Hoje é Treino ...`;
- removido o botão `Ver treinos` do quadro superior;
- último treino ganhou destaque discreto e sempre mostra treino + data;
- quadro superior ficou mais baixo: menos padding e mascote mais compacto.

## Treino
- cabeçalho global do Iogui e engrenagem ficam ocultos enquanto um treino está aberto;
- removida a frase `Toque no nome para ver execução, última vez e orientação`;
- indicador da última dificuldade virou apenas um ponto compacto ao lado de `ALVO`;
- removida a frase `Dificuldade para realizar o exercício`;
- controles de dificuldade agora são somente três botões coloridos: verde, amarelo e vermelho;
- mantidos rótulos de acessibilidade nos botões;
- removida a mensagem redundante de valores pré-preenchidos;
- espaçamentos de séries, ferramentas e cabeçalho foram reduzidos.

## Progresso
- título alterado para `Calendário de treinos salvos`;
- calendário usa exclusivamente `data.history`, ou seja, apenas treinos realmente finalizados e salvos;
- o mesmo treino salvo duas vezes no mesmo dia aparece como um único círculo da mesma letra;
- dois treinos diferentes realmente salvos no mesmo dia continuam aparecendo como dois círculos.

## Arquivos para substituir
- `index.html`
- `app.js`
- `sw.js`
