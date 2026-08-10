
let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let pvpBtn = document.querySelector("#pvp-btn");
let pvcBtn = document.querySelector("#pvc-btn");

let winningLine = document.querySelector(".winning-line");

let turnO = true;

let count = 0;

let gameMode = "pvp";

const winPatterns = [

    [0, 1, 2],

    [0, 3, 6],

    [0, 4, 8],

    [1, 4, 7],

    [2, 5, 8],

    [2, 4, 6],

    [3, 4, 5],

    [6, 7, 8]

];


pvpBtn.addEventListener("click", () => {

    gameMode = "pvp";

    pvpBtn.classList.add("active");

    pvcBtn.classList.remove("active");

    resetGame();

});


pvcBtn.addEventListener("click", () => {

    gameMode = "pvc";

    pvcBtn.classList.add("active");

    pvpBtn.classList.remove("active");

    resetGame();

});


boxes.forEach((box) => {

    box.addEventListener("click", () => {


        if (
            gameMode === "pvc" &&
            !turnO
        ) {
            return;
        }

        if (turnO) {

            box.innerText = "O";


            box.classList.add("o");

            turnO = false;

        }

        else {

            box.innerText = "X";

            box.classList.add("x");

            turnO = true;

        }


        box.disabled = true;

        count++;

        let isWinner = checkWinner();


        if (isWinner) {
            return;
        }

        if (count === 9) {

            gameDraw();

            return;

        }

        if (
            gameMode === "pvc" &&
            !turnO
        ) {

            computerMove();

        }

    });

});

const computerMove = () => {

    setTimeout(() => {

        let bestMove = findBestMove();


        if (bestMove === -1) {
            return;
        }

        boxes[bestMove].innerText = "X";

        boxes[bestMove].classList.add("x");

        boxes[bestMove].disabled = true;

        count++;


        let isWinner = checkWinner();


        if (isWinner) {
            return;
        }

        if (count === 9) {

            gameDraw();

            return;

        }

        turnO = true;

    }, 500);

};

const findBestMove = () => {

    for (let i = 0; i < boxes.length; i++) {

        if (boxes[i].innerText === "") {

            boxes[i].innerText = "X";


            if (checkWinningPattern("X")) {

                boxes[i].innerText = "";

                return i;

            }

            boxes[i].innerText = "";

        }

    }

    for (let i = 0; i < boxes.length; i++) {

        if (boxes[i].innerText === "") {

            boxes[i].innerText = "O";

            if (checkWinningPattern("O")) {

                boxes[i].innerText = "";

                return i;
            }
            boxes[i].innerText = "";

        }

    }


    if (boxes[4].innerText === "") {

        return 4;

    }

    let emptyBoxes = [];


    for (let i = 0; i < boxes.length; i++) {

        if (boxes[i].innerText === "") {

            emptyBoxes.push(i);
        }

    }

    if (emptyBoxes.length === 0) {

        return -1;

    }

    let randomIndex =
        Math.floor(
            Math.random() * emptyBoxes.length
        );
    return emptyBoxes[randomIndex];

};

const checkWinningPattern = (player) => {

    for (let pattern of winPatterns) {

        let pos1 =
            boxes[pattern[0]].innerText;

        let pos2 =
            boxes[pattern[1]].innerText;

        let pos3 =
            boxes[pattern[2]].innerText;


        if (
            pos1 === player &&
            pos2 === player &&
            pos3 === player
        ) {

            return true;

        }
    }

    return false;

};


const drawWinningLine = (pattern) => {

    const game =
        document.querySelector(".game");


    const firstBox =
        boxes[pattern[0]];

    const lastBox =
        boxes[pattern[2]];


    const gameRect =
        game.getBoundingClientRect();


    const firstRect =
        firstBox.getBoundingClientRect();


    const lastRect =
        lastBox.getBoundingClientRect();


    const x1 =
        firstRect.left +
        firstRect.width / 2 -
        gameRect.left;


    const y1 =
        firstRect.top +
        firstRect.height / 2 -
        gameRect.top;


    const x2 =
        lastRect.left +
        lastRect.width / 2 -
        gameRect.left;


    const y2 =
        lastRect.top +
        lastRect.height / 2 -
        gameRect.top;


    const dx = x2 - x1;

    const dy = y2 - y1;


    const length =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    const angle =
        Math.atan2(
            dy,
            dx
        ) *
        (180 / Math.PI);

    winningLine.style.left =
        `${x1}px`;

    winningLine.style.top =
        `${y1}px`;

    winningLine.style.width =
        `${length}px`;

    winningLine.style.transform =
        `rotate(${angle}deg)`;

    winningLine.style.display =
        "block";

};


const checkWinner = () => {

    for (let pattern of winPatterns) {

        let pos1Val =
            boxes[pattern[0]].innerText;

        let pos2Val =
            boxes[pattern[1]].innerText;

        let pos3Val =
            boxes[pattern[2]].innerText;


        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== ""
        ) {

            if (
                pos1Val === pos2Val &&
                pos2Val === pos3Val
            ) {
                drawWinningLine(pattern);

                showWinner(pos1Val);

                return true;
            }
        }

    }


    return false;

};


const showWinner = (winner) => {

    msg.innerText =
        `Congratulations, Winner is ${winner}`;

    msgContainer.classList.remove("hide");

    resetBtn.classList.add("hide");

    newGameBtn.classList.remove("hide");

    disableBoxes();

};


const gameDraw = () => {

    msg.innerText =
        "Game was a Draw.";

    msgContainer.classList.remove("hide");

    resetBtn.classList.add("hide");

    newGameBtn.classList.remove("hide");

    disableBoxes();

};


const disableBoxes = () => {

    for (let box of boxes) {

        box.disabled = true;

    }

};


const enableBoxes = () => {

    for (let box of boxes) {

        box.disabled = false;

        box.innerText = "";

        box.classList.remove("x", "o");

    }

};


const resetGame = () => {

    turnO = true;

    count = 0;

    enableBoxes();

    msgContainer.classList.add("hide");


    resetBtn.classList.remove("hide");


    newGameBtn.classList.add("hide");


    winningLine.style.display = "none";

};

resetBtn.addEventListener(
    "click",
    resetGame
);

newGameBtn.addEventListener(
    "click",
    resetGame
);