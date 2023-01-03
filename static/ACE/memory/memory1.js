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
        msg.rate = 0.6;
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
  }
  function scoring(){
    let score=0;
    let arr = JSON.parse(localStorage.getItem('arr'));
    for(let i=0;i<3;i++){
        let ind=arr.indexOf(ans[i]);
       if(ind!=-1){
           score++;
           arr.splice(ind,1);
       }
    }
    var elems = document.getElementsByClassName('container');
    for (var i=0;i<elems.length;i++){
        elems[i].style.display = 'none';
    }
    let x=document.getElementById("result");
    x.innerHTML="Your Score is "+score +" /3";
    x.style.textAlign = 'center';
    x.style.fontSize = '80px';
    x.style.color = 'red';
  }