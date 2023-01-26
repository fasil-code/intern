let addressBook = [
  {
      Name: "Sunil Kumar",
      Street: "Station Road",
      Locality: "Patel Nagar",
      District: "Indore",
      State: "Madhya Pradesh"
  },
  {
      Name: "Ramesh Patel",
      Street: "Shastri marg",
      Locality: "Saket Nagar",
      District: "Bhopal",
      State: "Madhya Pradesh"
  },
  {
      Name: "Suresh Sharma",
      Street: "Rajendra Nagar",
      Locality: "Gandhi Nagar",
      District: "New Delhi",
      State: "Delhi"
  },
  {
    Name: "Ravi Gupta",
    Street: "Palika Bazaar",
    Locality: "Kanpur",
    District: "Kanpur Nagar",
    State: "Uttar Pradesh"
},
{
    Name: "Anand Patel",
    Street: "Sardar Patel Road",
    Locality: "Ahmedabad",
    District: "Ahmedabad",
    State: "Gujarat"
}
];
let size=addressBook.length;
let objsize =Object.values(addressBook[0]).length;
let rand=Math.floor(Math.random()*size);
//Store the random number in local storage
localStorage.setItem("rand", rand);

for(let i=0;i<objsize;i++){
  document.getElementById("w"+i).innerHTML = Object.entries(addressBook[rand])[i][0] + ": " + Object.entries(addressBook[rand])[i][1];

}
function textToAudio(num){
    const msg = new SpeechSynthesisUtterance(
      Object.values(addressBook[rand])[num]
      
    );
    msg.lang = "hi-IN";
  
  const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
        
        msg.voice = voices[1];
        msg.volume = 1;
        msg.rate=0.8;
        msg.pitch = 0.8;
        window.speechSynthesis.cancel(msg);
        window.speechSynthesis.speak(msg);
  
  }