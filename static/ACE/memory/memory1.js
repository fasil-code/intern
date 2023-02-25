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
      document.getElementById('text'+i).textContent = transcript;
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
      
    });
    recognition.start();
    // Stop recognition after 5 seconds
    setTimeout(() => {
    recognition.stop();
  }, 4000);
  }
  let score=0;
  function scoring(){
    let sent=false;
   
    let arr = JSON.parse(localStorage.getItem('arr'));
    let actual = JSON.parse(localStorage.getItem('arr'));
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
         column: "memory1",
         source:"memory1_response",
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