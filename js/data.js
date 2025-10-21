const teams = [
    { id: 'fla', name: 'Flamengo', players: ['Carrascal', 'Arrascaeta', 'Pedro'] },
    { id: 'pal', name: 'Palmeiras', players: ['Vitor Roque', 'Veiga', 'Dudu'] },
    { id: 'bot', name: 'Botafogo', players: ['Tiquinho Soares', 'Savarino', 'Eduardo'] },
    { id: 'flu', name: 'Fluminense', players: ['Cano', 'Ganso', 'André'] },
    { id: 'cor', name: 'Corinthians', players: ['Yuri Alberto', 'Fagner', 'Renato Augusto'] },
    { id: 'sao', name: 'São Paulo', players: ['Calleri', 'Lucas Moura', 'James Rodriguez'] },
    { id: 'int', name: 'Internacional', players: ['Enner Valencia', 'Alan Patrick', 'Wanderson'] },
    { id: 'gre', name: 'Grêmio', players: ['Suárez', 'Cristaldo', 'Villasanti'] },
    { id: 'atl', name: 'Atlético-MG', players: ['Hulk', 'Paulinho', 'Zaracho'] },
    { id: 'cru', name: 'Cruzeiro', players: ['Kaio Jorge', 'Matheus Pereira', 'Rafael Cabral'] },
    { id: 'san', name: 'Santos', players: ['Guilherme', 'Morelos', 'João Paulo'] },
    { id: 'vas', name: 'Vasco', players: ['Pablo Vegetti', 'Payet', 'Medel'] },
    { id: 'bah', name: 'Bahia', players: ['Everaldo', 'Cauly', 'Thaciano'] },
    { id: 'for', name: 'Fortaleza', players: ['Lucero', 'Pikachu', 'Tinga'] },
    { id: 'ath', name: 'Athletico-PR', players: ['Vitor Roque', 'Canobbio', 'Fernandinho'] },
    { id: 'rbb', name: 'Red Bull Bragantino', players: ['Eduardo Sasha', 'Helinho', 'Juninho Capixaba'] },
    { id: 'vit', name: 'Vitória', players: ['Osvaldo', 'Luan', 'Wagner Leonardo'] },
    { id: 'juv', name: 'Juventude', players: ['Nenê', 'Jadson', 'Werik Popó'] },
    { id: 'cea', name: 'Ceará', players: ['Erick', 'Vina', 'Richard'] },
    { id: 'mir', name: 'Mirassol', players: ['Gabriel', 'Chico', 'Zé Roberto'] }
];

function getRandomTeam() {
    return teams[Math.floor(Math.random() * teams.length)];
}
