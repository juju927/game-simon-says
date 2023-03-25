// variables

const userInputArray = []; //stores user inputs - reset every level
const answerArray = []; //stores computer generated answer - add to it every level, reset every game over

var userInputIndex = -1; //keeps track of user's number of inputs - add to it every button press, reset every level
var gamePage = "start"; // or playing or end 



const gameGridEl = document.querySelector(".game-grid");

const levelNumberSpan = document.querySelector("#level");


// functions
function addNewNumberToAnswer() {
  answerArray.push(Math.floor(Math.random()*9 + 1));
}

function addNewNumberToInputArray(number) {
  userInputArray.push(number);
}


// DOM Manipulation

levelNumberSpan.innerText = answerArray.length;

gameGridEl.addEventListener("click", function(e) {
  e.preventDefault();

  if (e.target.getAttribute('class') != 'grid-button') {
    console.log("not a button");
    return;
  }

  console.log("button");
})
