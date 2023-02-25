
let idioms=["A bird in the hand is worth two in the bush","A dime a dozen","A fish out of water","A leopard cannot change its spots","A penny saved is a penny earned","Actions speak louder than idioms","Add insult to injury","All that glitters is not gold","An eye for an eye","Apple of my eye","Barking up the wrong tree","Beating around the bush","Bite off more than you can chew","Bite your tongue","Break a leg","Burn the midnight oil","Burn your bridges","Butter someone up","Call it a day","Cat got your tongue","Cost an arm and a leg","Cry over spilt milk","Cut to the chase","Devil's advocate","Different strokes for different folks","Do not judge a book by its cover","Don't put all your eggs in one basket","Draw the line","Dressed to the nines","Easier said than done","Elephant in the room","Every cloud has a silver lining","Feast or famine","Fit as a fiddle","Get a taste of your own medicine","Get on someone's nerves","Give someone the cold shoulder","Go down the rabbit hole","Go for broke","Go out on a limb","Go the extra mile","Good things come to those who wait","Hang in there","Hit the nail on the head","Hit the road","Hold your horses","In the heat of the moment","Jump the gun","Keep your eyes peeled","Keep your nose to the grindstone","Knock on wood","Let the cat out of the bag","Lick your wounds","Miss the boat","Mum's the word","Neck and neck","On the ball","On the fence","Once in a blue moon","Out of left field","Paint the town red","Play your cards right","Pull out all the stops","Pull the wool over someone's eyes","Put all your eggs in one basket","Put it on the back burner","Rain on someone's parade","Red herring","Ride shotgun","Rise and shine","Rule of thumb","See eye to eye","Shoot the breeze","Sick as a dog","Sitting on the fence","Sleep like a baby","Smooth as silk","Sour grapes","Take the bull by the horns","Take the plunge","Thick as thieves","Throw in the towel","Tickled pink","Time is money"];
let n=idioms.length-1;
let arr=new Array(2);
let ans=new Array(2);
let actual=new Array(2);
let isAudioPlaying = false;
let isRecording = false;

function memorize(){
    
    for(let i=0;i<2;i++){
        let r=Math.floor(Math.random()*n);
        while (arr.indexOf(idioms[r]) !== -1) {
          r = Math.floor(Math.random() * n);
      }
            arr[i]=idioms[r].toLowerCase();
            actual[i]=idioms[r].toLowerCase();
           
       
    }
    document.getElementById("w1").innerHTML=arr[0];
    document.getElementById("w2").innerHTML=arr[1];
    // document.getElementById("w3").innerHTML=arr[2];
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
//repeats back spoken idioms
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
    //  console.log(ans[i]);
    
  });
  recognition.start();
   // Stop recognition after 6 seconds
   setTimeout(() => {
    recognition.stop();
  }, 70000);
}   
 //scoring
function scoring(){
  let score=0;
  let sent=false;
  for(let i=0;i<2;i++){
      console.log(ans[i]);
      let ind=arr.indexOf(ans[i]);
     
     if(ind!=-1){
         score++;
         arr.splice(ind,1);
     }
  }
 
  //mapping of actual response with user response
  let ansMap = new Map();
  for(let i=0;i<2;i++){
    ansMap.set(actual[i], ans[i]);
  }
  $.ajax({
    type: "POST",
    url: "/send_score",
    data: { 
       score: score,
       column: "language5",
       source:"language5_response",
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




