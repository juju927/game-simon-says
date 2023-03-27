// variables
const userInputArray = []; //stores user inputs - reset every level
const answerArray = []; //stores computer generated answer - add to it every level, reset every game over

var userInputIndex = -1; //keeps track of user's number of inputs - add to it every button press, reset every level
var gamePage = "start"; // or playing or end

var flashInterval = 1;
var boardActive = false;

const gameGridEl = document.querySelector(".game-grid");
const startButtonEl = document.querySelector("#start-button");

const startGameOverlay = document.querySelector(".overlay-start");
const endGameOverlay = document.querySelector(".overlay-end");

const levelNumberSpan = document.querySelector("#level");

const backgroundEl = document.querySelector("body");

// functions
function addNewNumberToAnswer() {
  answerArray.push(Math.floor(Math.random()*9 + 1));
}

function flashAllButtons(arr) {
  // arr is the array holding the number ids of the buttons to be flashed by the computer
  var index = 0;
  setInterval(function flashyFlash() {
    if (index < arr.length) {
      flashButton(arr[index]);
      index ++;
    } else {
      boardActive = true;
      clearInterval(flashyFlash);
    }
  }, flashInterval * 1500)
}

function flashButton(buttonID) {
  // button will be a number/ string

  // 7 -> button7 for queryselector
  const buttonIDtag = "#button" + buttonID;
  console.log(buttonIDtag);
  console.log(typeof buttonIDtag);

  // select the button
  const button = document.querySelector(buttonIDtag);

  // animate the button flash
  button.classList.add("flashing-grid-button")

  // remove the animation
  setTimeout(function() {
  button.classList.remove("flashing-grid-button")
  }, flashInterval * 1000)
};


function arraySame(arr1, arr2) {
  if (arr1.length == arr2.length) {
    for (let index = 0; index < arr1.length; index++) {
      if (!(arr1[index] == arr2[index])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

// event listeners
// start button clicked
startButtonEl.addEventListener("click", function (e) {
  e.preventDefault();

  // hide the start message overlay
  startGameOverlay.style.display = "none"; // style.display = "block" to display

  // randomly generate 1 new number and add it to answerArray
  addNewNumberToAnswer();

  // flash the first button of the answer sequence
  flashAllButtons(answerArray);
});


// user input button clicked
gameGridEl.addEventListener("click", function (e) {
  e.preventDefault();

  // ignore click if it's in a gap
  if (e.target.getAttribute("class") != "grid-button" || !boardActive) {
    return;
  }

  // add button number to userInputArray
  userInputArray.push(e.target.getAttribute("id").slice(-1));
  console.log(userInputArray);

  // increase user input index by 1
  userInputIndex++;

  // animate button press
  flashButton(userInputArray[userInputIndex]);

  console.log(userInputArray, answerArray);

  // check if level complete (all inputs correct)
  if (arraySame(userInputArray, answerArray)) {
    backgroundEl.style.backgroundColor = "green"; // visual cue

    // prepare for a new round
    boardActive = false; // deactivate the board
    userInputArray.splice(0, userInputArray.length); // reset user input array
    addNewNumberToAnswer(); // randomly gen new number and append to answer array
    levelNumberSpan.innerText = answerArray.length; // increase the level number in the UI


    // flash answerArray in sequence
    setTimeout(function() {
      flashAllButtons(answerArray);
    }, 5000)
    
    // check if each step is correct
  } else if (userInputArray[userInputIndex] == answerArray[userInputIndex]) {
    return;

    // step is wrong
  } else {
    backgroundEl.style.backgroundColor = "red"; // visual cue
    boardActive = false;
    return;
  }
});
