function play0() {
    var audio = document.getElementById("audio0");
    audio.play();
}
function play1() {
    var audio = document.getElementById("audio1");
    audio.play();
}
function play2() {
    var audio = document.getElementById("audio2");
    audio.play();
}
function play3() {
    var audio = document.getElementById("audio3");
    audio.play();
}
function play4() {
    var audio = document.getElementById("audio4");
    audio.play();
}
const day = new Date().getDay();
const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
var str = "ABCD";
var x = Math.floor(Math.random() * 3);
var answers = []
var correctans = [];
for (var y = 0; y < 5; y++) {
    answers.push(str[x]);
    x = Math.floor(Math.random() * 3);
}
for (var z = 0; z < 5; z++) {
    if (answers[z] === 'A')
        correctans[z] = 0;
    else if (answers[z] === 'B')
        correctans[z] = 1;
    else if (answers[z] === 'C')
        correctans[z] = 2;
    else if (answers[z] === 'D')
        correctans[z] = 3;
}
list = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
monthlist = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];
document.getElementById("quest1" + correctans[0]).innerText = list[day];
document.getElementById("quest2" + correctans[1]).innerText = date;
document.getElementById("quest3" + correctans[2]).innerText = monthlist[month];
document.getElementById("quest4" + correctans[3]).innerText = year;
var i = 0;
var j = Math.floor(Math.random() * 7);
while (i < 4) {
    if (i === correctans[0])
        i += 1;
    if (list[j] !== list[day]) {
        document.getElementById("quest1" + i).innerText = list[j];
        i += 1;
    }
    j = (j + 1) % 7;
}
i = 0;
list2 = []
list2.push(date - 1)
list2.push(date + 1)
list2.push(date - 2)
list2.push(date + 2)
list2.push(date - 3)
list2.push(date + 3)
list2.push(date - 4)
list2.push(date + 4)
list2.push(date + 5)
list2.push(date + 6)
var k = Math.floor(Math.random() * 9);
while (i < 4) {
    if (i === correctans[1]) i++;
    if (list2[k] !== date) {
        document.getElementById("quest2" + i).innerText = list2[k];
        i += 1;
    }
    k = (k + 1) % 10
}
var i = 0;
var j = Math.floor(Math.random() * 11);
while (i < 4) {
    if (i === correctans[2]) i++;
    if (monthlist[month] !== monthlist[j]) {
        document.getElementById("quest3" + i).innerText = monthlist[j];
        i += 1;
    }
    j = (j + 1) % 12;
}
i = 0;
list3 = []
x = year
list3.push(x + 2)
list3.push(x + 4)
list3.push(x - 5)
list3.push(year + 5)
list3.push(year + 1)
list3.push(year - 1)
list3.push(year + 3)
list3.push(year - 3)
list3.push(year + 6)
list3.push(year - 6)
var k = Math.floor(Math.random() * 9);
while (i < 4) {
    if (i === correctans[3]) i++;
    if (list3[k] != year) {
        document.getElementById("quest4" + i).innerText = list3[k];
        i += 1;
    }
    k = (k + 1) % 10
}
seasonlist = ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter']
season = "";
if (month == 2 || month == 3)
    season = "Spring";
else if (month == 4 || month == 5)
    season = "Summer";
else if (month == 6 || month == 7)
    season = "Monsoon"
else if (month == 8 || month == 9)
    season = "Autumn";
else
    season = "Winter";
i = 0;
document.getElementById("quest5" + correctans[4]).innerText = season;
var k = Math.floor(Math.random() * 5);
while (i < 4) {
    if (i === correctans[4]) i++;
    if (seasonlist[k] != season) {
        document.getElementById("quest5" + i).innerText = seasonlist[k];
        i += 1;
    }
    k = (k + 1) % 5
}
tot = answers.length;
function getCheckedValue(radioName) {
    var radios = document.getElementsByName(radioName);
    for (var y = 0; y < radios.length; y++)
        if (radios[y].checked) return radios[y].value;
}
function getScore() {
    var score = 0;
    for (var i = 0; i < tot; i++)
        if (getCheckedValue("question" + i) === answers[i]) score += 1;
    return score;
}
function returnScore() {
    document.getElementById("myresults").innerHTML =
        "Your score is " + getScore() + "/" + tot;
    if (getScore() > 2) {
        console.log("Bravo");
    }
}
