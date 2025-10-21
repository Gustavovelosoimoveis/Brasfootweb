# Manual de Instruções: Brasfoot Web Mobile – Versão Aprimorada

Esta versão do **Brasfoot Web Mobile** inclui melhorias na lógica de simulação de partidas, controle de temporada e a infraestrutura para atualizar automaticamente os elencos dos times usando a API da OpenAI.

## Novidades desta versão

- **Início de temporada fixo:** Sempre que você inicia um novo jogo pelo botão **“Iniciar Jogo”**, a temporada começa a partir da primeira rodada, independentemente da data corrente. O número da rodada é exibido na tela de partida.
- **Simulação mais realista:** A função de simulação de partidas agora considera a força de cada time (com base na quantidade de jogadores) e gera resultados com um leve favoritismo para equipes teoricamente mais fortes. Ainda há um fator de aleatoriedade para manter o jogo imprevisível.
- **Geração automática de elencos (opcional):** Foi adicionado o script `update_roster.py`, que utiliza a API do ChatGPT para buscar jogadores atualizados para cada time. Esse script gera um novo arquivo `data.js` pronto para uso no projeto. Você só precisa fornecer a sua chave da API da OpenAI.
 - **Sugestão de escalação via ChatGPT (opcional):** Também incluímos o script `assistant_coach.py`, que gera uma escalação titular recomendada para qualquer time. Essa funcionalidade pode atuar como um “auxiliar técnico” e salva a sugestão em um arquivo JSON para consulta.

## Estrutura do projeto

```
brasfoot-web-enhanced/
├── index.html          – página principal do jogo
├── game.js             – lógica de interface, simulação (rodadas e partidas) e sugestões de escalação
├── data.js             – lista de times e jogadores (pode ser atualizada pelo script)
├── update_roster.py    – script Python para gerar elencos via OpenAI
└── assistant_coach.py  – script Python para obter escalações titulares via OpenAI
```

### Arquivos principais

- **index.html:** define a interface básica do jogo (início, seleção de times e tela de partida). Nenhuma alteração estrutural foi necessária aqui.
- **game.js:** controla o fluxo da aplicação. Agora existe a variável `currentRound`, que é redefinida para 1 sempre que um novo jogo é iniciado. A simulação de partidas usa a função `simulateScore` para gerar placares ponderados pela força dos times.
- **data.js:** contém um array de objetos `teams` com os times e seus respectivos jogadores. Caso utilize o script Python, este arquivo será regenerado com novos jogadores.
- **update_roster.py:** script para ser executado em ambiente de backend. Ele consulta a API da OpenAI (ChatGPT) para gerar jogadores para cada clube. O resultado é escrito em `data.js`. **Não execute este script no navegador**, pois exporá sua chave da API.
 - **assistant_coach.py:** script opcional que consulta o ChatGPT para sugerir uma escalação titular realista para um time específico. Salva a sugestão em um arquivo JSON. Deve ser executado em ambiente de backend.

## Como atualizar os elencos com ChatGPT

1. Instale a biblioteca `openai` no seu ambiente de desenvolvimento:
   ```bash
   pip install openai
   ```
2. Tenha em mãos a sua chave de API da OpenAI (por exemplo, `sk-...`).
3. No terminal, execute o script:
   ```bash
   python update_roster.py --api-key SUA_API_KEY
   ```
   Opcionalmente, você pode definir a variável de ambiente `OPENAI_API_KEY` e omitir o argumento `--api-key`.
4. O script criará (ou sobrescreverá) o arquivo `data.js` com os novos elencos.
5. Substitua o `data.js` da sua aplicação pelo arquivo gerado e atualize o projeto no GitHub/Vercel se necessário.

> **Observação:** A chamada à API do ChatGPT gera custos de uso. Ajuste o número de jogadores por time (parâmetro `--players-per-team`) conforme sua necessidade para reduzir custos.

## Como obter uma escalação sugerida (auxiliar técnico)

Caso queira usar o ChatGPT para gerar uma escalação ideal para um time, siga os passos abaixo utilizando o script `assistant_coach.py`:

1. Instale a biblioteca `openai` (caso ainda não tenha feito) e defina sua chave da API.
2. No terminal, execute o comando:
   ```bash
   python assistant_coach.py --team "Nome do Time" --api-key SUA_API_KEY --output escalação.json
   ```
   Substitua "Nome do Time" pelo clube desejado e `escalação.json` pelo arquivo de saída que preferir.
3. O script gerará um arquivo JSON contendo o nome do time e a lista de jogadores recomendados para começar a partida.
4. Você pode abrir esse arquivo para ver a escalação sugerida ou integrar a leitura desse JSON no seu frontend para carregar as escalações automaticamente.

> **Nota:** Assim como o script de atualização de elencos, o uso deste recurso consome créditos de API da OpenAI.

## Executando o projeto localmente

1. Descompacte o arquivo `brasfoot-web-enhanced.zip`.
2. Dentro da pasta, inicie um servidor HTTP simples (por exemplo, com Python):
   ```bash
   python -m http.server 8000
   ```
3. Acesse `http://localhost:8000/brasfoot-web-enhanced/index.html` no seu navegador.
4. Clique em **“Iniciar Jogo”**, escolha dois times diferentes e confirme. A rodada atual será exibida e você poderá simular a partida.

## Implantação no GitHub e Vercel

1. Crie um novo repositório no GitHub ou use um existente.
2. Faça o upload de todos os arquivos da pasta `brasfoot-web-enhanced` para a raiz do repositório.
3. Conecte o repositório ao Vercel. Ele detectará automaticamente o projeto estático e fará o deploy.
4. Se quiser que o jogo use elencos atualizados, execute `update_roster.py` antes de publicar e faça commit do novo `data.js`.

## Possíveis melhorias futuras

- Integrar novamente com uma API de futebol (como api-futebol.com.br) para dados em tempo real de jogos e campeonatos.
- Adicionar modo multiplayer quando a infraestrutura backend estiver pronta.
- Persistir o andamento das temporadas em `localStorage` para permitir continuidade do jogo.

Se precisar de mais alguma coisa ou tiver dificuldades, não hesite em pedir ajuda!