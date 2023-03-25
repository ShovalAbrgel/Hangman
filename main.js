import './style.css'


const sports = [
  "tennis",
  "running",
  "basketball",
  "football",
  "judo",
  "bowling"
];

let mistakes = 0;
let maxWrong = 5;
let gusses = []; 
let answer = "";
let guessWord = null;

let maxWorngValue = document.getElementById("maxWorngValue");
let hangmanPic = document.getElementById("hangmanPic");
let board = document.getElementById("board");
let TheAnswerWord = document.getElementById("TheAnswerWord");



function getRandomWord(){
   answer = sports[Math.floor(Math.random() * sports.length)];
}

function getButtons(){
  let buttonHTML = '';
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  for(let i=0;i<letters.length;i++){
    const letter = letters[i];
    buttonHTML += `
      <button id = "${letter}" onClick="handleGuess('${letter}')">
        ${letter}
        </button>
    `;
  }

  board.innerHTML = buttonHTML;
}


window.handleGuess= function(chosenLetter){
  gusses.indexOf(chosenLetter) === -1 ? gusses.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled' , true);

  if(answer.indexOf(chosenLetter) >=0 ){
    gussedWord();
    whoIsTheWinner();
  }else if(answer.indexOf(chosenLetter) === -1){
    mistakes++;
    updateMistakes();
    whoIsTheLoser();
    upDatePicHangman();
  }
}

function upDatePicHangman(){
  hangmanPic.src = "./images/" + mistakes + ".png";
}

function gussedWord(){
  let guessWord = '';
  const answerLetters = answer.split('');
  for(let i=0;i<answerLetters.length;i++){
    const letter = answerLetters[i];
    if(gusses.indexOf(letter) >=0 ){
      guessWord += letter;
    }else{
      guessWord += ' _ ';
    }
  }

  TheAnswerWord.innerHTML = guessWord;
}


board.style.color = "font-weight: bold";
board.style.color = "thistle";

function whoIsTheWinner(){
  if(answer === TheAnswerWord.textContent){
    board.innerHTML = 'הצלחת!!!';
  }   
}

function whoIsTheLoser(){
  if(mistakes === maxWrong){
    TheAnswerWord.innerHTML = 'התשובה הייתה: ' + answer;
    board.innerHTML = "לא הצליח לך...";
  }
}


function updateMistakes(){
  document.getElementById("mistakes").innerHTML = mistakes;
}

window.btnRestartGameClicked = function(){
  mistakes = 0;
  gusses.length = 0;
  hangmanPic.src = './images/0.png';

  getRandomWord();
  gussedWord();
  updateMistakes();
  getButtons();
}

maxWorngValue.textContent = maxWrong;

getRandomWord();
getButtons();
gussedWord();
