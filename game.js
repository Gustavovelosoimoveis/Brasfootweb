document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game");
    const teamSelectionDiv = document.getElementById("team-selection");
    const player1TeamSelect = document.getElementById("player1-team");
    const player2TeamSelect = document.getElementById("player2-team");
    const confirmTeamsBtn = document.getElementById("confirm-teams");
    const matchScreenDiv = document.getElementById("match-screen");
    const matchInfoP = document.getElementById("match-info");
    const simulateMatchBtn = document.getElementById("simulate-match");
    const matchResultP = document.getElementById("match-result");
    // Elements for the lineup suggestion functionality
    const getLineupBtn = document.getElementById("get-lineup");
    const lineupSuggestionP = document.getElementById("lineup-suggestion");

    // Populate team selection dropdowns
    teams.forEach(team => {
        const option1 = document.createElement("option");
        option1.value = team.id;
        option1.textContent = team.name;
        player1TeamSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = team.id;
        option2.textContent = team.name;
        player2TeamSelect.appendChild(option2);
    });

    let player1SelectedTeam = null;
    let player2SelectedTeam = null;

    // Initial state
    teamSelectionDiv.style.display = "none";
    matchScreenDiv.style.display = "none";

    // Keep track of the current round. This ensures that each new game starts
    // from the beginning of the season (round 1), similar to the Brasfoot
    // experience where the season start is independent of the real-world date.
    let currentRound = 1;

    startGameBtn.addEventListener("click", () => {
        // Reset to round 1 every time a new game starts
        currentRound = 1;
        startGameBtn.style.display = "none";
        teamSelectionDiv.style.display = "block";
    });

    confirmTeamsBtn.addEventListener("click", () => {
        player1SelectedTeam = teams.find(team => team.id === player1TeamSelect.value);
        player2SelectedTeam = teams.find(team => team.id === player2TeamSelect.value);

        if (player1SelectedTeam && player2SelectedTeam && player1SelectedTeam.id !== player2SelectedTeam.id) {
            teamSelectionDiv.style.display = "none";
            matchScreenDiv.style.display = "block";
            // Show the round information along with the match-up
            matchInfoP.textContent = `Rodada ${currentRound}: ${player1SelectedTeam.name} vs ${player2SelectedTeam.name}`;
            // Show the lineup suggestion button since teams are selected
            getLineupBtn.style.display = "inline-block";
            lineupSuggestionP.textContent = "";
        } else {
            alert("Por favor, selecione dois times diferentes.");
        }
    });

    simulateMatchBtn.addEventListener("click", () => {
        if (player1SelectedTeam && player2SelectedTeam) {
            // Enhanced match simulation that considers team strength. Each team's
            // strength is based on the number of players available. A bias is
            // applied so stronger teams have a slightly higher chance of
            // scoring more goals.
            function simulateScore(strengthA, strengthB) {
                const maxGoals = 5;
                const ratio = strengthA / (strengthA + strengthB);
                const randomFactor = Math.random();
                return Math.floor(randomFactor * maxGoals * ratio);
            }
            const strength1 = player1SelectedTeam.players?.length || 1;
            const strength2 = player2SelectedTeam.players?.length || 1;
            const score1 = simulateScore(strength1, strength2);
            const score2 = simulateScore(strength2, strength1);
            matchResultP.textContent = `Resultado: ${player1SelectedTeam.name} ${score1} - ${score2} ${player2SelectedTeam.name}`;
            // Advance to the next round after each match
            currentRound += 1;
        }
    });

    // Function to generate a basic lineup suggestion. In an advanced version
    // this could call a backend service leveraging ChatGPT to analyse the team
    // and propose the best formation. Here, we simply list up to the first
    // 11 players of the selected team.
    function getLineupSuggestion(team) {
        const maxPlayers = 11;
        const players = team.players || [];
        return players.slice(0, maxPlayers);
    }

    getLineupBtn.addEventListener("click", () => {
        if (player1SelectedTeam) {
            const suggestion = getLineupSuggestion(player1SelectedTeam);
            lineupSuggestionP.textContent = `Escalação sugerida para ${player1SelectedTeam.name}: ${suggestion.join(", ")}`;
        }
    });
});

