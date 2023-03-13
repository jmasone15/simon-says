// TODO List
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
const audioElOne = document.getElementById("audio1");
const audioElTwo = document.getElementById("audio2");
const audioElThree = document.getElementById("audio3");
const audioElFour = document.getElementById("audio4");

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

const duplicateAndPlayAudio = (element) => {
    const newEl = element.cloneNode(true);
    document.body.appendChild(newEl);
    newEl.play();
}

const getElementByNumber = (number, elementType) => {
    if (elementType === "audio") {
        if (number == 1) {
            return audioElOne;
        } else if (number == 2) {
            return audioElTwo;
        } else if (number == 3) {
            return audioElThree;
        } else {
            return audioElFour;
        }
    } else {
        if (number == 1) {
            return leftTopEl;
        } else if (number == 2) {
            return rightTopEl;
        } else if (number == 3) {
            return leftBottomEl;
        } else {
            return rightBottomEl;
        }
    }
}

const flashColor = async (number) => {
    let colorTarget = getElementByNumber(number, "color");
    let audioTarget = getElementByNumber(number, "audio");

    await delay(500);
    colorTarget.setAttribute("class", "button button-highlight");
    duplicateAndPlayAudio(audioTarget);
    await delay(750);
    colorTarget.setAttribute("class", "button");
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const gameFunction = async () => {

    userClickCount = 0;
    userTurn = false

    generateColor();
    
    if (gameArray.length !== 1) {
        await delay(1000);
    }

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

    const clickedNum = target.getAttribute("number");

    if (gameArray[userClickCount] == clickedNum) {
        let audioTarget = getElementByNumber(clickedNum, "audio");
        duplicateAndPlayAudio(audioTarget);
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