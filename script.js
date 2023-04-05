// variables
const colorVarArray = ["--text-col", "--background-col", "--grid-col", "--flash-col"];
const lightPaletteArray = ["black", "#d2daff", "#b1b2ff", "white"];
const darkPaletteArray = ["#eef1ff", "#03001C", "#301E67", "#5B8FB9"];

const buttonSoundsLinks = ['numBut1.mp3', 'numBut2.mp3', 'numBut3.mp3']
const buttonSounds = [];

for (text of buttonSoundsLinks) {
  buttonSounds.push(new Audio(text));
}

const userInputArray = []; //stores user inputs - reset every level
const answerArray = []; //stores computer generated answer - add to it every level, reset every game over

var userInputIndex = -1; //keeps track of user's number of inputs - add to it every button press, reset every level

var gamin = false; //true - user is playing the game, false - user on start or end screen

var flashInterval = 1000; 
var boardActive = false; //true - allow user to click board, false - disallow user from clicking on the board

var timedMode = false; // true - timer, false - no timer

var soundMode = true; // true - unmuted, false - muted

const gameGridEl = document.querySelector(".game-grid");
const startButtonEl = document.querySelector("#start-button");
const restartButtonEl = document.querySelector("#restart-button");

const startGameOverlay = document.querySelector(".overlay-start");
const endGameOverlay = document.querySelector(".overlay-end");

const gameDetailsEl = document.querySelector(".game-details");
const levelNumberSpan = document.querySelector("#level");
const endLevelNumberSpan = document.querySelector("#endinglevel");
const timerEl = document.querySelector('#timer-label');
const timeLeftSpan = document.querySelector('#timer');

const settingsMenuEl = document.querySelector(".settings-menu");
const backgroundEl = document.querySelector("body");

// functions
function addNewNumberToAnswer() {
  answerArray.push(Math.floor(Math.random() * 9 + 1));
}

function flashAllButtons(arr) {
  // arr is the array holding the number ids of the buttons to be flashed by the computer
  var index = 0;
  const flashyFlash = setInterval(function () {
    if (index < arr.length) {
      flashButton(arr[index]);
      index++;
    } else {
      boardActive = true;
      console.log("flashed all");
      if (timedMode) {
        countdown(arr.length+5);
      }
      backgroundEl.style.animationName = null;
      clearInterval(flashyFlash);
    }
  }, flashInterval);
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
  button.classList.add("flashing-grid-button");

  // remove the animation
  setTimeout(function () {
    button.classList.remove("flashing-grid-button");
  }, flashInterval - 300);
}

function countdown(totalTime) {
  var timeLeft = totalTime;
  const timeyTime = setInterval(function() {
    if (timeLeft >= 0 && (!arraySame(userInputArray, answerArray))) {
      timeLeftSpan.innerText = timeLeft; 
      timeLeft--;
    } else if (arraySame(userInputArray, answerArray)) {
      console.log("i am here");
      clearInterval(timeyTime);
    } else {
      gameOver();
      resetGame();
      clearInterval(timeyTime);
    }
  }, 1000)

}

