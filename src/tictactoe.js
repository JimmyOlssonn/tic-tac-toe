var gameStatus = ["", "", "", "", "", "", "", "", ""]; // The gamestatus, X and O are added by the player / computer
var gameActive = true; // If true the game is active
var titel;
var text;
var restart;

const winner = [ // All win conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]

];
/*  Gameboard for referense
    [0][1][2]
    [3][4][5]
    [6][7][8] */

function restartGame() { // When game is restarted, change back text, cells and gameStatus to normal
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(cell => cell.style = "background-color:#e6e6e6");
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    titel.innerHTML = "Tic Tac Toe!";
    text.innerHTML = "Klicka på en ruta för att börja spelet";
    restart.className = "btn btn-primary";
    gameActive = true;
}

function playerWin() { // The player win
    titel.innerHTML = "Du har vunnit!";
    text.innerHTML = "Klicka på knappen för att starta om spelet";
    restart.className = "btn btn-success";
}

function computerWin() { // The computer win
    titel.innerHTML = "Du har förlorat!";
    text.innerHTML = "Klicka på knappen för att starta om spelet";
    restart.className = "btn btn-danger";
}

function draw() { // Draw
    titel.innerHTML = "Det blev lika";
    text.innerHTML = "Klicka på knappen för att starta om spelet";
    restart.className = "btn btn-warning";
}

function checkResult() { // Check if any win condition is 
    let roundWon = false;
    let roundLost = false;
    for (let i = 0; i <= 7; i++) { // Loop through all possible win conditions 
        let sumX = 0;
        let sumO = 0;
        for (let j = 0; j < winner[i].length; j++) { // Loop through on win condition to see if the row is full 
            if (gameStatus[winner[i][j]] === 'X') sumX++;
            if (gameStatus[winner[i][j]] === 'O') sumO++;
            if (sumX === 3) { // player win
                roundWon = true;
                break;
            }
            if (sumO === 3) { // computer win
                roundLost = true;
                break
            }
        }
    }
    if (roundWon) {
        playerWin();
        gameActive = false;
        return;
    }
    if (roundLost) {
        computerWin();
        gameActive = false;
        return;
    }
}

function addComputerPlay(value) {
    gameStatus[value] = "O";
    document.getElementById(value).style = "background-color:#ff8080";
    document.getElementById(value).innerHTML = "O";
    return;
}

function computerPlay() { // Computer turn to plays
    // The goal of the computer is to always try to win the game, otherwise it will try to stop the player from winning (the player having 2 x in a row)
    let newStatus = [];
    let game = true;
    if (gameActive === true) {
        for (let i = 0; i < 8; i++) { // Loop through the game status to see if the computer can win
            let sumO = 0;
            let value = null;
            for (let j = 0; j < winner[i].length; j++) {
                if (gameStatus[winner[i][j]] === 'O') sumO++;
                if (gameStatus[winner[i][j]] === '') value = j;
            }
            if (sumO == 2 && value != null) { // If there is two O and the other value is not null
                addComputerPlay(winner[i][value]); // play on the cell that do not have a O
                game = false;
                break;
            }

        }
        if (game === true) { // Loop through the game status to see if the computer can stop the player from winning
            for (let i = 0; i < 8; i++) {
                let sumX = 0;
                let value = null;
                for (let j = 0; j < winner[i].length; j++) {
                    if (gameStatus[winner[i][j]] === 'X') sumX++;
                    if (gameStatus[winner[i][j]] === '') value = j;
                }
                if (sumX == 2 && value != null) {
                    addComputerPlay(winner[i][value]);
                    game = false;
                    break;
                }
            }
        }
        if (game === true) { // Otherwise place at random cell
            for (let i = 0; i < gameStatus.length; i++) { // Loop through the game status to see what cells are empty
                if (gameStatus[i] === "") {
                    newStatus.push(i);
                    continue;
                }
                else {
                    continue;
                }
            }
            if (newStatus.length > 0) { // If there is empty cells place one at random
                let random = Math.floor(Math.random() * newStatus.length);
                gameStatus[newStatus[random]] = "O";
                document.getElementById(newStatus[random]).style = "background-color:#ff8080";
                document.getElementById(newStatus[random]).innerHTML = "O";
            }
            else { // No empty cells the game come to a draw
                gameActive = false;
                draw();
            }

        }
        checkResult(); // Check the result
    }
}


function cellMouseover(clicked) { // Mouse is over a cell
    if (gameActive === true) {
        let clickedCell = clicked.target.id;
        if (document.getElementById(clickedCell).innerHTML === "") {
            document.getElementById(clickedCell).style = "opacity: 0.7";
            document.getElementById(clickedCell).innerHTML = "X";
        }
    }
}

function cellMouseout(clicked) { // Moving the mouse away from a cell
    if (gameActive === true) {
        let clickedCell = clicked.target.id;
        if (gameStatus[clickedCell] !== "X" && gameStatus[clickedCell] !== "O") {
            document.getElementById(clickedCell).style = "background-color:#e6e6e6";
            document.getElementById(clickedCell).innerHTML = "";
        }
    }
}

function cellClick(clicked) { // Player clicks on cell
    if (gameActive === true) {
        let clickedCell = clicked.target.id;
        clickedCell = parseInt(clickedCell);
        if (gameStatus[clickedCell] !== "") {
            document.getElementById("text").innerHTML = "Den rutan är redan vald!";
            return;
        }
        gameStatus[clickedCell] = "X";
        document.getElementById(clickedCell).style = "background-color:#99ff99";
        document.getElementById(clickedCell).innerHTML = "X";
        checkResult();
        computerPlay();
    }
}
function startUp() {
    // Event listeners for cells and restart-button
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseover', cellMouseover));
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseout', cellMouseout));
    document.getElementById("restart").addEventListener('click', restartGame);

    titel = document.getElementById("titel");
    text = document.getElementById("text");
    restart = document.getElementById("restart");
}

