let words = [
  "amazing",
  "banana",
  "courage",
  "diamond",
  "elephant",
  "fascinate",
  "generous",
  "happiness",
  "imagination",
  "journey",
  "knowledge",
  "lovely",
  "magnificent",
  "optimism",
  "passion",
  "quality",
  "relaxation",
  "satisfaction",
  "tendency",
  "understand",
  "venture",
  "welcome",
  "xylophone",
  "youthful",
  "abundance",
  "beautiful",
  "creative",
  "exciting"
];
let n=words.length-1;
let arr=new Array(3);
let actual=new Array(3);
let isAudioPlaying = false;
let isRecording = false;
function memorize(){
    
  for(let i=0;i<3;i++){
    let r=Math.floor(Math.random()*n);
    while (arr.indexOf(words[r]) !== -1) {
        r = Math.floor(Math.random() * n);
    }
    arr[i]=words[r].toLowerCase();
    actual[i]=words[r].toLowerCase();
}
    localStorage.setItem('arr', JSON.stringify(arr));
    document.getElementById("w1").innerHTML=arr[0];
    document.getElementById("w2").innerHTML=arr[1];
    document.getElementById("w3").innerHTML=arr[2];
}


memorize();

function textToAudio(num){
   // Check the value of the flag
  if (isRecording) {
    // Display an error message or return from the function
    document.getElementById('recognition-status').textContent="🔴 Voice recognition is currently in progress";
    return;
  }
  const msg = new SpeechSynthesisUtterance(
    arr[num]
    
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
//repeats back spoken words
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

let ans=new Array(3);
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

    // Display the transcribed text
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
  // Stop recognition after 4 seconds
  setTimeout(() => {
  recognition.stop();
}, 5000);
}   
 //scoring

 function scoring(){
  let sent=false;
  let score=0;
  for(let i=0;i<3;i++){
      let ind=arr.indexOf(ans[i]);
     if(ind!=-1){
         score++;
         arr.splice(ind,1);
     }
  }
  //mapping of actual response with user response
  let ansMap = new Map();
  for(let i=0;i<3;i++){
    ansMap.set(actual[i], ans[i]);
  }
  $.ajax({
     type: "POST",
     url: "/send_score",
     data: { 
        score: score,
        column: "attention2",
        source:"attention2_response",
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


