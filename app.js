const arr = ['rock', 'paper', 'scissors'];
let countRounds = 0;
let countPl = 0;
let countComp = 0;
let playerSelection = '';

const wrap = document.querySelector('.wrap');
const countPlayer = document.querySelector('.count--player');
const countComputer = document.querySelector('.count--computer');
const chooseImgs = document.querySelectorAll('img');
const btn = document.querySelector('.btn');
const divImgs = document.querySelector('.choose-img');
const result = document.querySelector('.result');

btn.addEventListener('click', play);

function play() {
  divImgs.classList.remove('disabled');
  btn.classList.add('disabled');
  btn.innerText = 'Playing...';
  document.querySelector('.final').remove();
  result.innerText = '';
  countRounds = 0;
  countPl = 0;
  countComp = 0;
  countComputer.innerText = '0';
  countPlayer.innerText = '0';
}

chooseImgs.forEach(chImg => {
  chImg.addEventListener('click', chooseImg);
});

function chooseImg(e) {
  e.preventDefault();
  const id = e.target.dataset.id;
  chooseImgs.forEach(img => img.classList.remove('not-active'));
  chooseImgs.forEach(img => {
    (img.dataset.id === id) ? img.classList.add('active'): img.classList.add('not-active');
  });

  playerSelection = arr[id];
  let result = '';

  if (countRounds < 4) {
    [result, countPl, countComp] = game();
    addToHTML(result, countPl, countComp);
    countRounds++;
  } else if (countRounds === 4) {
    [result, countPl, countComp] = game();
    addToHTML(result, countPl, countComp);
    divImgs.classList.add('disabled');
    btn.innerText = 'Play again';
    btn.classList.remove('disabled');
    chooseImgs.forEach(img => img.classList.remove('active', 'not-active'));

    final();
  }
}

function addToHTML(res, countPl, countComp) {
  let div = document.createElement('div');
  div.classList.add('center');
  div.innerText = `${countRounds + 1}. ${res}`;
  result.appendChild(div);
  countPlayer.innerText = countPl;
  countComputer.innerText = countComp;
}

function final() {
  let finalResult = '';
  if (countPl > countComp) {
    finalResult = 'You win this game.';
  } else if (countComp > countPl) {
    finalResult = 'You lose this game.';
  } else {
    finalResult = 'Draw in this game.';
  }
  let div = document.createElement('div');
  div.classList.add('final');
  div.innerText = finalResult;
  wrap.appendChild(div);
}

function computerPlay() {
  return arr[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection === computerSelection) {
    return 'Draw!';
  }
  if (playerSelection == 'rock' && computerSelection == 'paper') {
    return 'You Lose! Paper beats Rock';
  } else if (playerSelection == 'rock' && computerSelection == 'scissors') {
    return 'You Win! Rock beats Scissors';
  } else if (playerSelection == 'paper' && computerSelection == 'rock') {
    return 'You Win! Paper beats Rock';
  } else if (playerSelection == 'paper' && computerSelection == 'scissors') {
    return 'You Lose! Scissors beats Paper';
  } else if (playerSelection == 'scissors' && computerSelection == 'rock') {
    return 'You Lose! Rock beats Scissors';
  } else if (playerSelection == 'scissors' && computerSelection == 'paper') {
    return 'You Win! Scissors beats Paper';
  }
}

function game() {
  let computerSelection = computerPlay();
  let result = playRound(playerSelection, computerSelection);

  if (result.startsWith('You Win')) {
    countPl += 1;
  } else if (result.startsWith('You Lose')) {
    countComp += 1;
  }
  return [result, countPl, countComp];
}