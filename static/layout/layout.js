  // type of test
      
  let buttonText;
  if (nexturl == "emoji") {
      buttonText = "Emoji Game";
  }  else if (nexturl == "lang") {
      buttonText = "Language Test";
  }
  else if (nexturl == "ace1") {
    buttonText = "Attention Test";
     // Rules of the test are changed
     const info = document.getElementsByClassName("info");
     info[0].innerHTML =
         "1.  Read the instructions carefully, which are provided in the heading section of each page.";
     info[1].innerHTML = "2. In some questions, you will have the option to respond through audio recording.";
     info[2].innerHTML =
         "3.  Make sure there is minimal background noise, while recording";
     info[3].innerHTML =
         "4. Before recording, take a brief pause before speaking to ensure clear audio.";
     info[4].innerHTML = "5. Once you have clicked on the Next button, you will not be able to go back ";
} else if (nexturl == "ace3") {
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
 else if(nexturl=="ace9"){
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
   else if(nexturl=="ace8"){
    buttonText="Language Test"
}
else if (nexturl == "vs1") {
    buttonText = "Visuo-Spatial Test";
} 
  else if (nexturl == "tmt") {
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
      info[1].innerHTML = "2. Numbers range from <span>1 to 25</span>.";
      info[2].innerHTML =
          "3. You <span>will be guided</span> if you click a wrong circle.";
      info[3].innerHTML =
          "4. When you feel stuck click any circle that is not green.";
      info[4].innerHTML = "5. Time taken to complete the task is noted.";
  } 
  else if (nexturl == "tmt-2") {
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
          "2. Numbers are to be cliocked in <span>Ascending Order</span>.";
      info[2].innerHTML =
          "3. Letters are to be clicked in <span>Alphabetical Order</span>.";
      info[3].innerHTML =
          "4. You <span>will be guided</span> if you click a wrong circle.";
      info[4].innerHTML = "5. Time taken to complete the task is noted.";
  } else if (nexturl == "ptt") {
      /*
          // Before: Title of webpage ==> Attention Test
          // After:  Title of webpage ==> PTT Test
      */
      document.querySelector("title").textContent = "PTT Test";
      buttonText = "PTT Test";
      // Rules of the test are changed
      const info = document.getElementsByClassName("info");
      info[0].innerHTML =
          "1. You have to click <span>Blue circle</span> only once in every iteration.";
      info[1].innerHTML =
          "2. You are given <span>5 seconds</span> to click Blue circle.";
      info[2].innerHTML = "3. Wrong and multiple clicks will be penalised.";
      info[3].innerHTML =
          "4. A <span>10 second</span> rest time is given after every iteration. DO NOT click during this time.";
      info[4].innerHTML =
          "5. After <span>5 iterations</span> you will be given a <span>30 second</span> rest time. DO NOT click during this time.";
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