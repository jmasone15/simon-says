// TODO List
// Sound effects
// Mobile Dev
// Background Customization
// Simon Color Changing
// Database High Score

const startBtn = document.getElementById("start");
const countEl = document.getElementById("count");
const leftTopEl = document.getElementById("left-top");
const rightTopEl = document.getElementById("right-top");
const leftBottomEl = document.getElementById("left-bottom");
const rightBottomEl = document.getElementById("right-bottom");
const audio = new Audio("./assets/note_three.mp3");

let elementArray = [leftTopEl, rightTopEl, leftBottomEl, rightBottomEl];
let gameArray = [];
let userTurn = false;
let userClickCount = 0;
let score = 0;
// 1 = left-top, 2 = right-top, 3 = left-bottom, 4 = right-bottom

startBtn.addEventListener("click", () => {
    startBtn.setAttribute("style", "display: none;");
    countEl.setAttribute("style", "");

    score = 0;
    countEl.innerText = score;
    gameFunction();
});

const generateColor = () => {
    const number = Math.floor(Math.random() * 4) + 1;
    gameArray.push(number);
}

const flashColor = async (number) => {
    let colorTarget;

    console.log(number);

    if (number == 1) {
        colorTarget = leftTopEl;
    } else if (number == 2) {
        colorTarget = rightTopEl;
    } else if (number == 3) {
        colorTarget = leftBottomEl;
    } else {
        colorTarget = rightBottomEl;
    }

    await delay(500);
    colorTarget.setAttribute("class", "button button-highlight");
    audio.play();
    await delay(750);
    colorTarget.setAttribute("class", "button");
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const gameFunction = async () => {

    userClickCount = 0;
    userTurn = false

    generateColor();
    await delay(500);
    for (let i = 0; i < gameArray.length; i++) {
        await flashColor(gameArray[i]);
    }

    elementArray.forEach(element => {
        element.setAttribute("class", "button button-enable")
    });

    userTurn = true;
}

const userResponse = ({ target }) => {
    if (!userTurn) {
        return;
    }

    console.log(target.getAttribute("number"), gameArray[userClickCount]);

    if (gameArray[userClickCount] == target.getAttribute("number")) {
        userClickCount++
        if (gameArray.length === userClickCount) {
            score++
            countEl.innerText = score;
            elementArray.forEach(element => {
                element.setAttribute("class", "button")
            });
            gameFunction();
        } else {
            return;
        }
    } else {
        gameArray = [];
        userTurn = false;
        elementArray.forEach(element => {
            element.setAttribute("class", "button")
        });
        startBtn.setAttribute("style", "");
    }
}

elementArray.forEach(element => {
    element.addEventListener("click", userResponse);
});