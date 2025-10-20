// ⚙️ Configuração das APIs
// IMPORTANTE: NO GITHUB, SUBSTITUA ESSAS KEYS POR VARIÁVEIS DE AMBIENTE

const CONFIG = {
    // API-Football
    apiFootball: {
        key: '9c656a1524e4fd45f5aa7c8c8325b246',
        baseUrl: 'https://v3.football.api-sports.io'
    },
    
    // OpenAI (ChatGPT)
    openai: {
        key: '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',
        baseUrl: 'https://api.openai.com/v1'
    },
    
    // Firebase (VOCÊ VAI PREENCHER)
    firebase: {
        apiKey: "SUA_API_KEY_AQUI",
        authDomain: "SEU_PROJETO.firebaseapp.com",
        databaseURL: "https://SEU_PROJETO.firebaseio.com",
        projectId: "SEU_PROJETO",
        storageBucket: "SEU_PROJETO.appspot.com",
        messagingSenderId: "SEU_ID",
        appId: "SEU_APP_ID"
    },
    
    // IDs das Ligas
    leagues: {
        brasileiraoA: { id: 71, nome: 'Brasileirão Série A', pais: 'Brasil' },
        brasileiraoB: { id: 72, nome: 'Brasileirão Série B', pais: 'Brasil' },
        premierLeague: { id: 39, nome: 'Premier League', pais: 'Inglaterra' },
        laLiga: { id: 140, nome: 'La Liga', pais: 'Espanha' },
        bundesliga: { id: 78, nome: 'Bundesliga', pais: 'Alemanha' },
        serieA: { id: 135, nome: 'Serie A', pais: 'Itália' },
        ligue1: { id: 61, nome: 'Ligue 1', pais: 'França' }
    },
    
    // Times por Liga (API-Football Team IDs)
    teams: {
        brasileiraoA: [
            { id: 131, nome: 'Palmeiras' },
            { id: 127, nome: 'Flamengo' },
            { id: 134, nome: 'Cruzeiro' },
            { id: 150, nome: 'Botafogo' },
            { id: 124, nome: 'São Paulo' },
            { id: 126, nome: 'Corinthians' },
            { id: 128, nome: 'Fluminense' },
            { id: 123, nome: 'Atlético Mineiro' },
            { id: 125, nome: 'Internacional' },
            { id: 129, nome: 'Grêmio' },
            { id: 130, nome: 'Vasco' },
            { id: 120, nome: 'Santos' },
            { id: 1207, nome: 'Bahia' },
            { id: 149, nome: 'Fortaleza' },
            { id: 1193, nome: 'Red Bull Bragantino' },
            { id: 1192, nome: 'Ceará' },
            { id: 151, nome: 'Juventude' },
            { id: 1204, nome: 'Vitória' },
            { id: 2282, nome: 'Mirassol' },
            { id: 138, nome: 'Sport' }
        ]
    }
};