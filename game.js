document.addEventListener('DOMContentLoaded', () => {
    const startGameBtn = document.getElementById('start-game');
    const teamSelectionDiv = document.getElementById('team-selection');
    const player1TeamSelect = document.getElementById('player1-team');
    const player2TeamSelect = document.getElementById('player2-team');
    const confirmTeamsBtn = document.getElementById('confirm-teams');
    const matchScreenDiv = document.getElementById('match-screen');
    const matchInfoP = document.getElementById('match-info');
    const simulateMatchBtn = document.getElementById('simulate-match');
    const matchResultP = document.getElementById('match-result');

    // Populate team selection dropdowns
    teams.forEach(team => {
        const option1 = document.createElement('option');
        option1.value = team.id;
        option1.textContent = team.name;
        player1TeamSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = team.id;
        option2.textContent = team.name;
        player2TeamSelect.appendChild(option2);
    });

    let player1SelectedTeam = null;
    let player2SelectedTeam = null;

    startGameBtn.addEventListener('click', () => {
        startGameBtn.style.display = 'none';
        teamSelectionDiv.style.display = 'block';
    });

    confirmTeamsBtn.addEventListener('click', () => {
        player1SelectedTeam = teams.find(team => team.id === player1TeamSelect.value);
        player2SelectedTeam = teams.find(team => team.id === player2TeamSelect.value);

        if (player1SelectedTeam && player2SelectedTeam && player1SelectedTeam.id !== player2SelectedTeam.id) {
            teamSelectionDiv.style.display = 'none';
            matchScreenDiv.style.display = 'block';
            matchInfoP.textContent = `${player1SelectedTeam.name} vs ${player2SelectedTeam.name}`;
            // Basic Firebase integration for multiplayer (concept)
            // In a real scenario, you'd send game state to Firebase here
            database.ref('game/match').set({
                team1: player1SelectedTeam.name,
                team2: player2SelectedTeam.name,
                status: 'teams_selected'
            });
        } else {
            alert('Por favor, selecione dois times diferentes.');
        }
    });

    simulateMatchBtn.addEventListener('click', () => {
        if (player1SelectedTeam && player2SelectedTeam) {
            // Simple match simulation (random score)
            const score1 = Math.floor(Math.random() * 5);
            const score2 = Math.floor(Math.random() * 5);
            matchResultP.textContent = `Resultado: ${player1SelectedTeam.name} ${score1} - ${score2} ${player2SelectedTeam.name}`;
            // Update Firebase with match result
            database.ref('game/match').update({
                score1: score1,
                score2: score2,
                status: 'match_finished'
            });
        }
    });

    // Listen for Firebase updates (concept for multiplayer)
    database.ref('game/match').on('value', (snapshot) => {
        const matchData = snapshot.val();
        if (matchData && matchData.status === 'match_finished') {
            console.log('Multiplayer match finished:', matchData);
            // Potentially update UI for other players
        }
    });
});

