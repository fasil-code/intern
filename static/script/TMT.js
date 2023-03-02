const nCircle = 25;
const grid = document.getElementById('grid');
const thumbRule = 90;

let startTime;
let timeTaken;
let wrongClicks = 0;
let timeArray = [];
startTime = Date.now();

for (let i = 1; i <= nCircle; i++) {
    const cell = document.createElement('div');
    cell.classList.add(`box${i}`);
    cell.classList.add(`box`);
    cell.innerText = i;
    grid.appendChild(cell);
}

const cell  = document.querySelectorAll('.box');
const timer = document.getElementById('timer');

for(let t=thumbRule; t>=0; t--) {
    setTimeout(() => {
        timer.innerText = t;
    }, (thumbRule-t)*1000);
}

const coordinates = 
Array.from({length: cell.length}, () => [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)]);
const usedCoords = new Set();
for(let i = 0; i < cell.length; i++) {
    let coord = coordinates[i];
    while(usedCoords.has(coord.toString())) {
        coord = [Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 10)];
    }
    usedCoords.add(coord.toString());
    cell[i].style.gridColumnStart = coord[0];
    cell[i].style.gridColumnEnd   = coord[0] + 1;
    cell[i].style.gridRowStart    = coord[1];
    cell[i].style.gridRowEnd      = coord[1] + 1;
}

let i = 1;
let blinkInterval = null;
let completed = false;

function displayResult() {
    timeTaken = Date.now() - startTime;
    let verdict;
    if(timeTaken < 78*1000) {
        verdict = 'Normal';
    } else {
        verdict = 'Deficient';
    }
    grid.style.display = 'none';
    grid.style.height  = '0px';
    document.getElementById('exit').style.display = 'none';
    let result = document.getElementById('result');
    result.style.display = 'flex';
    let router = document.getElementById('container');
    router.style.display = 'flex';
    document.getElementById('pul').innerText = verdict;
    document.getElementById('cor').innerText = timeTaken/1000;
    document.getElementById('wrn').innerText = wrongClicks;
    let jsonArray = JSON.stringify(timeArray);
    console.log(jsonArray);
    $.ajax({
        type: "POST",
        url: "/send_score",
        data: { 
          tmt1: timeTaken,
          wrn1: wrongClicks,
          timestamp1: jsonArray,
          column: "tmt"
        },
        success: function(response) {
           console.log(response);    
        }   
    });
}

let completionInterval = setInterval(() => {
    if(!completed) {
        displayResult();
        clearInterval(completionInterval);
    }
}, thumbRule*1000);

document.addEventListener('click', function (event) {
    timeArray.push(Date.now() - startTime);
    let target = event.target;
    if(target.classList.contains(`box${i}`)) {
        target.style.backgroundColor = 'rgb(102, 182, 106)';
        if(blinkInterval) {
            let correctDiv = document.getElementsByClassName(`box${i}`)[0];
            correctDiv.classList.remove('animate');
            clearInterval(blinkInterval);
        }
        i++;
        if(i > nCircle) {
            completed = true;
            displayResult();
        }
    } else if(target.classList.contains('box')) {
        wrongClicks++;
        if(blinkInterval) {
            let correctDiv = document.getElementsByClassName(`box${i}`)[0];
            correctDiv.classList.remove('animate');
            clearInterval(blinkInterval);
        }
        blinkInterval = setInterval(() => {
            let correctDiv = document.getElementsByClassName(`box${i}`)[0];
            correctDiv.classList.add('animate');
            correctDiv.style.backgroundColor = 
            (correctDiv.style.backgroundColor === 'rgb(102, 182, 106)') ? 'white' : 'rgb(102, 182, 106)';
        }, 500);
    }
});

