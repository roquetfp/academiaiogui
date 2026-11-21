# Iogui v2.9.7 — dificuldade + calendário + Sopro Firme

Versão construída diretamente sobre o estado atual v2.9.5 do repositório e reunindo as mudanças planejadas para a v2.9.6 com a especificação Sopro Firme.

## Mantido/implementado da nossa v2.9.6
- botão **Evolução** em cada exercício, com mini gráfico;
- indicador visível da dificuldade da última execução;
- verde = Fácil, amarelo = Médio, vermelho = Muito difícil;
- a dificuldade ajuda a sugestão de progressão;
- calendário mensal completo de treinos A/B/C, com cores e letras;
- navegação entre meses;
- resposta da lombar removida da interface e dos novos registros. Dados antigos não são reinterpretados.

## Sopro Firme
- cardio independente da musculação;
- Caminhada ×1, Corrida ×2, Natação ×2, Bicicleta ×1,5;
- esforço Leve ×0,8, Moderado ×1, Forte ×1,2;
- `prana = minutos × modalidade × esforço`, arredondado;
- meta de 60 prana por semana;
- semana encerrada com >=60 mantém/incrementa o Sopro; abaixo de 60 derruba e zera a sequência;
- uma sessão após uma queda restaura o estado;
- semana corrente nunca penaliza;
- painel pulsante na Home;
- registro rápido de cardio;
- gráfico de prana das últimas 12 semanas;
- histórico de cardio com exclusão e recálculo imediato.

## Dados/backup
- `cardio` entrou em `defaultData()` e `sanitizarEstado()`;
- backups antigos sem `cardio` continuam válidos;
- export/import preservam cardio;
- máximo de 200 sessões;
- dificuldade dos exercícios agora é sanitizada e salva no próprio histórico.

## GitHub
Substitua somente:
- `index.html`
- `app.js`
- `sw.js`

Não altere ficha, manifesto ou ícones.
