const strikeBtn = document.getElementById("strike");
const resetBtn = document.getElementById("reset");
const team1Score = document.getElementById("score-team1");
const team1Wickets = document.getElementById("wickets-team1");
const team2Score = document.getElementById("score-team2");
const team2Wickets = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");


let currTeam1Score = 0;
let currTeam2Score = 0;
let currTeam1Wickets = 0;
let currTeam2Wickets = 0;
let team1BallsFaced = 0;
let team2BallsFaced = 0;
let turn = 1;

let possibleOutcomes = [0, 1, 2, 3, 4, 6, "w"];

function gameOver() {
    gameOverAudio.play();
    if (currTeam1Score > currTeam2Score) {
        alert("IND WINS...!!!")
    } else if (currTeam1Score < currTeam2Score) {
        alert("PAK WINS...!")
    } else if (currTeam1Score === currTeam2Score) {
        alert("It is a Tie.");
    }
}

resetBtn.onclick = () => {
    window.location.reload();
};

function updateScore() {
    team1Score.textContent = currTeam1Score;
    team1Wickets.textContent = currTeam1Wickets;
    team2Score.textContent = currTeam2Score;
    team2Wickets.textContent = currTeam2Wickets;
}

strikeBtn.onclick = () => {
    let randomOutcome = possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];
    //play audio
    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();

    if (turn == 2) {
        team2BallsFaced++;

        document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`).textContent = randomOutcome;

        if (randomOutcome === "w") {
            currTeam2Wickets++;
        } else {
            currTeam2Score = currTeam2Score + randomOutcome;
        }

        // Game over
        if (currTeam2Wickets === 2 || team2BallsFaced === 6 || (currTeam2Wickets === 1 && team2BallsFaced === 6 && currTeam2Score > currTeam1Score)) {
            turn = 3;
            gameOver();
            updateScore(); 
        }
    }

    if (turn == 1) {
        team1BallsFaced++;

        document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`).textContent = randomOutcome;

        if (randomOutcome == "w") {
            currTeam1Wickets++;
        } else {
            currTeam1Score += randomOutcome;
        }

        // Game over
        if (currTeam1Wickets === 2 || team1BallsFaced === 6) {
            turn = 2;
            updateScore(); 
        }
    }
    updateScore(); 
};
