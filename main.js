import './style.css'


const foods = [
  "pizza",
  "hamburger",
  "noodles",
  "sushi",
  "soup",
  "steak"
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
   answer = foods[Math.floor(Math.random() * foods.length)];
}

function getButtons(){
  let buttonHTML = '';
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  for(let i=0;i<letters.length;i++){
    const letter = letters[i];
    buttonHTML += `
      <button id = "${letter}" onClick="handleGuess('${letter}')"style="font-size: 20px;" >
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

function whoIsTheWinner(){
  if(answer === TheAnswerWord.textContent){
    board.innerHTML = 'You made it!!!';
    board.style.color = "white";
    board.style.fontSize = "25px";
  }   
}

function whoIsTheLoser(){
  if(mistakes === maxWrong){
    TheAnswerWord.innerHTML = 'The answer was: ' + answer;
    board.innerHTML = "you did not succeed...";
    board.style.fontSize = "25px";
    board.style.color = "red";
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