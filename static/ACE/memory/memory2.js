
let addressBook = [
  {
    Name: "sunil kumar",
    Street: "station road",
    Locality: "patel nagar",
    District: "indore",
    State: "madhya pradesh"
    },
    {
    Name: "ramesh patel",
    Street: "shastri marg",
    Locality: "saket nagar",
    District: "bhopal",
    State: "madhya pradesh"
    },
    {
    Name: "suresh sharma",
    Street: "rajendra nagar",
    Locality: "rajendra park",
    District: "new delhi",
    State: "delhi"
    },
    {
    Name: "ravi gupta",
    Street: "palika bazaar",
    Locality: "kanpur",
    District: "kanpur nagar",
    State: "uttar pradesh"
    },
    {
    Name: "anand patel",
    Street: "sardar patel road",
    Locality: "ahmedabad",
    District: "ahmedabad",
    State: "gujarat"
    }
   
];
let isAudioPlaying = false;
let isRecording = false;
let size=addressBook.length;
let objsize =Object.values(addressBook[0]).length;
let rand=Math.floor(Math.random()*size);
//Store the random number in local storage
localStorage.setItem("rand", rand);
let actual=[];
for(let i=0;i<objsize;i++){
  document.getElementById("w"+i).innerHTML = Object.entries(addressBook[rand])[i][0] + ": " + Object.entries(addressBook[rand])[i][1];
  actual.push(Object.entries(addressBook[rand])[i][1]);
 
}
function textToAudio(num){
  if (isRecording) {
    // Display an error message or return from the function
    document.getElementById('recognition-status').textContent="🔴 Voice recognition is currently in progress";
    return;
  }
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
        // Set the flag to true when the audio starts playing
        isAudioPlaying = true;
        // Set the flag to false when the audio ends
        msg.addEventListener('end', () => {
          isAudioPlaying = false;
  });
       
  }
  // repeats back spoken words
function repeat(message){
  let text;
  if (message === "") {
    text = "Please speak";
  } else {
    text = "You said " + message;
  }   
  const msg = new SpeechSynthesisUtterance(text);

  msg.lang = "hi-IN";

const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
      msg.voice = voices[0];
      msg.volume = 1;
      msg.rate = 0.8;
      msg.pitch = 1;
      window.speechSynthesis.cancel(msg);
      window.speechSynthesis.speak(msg);

}
// audio to text
let ans=new Array();
// Define a function to start speech recognition
function audioToText(i){
  if (isAudioPlaying) {
    // Display an error message or return from the function

    document.getElementById('recognition-status').textContent="🔴 Audio is currently playing";
    return;
  }
   // Set the flag to true when the recognition starts
   isRecording = true;
let message="";
const recognition = new webkitSpeechRecognition() || window.SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-IN';

// Set up event listeners for the Web Speech API
recognition.addEventListener('start', () => {
  // Display a message when recognition starts
  document.getElementById('recognition-status').textContent = '🔴 Voice Recognition started';
});
recognition.addEventListener('result', (event) => {
  // Get the transcribed text
  const transcript = event.results[0][0].transcript;

  message=transcript;
  message=message.toLowerCase();
  if(message[message.length-1]==="."){
  message=message.slice(0,-1);
  }
  ans[i]=message;
  // Check if the recognition process has completed
  if (event.results[0].isFinal) {
    // Stop recognition if the process has completed
    recognition.stop();
  }
});
recognition.addEventListener('end', () => {
  // Display a message when recognition ends
  document.getElementById('recognition-status').textContent = '🟢 Voice Recognition ended';
  repeat(message);
  // Set the flag to false when the recognition ends
  isRecording = false;
});
recognition.start();
// Stop recognition after 5 seconds
  setTimeout(() => {
  recognition.stop();
}, 5000);
}
function scoring(){
  let score=0,sent=false;
  for(let i=0;i<5;i++){
     if(ans[i]==Object.values(addressBook[rand])[i]){
              if(i==0){
                score+=3;
              }
              else{
                score++;
              }
      } 
  }
    localStorage.setItem("score", score);
    //mapping of actual response with user response
    let ansMap = new Map();
    for(let i=0;i<5;i++){
      ansMap.set(actual[i], ans[i]);
    }
    $.ajax({
      type: "POST",
      url: "/send_score",
      data: { 
         score: score,
         column: "memory2",
         source:"memory2_response",
         user_response:JSON.stringify(Object.fromEntries(ansMap))
      },
      success: function(response) {
         console.log(response);
         sent=true; 
         redirect(sent);     
      } 
      
   });
 }
 function redirect(sent){
   if(sent===true){
     window.location.href=nextUrl;
   }
 }



