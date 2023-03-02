  // type of test
   var flag=false;
   var msg;
  let buttonText;
  if (nexturl == "emoji") {
      buttonText = "Emoji Game";
      let emojiMessage=`
1. You will have to choose one of the emoji based on description given.
2. Once you select your answer, it can't be undone.
3. You can't select any option once time goes off.
4. You can't exit from the Test while you're opting.
5. You'll get points on the basis of your correct answers.
      
      `;
      function repeat(){

        let text;
        if (emojiMessage === "") {
          text = "Please speak";
        } else {
          text =  emojiMessage;
        }   
      

             msg = new SpeechSynthesisUtterance(text);
         
          
            msg.lang = "en-IN";
          
          const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
                msg.voice = voices[0];
                msg.volume = 1;
                msg.rate = 0.9;
                msg.pitch = 1;
                window.speechSynthesis.cancel(msg);
                window.speechSynthesis.speak(msg);
        
                window.addEventListener("beforeunload", () => {
                    window.speechSynthesis.cancel(msg);
                  });
                
      }

  }  else if (nexturl == "lang") {
    var message="1. You will be shown a set of 12 images about any object, animal etc. 2. You have to type the name of object shown in picture. You can't keep it blank.  3. After this you have to answer 4 questions about these pictures.  4. You will be given 4 options for each question .  5.  For each correct answer you will get a point."
    function repeat(){

        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
      

             msg = new SpeechSynthesisUtterance(text);
         
          
            msg.lang = "en-IN";
          
          const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
                msg.voice = voices[0];
                msg.volume = 1;
                msg.rate = 0.9;
                msg.pitch = 1;
                window.speechSynthesis.cancel(msg);
                window.speechSynthesis.speak(msg);
        
                const button = document.querySelector("#exit_btn");
                button.addEventListener("click", () => {
                window.speechSynthesis.cancel();
                });
                
      }
      buttonText = "Language Test";
      const info = document.getElementsByClassName("info");
     info[0].innerHTML =
         "1. You will be shown a set of 12 images about any object,animal etc.";
     info[1].innerHTML = "2. You have to type the name of object shown in picture. You can't keep it blank.";
     info[2].innerHTML =
         "3. After this you have to answer 4 questions about  these pictures.";
     info[3].innerHTML =
         "4. You will be given 4 options for each question.";
     info[4].innerHTML = "5. For each correct answer you will get a point.";
   
  }
  else if (nexturl == "ace1") {
    var message="1.  Read the instructions carefully, which are provided in the heading section of each page. 2. In some questions, you will have the option to respond through audio recording. 3.  Make sure there is minimal background noise, while recording. 4. Before recording, take a brief pause before speaking to ensure clear audio. 5. Once you have clicked on the Next button, you will not be able to go back. "
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
      
      }
    const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
    buttonText = "Attention Test";
     // Rules of the test are changed
     const info = document.getElementsByClassName("info");
     info[0].innerHTML =
         "1.  Read the instructions carefully, which are provided in the heading section of each page.";
     info[1].innerHTML = "2. In some questions, you will have the option to respond through audio recording.";
     info[2].innerHTML =
         "3.  Make sure there is minimal background noise, while recording.";
     info[3].innerHTML =
         "4. Before recording, take a brief pause before speaking to ensure clear audio.";
     info[4].innerHTML = "5. Once you have clicked on the Next button, you will not be able to go back ";
} else if (nexturl == "ace3") {
    var message="1.  Read the instructions carefully, which are provided in the heading section of each page. 2. In some questions, you will have the option to respond through audio recording. 3.  Make sure there is minimal background noise, while recording. 4. Before recording, take a brief pause before speaking to ensure clear audio. 5. Once you have clicked on the Next button, you will not be able to go back. "
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
      
      }
    buttonText = "ACE III Test";
    // Rules of the test are changed
    const info = document.getElementsByClassName("info");
    info[0].innerHTML =
        "1.  Read the instructions carefully, which are provided in the heading section of each page.";
    info[1].innerHTML = "2. In some questions, you will have the option to respond through audio recording.";
    info[2].innerHTML =
        "3.  Make sure there is minimal background noise, while recording";
    info[3].innerHTML =
        "4.  Before recording, take a brief pause before speaking to ensure clear audio.";
    info[4].innerHTML = "5. Once you have clicked on the Next button, you will not be able to go back ";
}
  else if(nexturl=="ace13"){
    var message="1.  Read the instructions carefully, which are provided in the heading section of each page. 2. In some questions, you will have the option to respond through audio recording. 3.  Make sure there is minimal background noise, while recording. 4. Before recording, take a brief pause before speaking to ensure clear audio. 5. Once you have clicked on the Next button, you will not be able to go back. "
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
      
      }
           buttonText="Fluency Test"
           // Rules of the test are changed
     const info = document.getElementsByClassName("info");
     info[0].innerHTML =
         "1.  Read the instructions carefully, which are provided in the heading section of each page.";
     info[1].innerHTML = "2. In some questions, you will have the option to respond through audio recording.";
     info[2].innerHTML =
         "3.  Make sure there is minimal background noise, while recording";
     info[3].innerHTML =
         "4.  Before recording, take a brief pause before speaking to ensure clear audio.";
     info[4].innerHTML = "5. Once you have clicked on the Next button, you will not be able to go back ";
  }
 else if(nexturl=="ace5"){
    var message="1.  Read the instructions carefully, which are provided in the heading section of each page. 2. In some questions, you will have the option to respond through audio recording. 3.  Make sure there is minimal background noise, while recording. 4. Before recording, take a brief pause before speaking to ensure clear audio. 5. Once you have clicked on the Next button, you will not be able to go back. "
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
      
      }
        buttonText="Memory Test"
        // Rules of the test are changed
     const info = document.getElementsByClassName("info");
     info[0].innerHTML =
         "1.  Read the instructions carefully, which are provided in the heading section of each page.";
     info[1].innerHTML = "2. In some questions, you will have the option to respond through audio recording.";
     info[2].innerHTML =
         "3.  Make sure there is minimal background noise, while recording";
     info[3].innerHTML =
         "4.  Before recording, take a brief pause before speaking to ensure clear audio.";
     info[4].innerHTML = "5. Once you have clicked on the Next button, you will not be able to go back ";
   }

