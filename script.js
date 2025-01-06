let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_game_btn");
let whoseTurn = document.querySelector("#whose_turn");
let winnerMsg = document.querySelector("#winner_announcement");

let turnO = true;
let scoreO = 0;
let scoreX = 0;
let gameOver = false;


const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (box.innerHTML == "") {
                if (turnO) {
                    box.innerHTML = "O";
                    turnO = false;
                    whoseTurn.innerHTML = "X (Ai)";
                    checkWinner();
                }

                if (!turnO && !gameOver) {
                    aiMove();
                }
            }
        });
    });
}

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winningComb) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos1Val == pos2Val && pos2Val == pos3Val) {
            console.log(`Winner : ${pos1Val}`);
            if (pos1Val == "O") {
                scoreO++;
                document.querySelector("#score_o").innerText = scoreO;
                winnerMsg.innerHTML = "You Win!";
            }
            else {
                scoreX++;
                document.querySelector("#score_x").innerText = scoreX;
                winnerMsg.innerHTML = "Ai Wins!";
            }
            pattern.forEach((index) => {
                boxes[index].style.backgroundColor = "#00ffff";
                boxes[index].style.color = "#000814";
                boxes[index].style.fontWeight = "bold";
            });

            boxes.forEach((box) => (box.disabled = true));
            gameOver = true;
            return;
        }
    }
    boxes.forEach((box) => {
        if (box.innerHTML == "") {
            isDraw = false;
        }
    });
    if (isDraw) {
        console.log("Draw game");
        gameOver = true;
        winnerMsg.innerHTML = "Draw Game";
    }
}

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
        box.style.backgroundColor = "";
        box.style.color = "";
        box.style.fontWeight = "";
    });
    scoreO = 0;
    document.querySelector("#score_o").innerText = scoreO;
    scoreX = 0;
    document.querySelector("#score_x").innerText = scoreX;
    turnO = true;
    whoseTurn.innerHTML = "O (You)";
    document.querySelector("#winner_announcement").innerText = "";
    gameOver = false;

};

const newGame = () => {
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.disabled = false;
        box.style.backgroundColor = "";
        box.style.color = "";
        box.style.fontWeight = "";
    });
    turnO = true;
    whoseTurn.innerHTML = "O (You)";
    document.querySelector("#winner_announcement").innerText = "";
    gameOver = false;

};

newGameBtn.addEventListener("click", newGame)
resetBtn.addEventListener("click", resetGame);

const aiMove = () => {

    setTimeout(() => {
        if(gameOver) return;
        //Step 1 : Check for winning move
        for (let pattern of winningComb) {
            let [a, b, c] = pattern;
            if (
                boxes[a].innerHTML === "X" &&
                boxes[b].innerHTML === "X" &&
                boxes[c].innerHTML === ""
            ) {
                boxes[c].innerHTML = "X";
                boxes[c].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
            if (
                boxes[a].innerHTML === "X" &&
                boxes[c].innerHTML === "X" &&
                boxes[b].innerHTML === ""
            ) {
                boxes[b].innerHTML = "X";
                boxes[b].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
            if (
                boxes[c].innerHTML === "X" &&
                boxes[b].innerHTML === "X" &&
                boxes[a].innerHTML === ""
            ) {
                boxes[a].innerHTML = "X";
                boxes[a].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
        };

        //Step 2 : Block Opponent's winning move
        for (let pattern of winningComb) {
            let [a, b, c] = pattern;
            if (boxes[a].innerHTML === "O" && boxes[b].innerHTML === "O" && boxes[c].innerHTML === "") {
                boxes[c].innerHTML = "X";
                boxes[c].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
            if (boxes[a].innerHTML === "O" && boxes[c].innerHTML === "O" && boxes[b].innerHTML === "") {
                boxes[b].innerHTML = "X";
                boxes[b].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
            if (boxes[c].innerHTML === "O" && boxes[b].innerHTML === "O" && boxes[a].innerHTML === "") {
                boxes[a].innerHTML = "X";
                boxes[a].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
        };

        //Step 3 : Strategic move
        //Prefer center
        if (boxes[4].innerHTML === "") {
            boxes[4].innerHTML = "X";
            boxes[4].disabled = true;
            turnO = true;
            whoseTurn.innerHTML = "O (You)";
            checkWinner();
            return;
        }
        //Prefer corners
        const corners = [0, 2, 6, 8];
        for (let corner of corners) {
            if (boxes[corner].innerHTML === "") {
                boxes[corner].innerHTML = "X";
                boxes[corner].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
        }

        //Pick any availabe move
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerHTML === "") {
                boxes[i].innerHTML = "X";
                boxes[i].disabled = true;
                turnO = true;
                whoseTurn.innerHTML = "O (You)";
                checkWinner();
                return;
            }
        };
    }, 600);  //600ms delay to make user experience better
};

startGame();
