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
var str = "ABCD";
var x = Math.floor(Math.random() * 3);
var answers1 = []
var correctans1 = [];
for (var y = 0; y < 5; y++) {
    answers1.push(str[x]);
    x = Math.floor(Math.random() * 3);
}
for (var z = 0; z < 5; z++) {
    if (answers1[z] === 'A')
        correctans1[z] = 0;
    else if (answers1[z] === 'B')
        correctans1[z] = 1;
    else if (answers1[z] === 'C')
        correctans1[z] = 2;
    else if (answers1[z] === 'D')
        correctans1[z] = 3;
}
const floor=2;
document.getElementById("Bquest1"+correctans1[0]).innerText=floor;
listfloor=[floor-1,floor+1,floor+2,floor+3,floor+4];
var i=0;
var j=Math.floor(Math.random()*4);
while(i<4){
     if(i==correctans1[0])i++;
     document.getElementById("Bquest1"+i).innerText=listfloor[j];
     j=(j+1)%5;
     i++;
}
const street="KC Road";
document.getElementById("Bquest2"+correctans1[1]).innerText=street;
liststreet=["Gandhi Nagar","Bhatindi","Shakti Nagar","Sujwah"];
var i=0;
var j=Math.floor(Math.random()*3);
while(i<4){
     if(i==correctans1[1])i++;
     document.getElementById("Bquest2"+i).innerText=liststreet[j];
     j=(j+1)%4;
     i++;
}
const city="Jammu";
document.getElementById("Bquest3"+correctans1[2]).innerText=city;
liststreet=["Delhi","Indore","Jaipur","Srinagar"];
var i=0;
var j=Math.floor(Math.random()*3);
while(i<4){
     if(i==correctans1[2])i++;
     document.getElementById("Bquest3"+i).innerText=liststreet[j];
     j=(j+1)%4;
     i++;
}
const state="Jammu and Kashmir";
document.getElementById("Bquest4"+correctans1[3]).innerText=state;
liststate=["Delhi","Mumbai","Madhya Pradesh","Bihar"];
var i=0;
var j=Math.floor(Math.random()*3);
while(i<4){
     if(i==correctans1[3])i++;
     document.getElementById("Bquest4"+i).innerText=liststate[j];
     j=(j+1)%4;
     i++;
}
const country="India";
document.getElementById("Bquest5"+correctans1[4]).innerText=country;
listcountry=['Bangladesh','Indonesia','Sri Lanka','Bhutan'];
var i=0;
var j=Math.floor(Math.random()*3);
while(i<4){
     if(i==correctans1[4])i++;
     document.getElementById("Bquest5"+i).innerText=listcountry[j];
     j=(j+1)%4;
     i++;
}
tot = answers1.length;
function getCheckedValue(radioName) {
    var radios = document.getElementsByName(radioName);
    for (var y = 0; y < radios.length; y++)
        if (radios[y].checked) return radios[y].value;
}
function getScore() {
    var score = 0;
    for (var i = 0; i < tot; i++)
        if (getCheckedValue("question" + i) === answers1[i]) score += 1;
    return score;
}
function returnScore() {
    document.getElementById("Bmyresults").innerHTML =
        "Your score is " + getScore() + "/" + tot;
    if (getScore() > 2) {
        console.log("Bravo");
    }
}