else if (nexturl == "vs1") {
    var message="1. First You will be shown 4 images containing some number of dots.  2. You have to type the number of dots shown in each image.  3. After this you will be shown another 4 images containing Fragmented English letters .  4.  You have to type the letter shown in each image. 5. For each correct answer you will get a point."
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
      
      }
    buttonText = "Visuo-Spatial Test I";
    const info = document.getElementsByClassName("info");
    info[0].innerHTML =
        "1. First You will be shown 4 images containing some number of dots.";
    info[1].innerHTML = "2. You have to type the number of dots shown in each image.";
    info[2].innerHTML =
        "3. After this you will be shown another 4 images containing Fragmented English letters ";
    info[3].innerHTML =
        "4.  You have to type the letter shown in each image.";
    info[4].innerHTML = "5. For each correct answer you will get a point.";
    
}
else if (nexturl == "vs2") {
    var message="1. You will be shown a set of 12 images about any object,animal etc. 2. You have to type the name of object shown in picture. You can't keep it blank.  3. After this you have to answer 4 questions about these pictures.  4. You will be given 4 options for each question .  5.  For each correct answer you will get a point."
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
              button.addEventListener("click", () => {
              window.speechSynthesis.cancel();
              });
      }
    buttonText = "Visuo-Spatial Test II";
    const info = document.getElementsByClassName("info");
    info[0].innerHTML =
        "1. You will be shown an image containing Fragmented English letters .";
    info[1].innerHTML = "2. You have to type the letter shown in image.";
    info[2].innerHTML =
        "3. There is no time limit.";
    info[3].innerHTML =
        "4. For each correct answer you will get a point.";
    info[4].innerHTML =
        "5. Result will be shown at the end.";
} 

  else if (nexturl == "tmt") {
    var message="1. Click the circles in the Ascending Order according to the numbers assigned. 2. Numbers range from 1 to 25. 3. You will be guided if you click a wrong circle. 4. When you feel stuck click any circle that is not green. 5. Time taken to complete the task is noted."
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
              });
              const button = document.querySelector("#exit_btn");
              button.addEventListener("click", () => {
              window.speechSynthesis.cancel();
              });
      }
     
      /*
          // Before: Title of webpage ==> Attention Test
          // After:  Title of webpage ==> TMT Test
      */
      document.querySelector("title").textContent = "TMT Test";
      buttonText = "TMT Test";
      // Rules of the test are changed
      const info = document.getElementsByClassName("info");
      info[0].innerHTML =
          "1. Click the circles in the <span>Ascending Order</span> according to the numbers assigned.";
      info[1].innerHTML = 
          "2. Numbers range from <span>1 to 25</span>.";
      info[2].innerHTML =
          "3. You <span>will be guided</span> if you click a wrong circle.";
      info[3].innerHTML =
          "4. When you feel stuck click any circle that is not green.";
      info[4].innerHTML = 
          "5. Time taken to complete the task is noted.";
  } 
  else if (nexturl == "tmt-2") {
    var message="1. Click the circles alternatively between numbers and letters. 2. Numbers are to be clicked in Ascending Order. 3. Letters are to be clicked in Alphabetical Order. 4. You will be guided if you click a wrong circle. 5. Time taken to complete the task is noted."
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
              window.speechSynthesis.cancel(msg);
            });
            const button = document.querySelector("#exit_btn");
            button.addEventListener("click", () => {
              window.speechSynthesis.cancel();
            });
      }
     
      /*
          // Before: Title of webpage ==> Attention Test
          // After:  Title of webpage ==> TMT Test
      */
      document.querySelector("title").textContent = "TMT Test";
      buttonText = "TMT Test";
      // Rules of the test are changed
      const info = document.getElementsByClassName("info");
      info[0].innerHTML =
          "1. Click the circles <span>alternatively</span> between numbers and letters.";
      info[1].innerHTML =
          "2. Numbers are to be clicked in <span>Ascending Order</span>.";
      info[2].innerHTML =
          "3. Letters are to be clicked in <span>Alphabetical Order</span>.";
      info[3].innerHTML =
          "4. You <span>will be guided</span> if you click a wrong circle.";
      info[4].innerHTML = 
          "5. Time taken to complete the task is noted.";
  } else if (nexturl == "ptt") {
    var message="1. Every 5 seconds a pulse of 2 seconds duration is generated. 2. Click the Blue Circle only once when a pulse is generated till it lasts. 3. Wrong and multiple clicks will be penalised. 4. A 10 seconds rest time is given after the completion. DO NOT click during this time. 5. You can expect 5 iterations of pulses and 5 reps of iterations."
    function repeat(){
        let text;
        if (message === "") {
          text = "Please speak";
        } else {
          text =  message;
        }   
        const msg = new SpeechSynthesisUtterance(text);
      
        msg.lang = "en-IN";
      
      const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "en-IN");
            msg.voice = voices[0];
            msg.volume = 1;
            msg.rate = 0.9;
            msg.pitch = 1;
            window.speechSynthesis.cancel(msg);
            window.speechSynthesis.speak(msg);
            window.addEventListener("beforeunload", () => {
                window.speechSynthesis.cancel(msg);
            });
            const button = document.querySelector("#exit_btn");
    button.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
      
      }
    
      /*
          // Before: Title of webpage ==> Attention Test
          // After:  Title of webpage ==> PTT Test
      */
      document.querySelector("title").textContent = "PTT Test";
      buttonText = "PTT Test";
      // Rules of the test are changed
      const info = document.getElementsByClassName("info");
      info[0].innerHTML =
          "1. Every <span>5 seconds</span> a pulse of <span>2 seconds</span> duration is generated.";
      info[1].innerHTML =
          "2. Click the <span>Blue Circle</span> only once when a pulse is generated till it lasts.";
      info[2].innerHTML = 
          "3. Wrong and multiple clicks will be penalised.";
      info[3].innerHTML =
          "4. A <span>10 second</span> rest time is given after the completion. DO NOT click during this time.";
      info[4].innerHTML =
          "5. You can expect <span>5 iterations</span> of pulses and <span>5 reps</span> of iterations.";
  } 

  const starter = document.querySelector(".start_btn");
  const start_btn = document.querySelector(".start_btn button");
  const main = document.querySelector(".main");

  const info_box = document.querySelector(".info_box");
  const exit_btn = info_box.querySelector(".buttons .quit");
  const continue_btn = info_box.querySelector(".buttons .restart");

  start_btn.innerHTML = "Start " + buttonText;
  // if startQuiz button clicked
  start_btn.onclick = () => {
      info_box.classList.add("activeInfo");
      info_box.style.display = "block";
      starter.style.display = "none";

      //show info box
  };

  // if exitQuiz button clicked
  exit_btn.onclick = () => {
      info_box.classList.remove("activeInfo"); //hide info box
      info_box.style.display = "none";
      starter.style.display = "block";
      
  };

  // if continueQuiz button clicked
  continue_btn.onclick = () => {
      info_box.style.display = "none";
      window.location.href = nexturl;
      info_box.classList.remove("activeInfo"); //hide info box
  };
