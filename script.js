// variables

const userInputArray = []; //stores user inputs - reset every level
const answerArray = []; //stores computer generated answer - add to it every level, reset every game over

var userInputIndex = -1; //keeps track of user's number of inputs - add to it every button press, reset every level
var gamePage = "start"; // or playing or end 

var flashInterval = 1;
var boardActive = false;

const gameGridEl = document.querySelector(".game-grid");
const startButtonEl = document.querySelector("#start-button");

const startGameOverlay = document.querySelector('.overlay-start');
const endGameOverlay = document.querySelector('.overlay-end');

const levelNumberSpan = document.querySelector("#level");


// functions
function addNewNumberToAnswer() {
  answerArray.push(String(Math.floor(Math.random()*9 + 1)));
}

function flashButton(buttonID) {
  // button will be a string number

  // 7 -> #7 for queryselector
  const buttonIDtag = "#button" + buttonID;

  // select the button
  const button = document.querySelector(buttonIDtag);
  console.log(button);

  // animate the button flash
  button.style.animation = `flashButton ${flashInterval}s linear 0.1s`;

  // remove the animation style after button is done flashing
  setTimeout(function() {
    button.style.animation = "";
  }, flashInterval*1000);
}



// event listeners
// start button clicked
startButtonEl.addEventListener("click", function(e) {
  e.preventDefault();

  // hide the start message overlay
  startGameOverlay.style.display = "none"; // style.display = "block" to display

  // randomly generate 1 new number and add it to answerArray
  addNewNumberToAnswer();
  console.log(answerArray)

  // flash the first button of the answer sequence after 1.5s
  setTimeout(function() {
    flashButton(answerArray[0]);
  }, 1500);

  // activate the board (allow user to click on board)
  boardActive = true; 
})








// user input button clicked
gameGridEl.addEventListener("click", function(e) {
  e.preventDefault();

  // ignore click if it's in a gap
  if ((e.target.getAttribute('class') != 'grid-button') || !boardActive) {
    return;
  }

  // add button number to userInputArray
  userInputArray.push(e.target.getAttribute('id').slice(-1)); 
  console.log(userInputArray);
  // increase user input index by 1
  userInputIndex ++;
  // flash the button
  flashButton(userInputArray[userInputIndex]);

  // check if level complete (all inputs correct)
  if (userInputArray == answerArray) {
    // prepare for a new round
    boardActive = false; // deactivate the board
    userInputArray = []; // reset user input array
    addNewNumberToAnswer(); // randomly gen new number and append to answer array
    levelNumberSpan.innerText = answerArray.length; // increase the level number in the UI

    // flash answerArray in sequence
    for (let index = 0; index < answerArray.length; index++) {
      setTimeout(function() {
        flashButton(answerArray[index]);
      }, flashInterval/2);    
    }
  }
  console.log("aaaa");

})
