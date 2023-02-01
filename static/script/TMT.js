const nCircle = 25;
const grid = document.getElementById('grid');

let startTime;
let timeTaken;

startTime = Date.now();

for (let i = 1; i <= nCircle; i++) {
    const cell = document.createElement('div');
    cell.classList.add(`box${i}`);
    cell.classList.add(`box`);
    cell.innerText = i;
    grid.appendChild(cell);
}

const cell = document.querySelectorAll('.box');

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
    cell[i].style.gridColumnEnd = coord[0] + 1;
    cell[i].style.gridRowStart = coord[1];
    cell[i].style.gridRowEnd = coord[1] + 1;
}

let i = 1;
let blinkInterval = null;
document.addEventListener('click', function (event) {
    let target = event.target;
    if(target.classList.contains(`box${i}`)) {
        target.style.backgroundColor = 'rgb(102, 182, 106)';
        if(blinkInterval) {
            clearInterval(blinkInterval);
        }
        i++;
        if(i > nCircle) {
            timeTaken = Date.now() - startTime;
            let verdict;
            if(timeTaken < 78000) {
                verdict = 'Normal';
            } else {
                verdict = 'Deficient';
            }
            grid.style.display = 'none';
            grid.style.height = '0px';
            let result = document.getElementById('result');
            result.style.display = 'flex';
            const resultTable = `
                <table>
                <tr>
                    <th>Result</th>
                    <th></th>
                </tr>
                <tr>
                    <td>Total Time</td>
                    <td>${timeTaken} ms</td>
                </tr>
                <tr>
                    <td>In seconds</td>
                    <td>${timeTaken/1000} s</td>
                </tr>
                <tr>
                    <td>Verdict</td>
                    <td>${verdict}</td>
                </tr>
                </table>
                `;
            result.innerHTML = resultTable;
            let router = document.getElementById('container');
            router.style.display = 'flex';

        }
    } else if(target.classList.contains('box')) {
        if(blinkInterval) {
            clearInterval(blinkInterval);
        }
        blinkInterval = setInterval(() => {
            let correctDiv = document.getElementsByClassName(`box${i}`)[0];
            correctDiv.style.backgroundColor = 
            (correctDiv.style.backgroundColor === 'rgb(102, 182, 106)') ? 'white' : 'rgb(102, 182, 106)';
        }, 500);
    }
});
