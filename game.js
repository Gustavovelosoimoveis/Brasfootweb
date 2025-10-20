// 🎮 BRASFOOT WEB - Engine Principal
// © 2025 Gustavo Veloso - Dedicado ao Gustavo Rody Veloso

// Estado Global do Jogo
let gameState = {
    modo: null, // 'offline' ou 'online'
    tecnico: null,
    time: null,
    elenco: [],
    orcamento: 0,
    dataAtual: new Date(2026, 0, 15),
    rodadaAtual: 1,
    historico: [],
    firebase: null
};

// Inicializar App
document.addEventListener('DOMContentLoaded', () => {
    mostrarMenuPrincipal();
    inicializarFirebase();
});

// Firebase
function inicializarFirebase() {
    try {
        firebase.initializeApp(CONFIG.firebase);
        gameState.firebase = firebase.database();
        console.log('✅ Firebase conectado!');
    } catch (error) {
        console.warn('⚠️ Firebase não configurado:', error.message);
    }
}

// Menu Principal
function mostrarMenuPrincipal() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="card">
            <button class="btn" onclick="novoJogo()">🆕 Novo Jogo</button>
            <button class="btn" onclick="carregarJogo()">💾 Carregar Jogo</button>
            <button class="btn" onclick="mostrarOpcoes()">⚙️ Opções</button>
            <button class="btn
