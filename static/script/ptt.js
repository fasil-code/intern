/*

// TODO ==> CLick on whole doc penalised and noted
// wrong button click separate note-taking

*/

const pulses     = 5; // TBD
const clickTime  = 5; // Given 5 sec
const duration   = 2; // TBD
const restTime   = 10; // Given 10 sec

const box1     = document.getElementById('box1');
const box2     = document.getElementById('box2');
const timer    = document.getElementById('timer');
const result   = document.getElementById('result');
const score    = document.getElementById('score');
const grid     = document.getElementById('grid');
const timerbox = document.getElementById('timer-box');
const pul      = document.getElementById('pul');
const cor      = document.getElementById('cor');
const wrn      = document.getElementById('wrn');

class Data {
  constructor(greyClicks, correctClicks, wrongClicks, successArray, timeStampGray, timeStampCorrect, timeStampWrong) {
    this.greyClicks       = greyClicks;
    this.correctClicks    = correctClicks;
    this.wrongClicks      = wrongClicks;
    this.successArray     = successArray;
    this.timeStampGray    = timeStampGray;
    this.timeStampCorrect = timeStampCorrect;
    this.timeStampWrong   = timeStampWrong;
  }

  get score() {
    return this.successArray.reduce((a, b) => a + b, 0);
  }
}

let greyClicks       = 0;
let timeStampGray    = [];
let correctClicks    = 0;
let timeStampCorrect = [];
let wrongClicks      = 0;
let timeStampWrong   = [];
let successArray     = [];
let isClicked        = false;
// const Data = new Data(greyClicks, correctClicks, wrongClicks, successArray, timeStampGray, timeStampCorrect, timeStampWrong);
document.getElementById('proceed').addEventListener('click', function () {
  box1.style.display = 'flex';
  box2.style.display = 'flex';
  Game();
  document.getElementById('prompt').style.display = 'none';
});


function handleClicks() {
  isClicked = true;
  correctClicks++;
  let time = Date.now();
  timeStampCorrect.push(time);
}

function penaliseClicks() {
  wrongClicks++;
  let time = Date.now();
  timeStampWrong.push(time);
}
function Game() {
  for(let t=clickTime*pulses; t>=0; t--) {
    setTimeout(() => {
        timer.innerText = t;
    }, ((clickTime*pulses)-t)*1000);
  }

  for(let i = 0; i < pulses; i++) {
    const startTime = Math.floor(Math.random() * ((clickTime-duration)*1000));
    box2.addEventListener('click', penaliseClicks);
    setTimeout(() => {
      box2.removeEventListener('click', penaliseClicks);
      box2.addEventListener('click', handleClicks);
      box1.classList.add('animate');
      box1.innerText = 'Pulse';
      setTimeout(() => {
        box2.removeEventListener('click', handleClicks);
        box2.addEventListener('click', penaliseClicks);
        if(isClicked) {
          successArray.push(1);
        } else {
          successArray.push(0);
        }
        isClicked = false;
        box1.classList.remove('animate');
        box1.innerText = '';
        if(isClicked) {
          console.log('penalise');
        }
      }, duration*1000);
    }, startTime + i*clickTime*1000);
  }

  setTimeout(() => {
    box2.addEventListener('click', () => {
      greyClicks++;
      let time = Date.now();
      timeStampGray.push(time);
    });
    box1.style.backgroundColor = 'gray';
    box2.style.backgroundColor = 'gray';
    box2.innerHTML = '';
    timer.innerText = 'STOP!';
  }, pulses*clickTime*1000);

  
  setTimeout(() => {
    result.style.display = 'flex';
    score.style.display = 'flex';
    let router = document.getElementById('container');
    router.style.display = 'flex';
    pul.innerText = pulses;
    // cor.innerText = Data.score;
    cor.innerText = successArray.reduce((a, b) => a + b, 0);
    wrn.innerText = wrongClicks;
    console.log('Gray Clicks');
    console.log(greyClicks);
    // console.log(Data.greyClicks)
    console.log(timeStampGray);
    console.log('Correct Clicks');
    console.log(correctClicks);
    console.log(timeStampCorrect);
    console.log('Wrong Clicks');
    console.log(wrongClicks);
    console.log(timeStampWrong);
    console.log('Success Array');
    console.log(successArray);
    box1.style.display = 'none';
    box2.style.display = 'none';
    grid.style.display = 'none';
    timerbox.style.display = 'none';

    $.ajax({
      type: "POST",
      url: "/send_score",
      data: { 
         score: successArray.reduce((a, b) => a + b, 0),
         column: "ptt"
      },
      success: function(response) {
         console.log(response);    
      }   
    });

  }, (pulses*clickTime+restTime)*1000);

}
