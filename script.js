// Pseudo-Code Plan
// 1. Click Start Button Event Listener (hide start button show score)
// 2. Generate first color to flash
// 3. Function to flash the generated color
// 4. Event Listener for User Input
// 5. Check if answer is correct
// 6a. If correct, update score.
// 7a. Generate color again
// 8a. Flash all previous colors and new color
// 9a. Listen to user inputs based on number of inputs
// 10a. Repeat process starting from 6a.
// 6b. Present score and disable event listeners.
// 7b. Show start button hide score

const startBtn = document.getElementById("start");
const countEl = document.getElementById("count");
const leftTopEl = document.getElementById("left-top");
const rightTopEl = document.getElementById("right-top");
const leftBottomEl = document.getElementById("left-bottom");
const rightBottomEl = document.getElementById("right-bottom");

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
    await delay(1000);
    colorTarget.setAttribute("class", "button");
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const gameFunction = async () => {

    userClickCount = 0;
    userTurn = false

    generateColor();
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