function arraySame(arr1, arr2) {
  // just to check if 2 arrays are the same
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

function gameOver() {
  gamin = false;
  boardActive = false;
  endLevelNumberSpan.innerText = levelNumberSpan.innerText;
  endGameOverlay.style.display = "block";
}

function resetGame() {
  // deactivate the board
  boardActive = false;

  // reset answer array
  answerArray.splice(0, answerArray.length);

  // reset user input array
  userInputArray.splice(0, userInputArray.length);

  // reset user input index
  userInputIndex = -1;

  // randomly generate 1 new number and add it to answerArray
  addNewNumberToAnswer();

  // reset level number in the UI
  levelNumberSpan.innerText = answerArray.length;
}

function toggleLightDark(palette) {
  for (i = 0; i < palette.length; i++) {
    document.documentElement.style.setProperty(colorVarArray[i], palette[i]);
  }
}

function toggleTimedMode() { // set visual cue later
  if (timedMode) {
    // if currently in timed mode - turn off timed mode
    timedMode = false;
    timerEl.style.display = "none";
  } else {
    // if currently not in timed mode - turn on timed mode
    timedMode = true;
    timerEl.style.display = "inline-block";
  }
}

// event listeners
// start button clicked
startButtonEl.addEventListener("click", function (e) {
  e.preventDefault();

  resetGame();

  // hide the start message overlay
  startGameOverlay.style.display = "none"; // style.display = "block" to display
  gamin = true;

  // flash the first button of the answer sequence
  flashAllButtons(answerArray);
});

// restart button clicked
restartButtonEl.addEventListener("click", function (e) {
  e.preventDefault();

  resetGame();

  // hide the end message overlay
  endGameOverlay.style.display = "none"; // style.display = "block" to display
  gamin = true;

  // flash the first button of the answer sequence
  flashAllButtons(answerArray);
});

// grid area clicked
gameGridEl.addEventListener("click", function (e) {
  e.preventDefault();

  // ignore click if it's in a gap
  if (!e.target.classList.contains("grid-button") || !boardActive) {
    return;
  }

  // ignore the click if the button is flashing
  if (e.target.classList.contains("flashing-grid-button")){
    return;
  }

  // add button number to userInputArray
  userInputArray.push(e.target.getAttribute("id").slice(-1));

  // play sound of button press
  if (soundMode) {
    buttonSounds[0].play(); // aiyah now only got 3 sound by 9 number HOW?
  };

  // increase user input index by 1
  userInputIndex++;

  // animate button press
  flashButton(userInputArray[userInputIndex]);

  console.log(userInputArray, answerArray);

  // check if level complete (all inputs correct)
  if (arraySame(userInputArray, answerArray)) {
    backgroundEl.style.animationName = "flashCorrectBg"; // visual cue

    // prepare for a new round
    userInputIndex = -1;
    boardActive = false; // deactivate the board
    userInputArray.splice(0, userInputArray.length); // reset user input array
    addNewNumberToAnswer(); // randomly gen new number and append to answer array
    levelNumberSpan.innerText = answerArray.length; // increase the level number in the UI

    console.log("answerarr", answerArray);
    // flash answerArray in sequence
    setTimeout(function () {
      flashAllButtons(answerArray);
    }, flashInterval);

    // check if each step is correct
  } else if (userInputArray[userInputIndex] == answerArray[userInputIndex]) {
    return;

    // step is wrong
  } else {
    backgroundEl.style.animationName = "flashWrongBg"; // visual cue
    gameOver();
    return;
  }
});

// settings menu clicked
settingsMenuEl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.getAttribute("class") != "material-icons") {
    return;
  }

  // if sound button pressed
  if (e.target.innerText == "volume_up") {
    soundMode = false;
    e.target.innerText = "volume_off";
    return;
  }

  // if muted button pressed
  if (e.target.innerText == "volume_off") {
    soundMode = true;
    e.target.innerText = "volume_up";
    return;
  }

  // light mode button pressed
  if (e.target.innerText == "wb_sunny") {
    toggleLightDark(darkPaletteArray);
    e.target.innerText = "brightness_2";
    return;
  }
  
  // dark mode button pressed
  if (e.target.innerText == "brightness_2") {
    toggleLightDark(lightPaletteArray);
    e.target.innerText = "wb_sunny";
    return;
  }
  
  // reset button pressed
  if (e.target.innerText == "refresh") {
    if (gamin) {
      if (window.confirm("Are you sure you want to restart from Level 1?")) {
        startGameOverlay.style.display = "block";
        resetGame();
        gamin = false;
        return;
      } else {
        return;
      }
    } else { 
      // ignore the click if no game currently in play
      return;
    }
  }

  // timed mode button pressed // NOT DONE
  if (e.target.innerText == "access_time") {
    if (gamin) {
      if (window.confirm("To activate/ deactivate timed mode, you need to restart from Level 1. \nDo you want to continue?")) {
        // mid-game, confirmed restart
        startGameOverlay.style.display = "block";
        resetGame();
        toggleTimedMode();
        return;
      } else {
        // mid-game, cancelled restart
        return;
      }
    } else {     
      console.log(timerEl);
      toggleTimedMode();
      return;
    } 
  }

  // fast forward button pressed
  if (e.target.innerText == "fast_forward") {
    flashInterval = 500;
    e.target.innerText = "play_arrow";  
    return;
  }

  // play button pressed
  if (e.target.innerText == "play_arrow") {
    flashInterval = 1000;
    e.target.innerText = "fast_forward";
    return;
  }
});
