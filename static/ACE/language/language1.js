 const diagrams= [
        {
          "name": "Book",
          "imageUrl": "book.png",
          "correctName": "Book"
        },
        {
          "name": "Spoon",
          "imageUrl": "spoon.png",
          "correctName": "Spoon"
        },
        {
          "name": "Goat",
          "imageUrl": "goat.png",
          "correctName": "Goat"
        },
        {
          "name": "Candle",
          "imageUrl": "candle.png",
          "correctName": "Candle"
        },
        {
          "name": "Flag",
          "imageUrl": "flag.png",
          "correctName": "Flag"
        },
        {
          "name": "Camel",
          "imageUrl": "camel.png",
          "correctName": "Camel"
        },
        {
          "name": "Knife",
          "imageUrl": "knife.png",
          "correctName": "Knife"
        },
        {
          "name": "Giraffe",
          "imageUrl": "giraffe.png",
          "correctName": "Giraffe"
        },
        {
          "name": "Timpani",
          "imageUrl": "timpani.png",
          "correctName": "Timpani"
        },
        {
          "name": "Umbrella",
          "imageUrl": "umbrella.png",
          "correctName": "Umbrella"
        },
        {
          "name": "Pig",
          "imageUrl": "pig.png",
          "correctName": "Pig"
        },
        {
          "name": "Crocodile",
          "imageUrl": "crocodile.png",
          "correctName": "Crocodile"
        }
      ]
     
      let dg_count = 0;
      let marks = 0;
      const quiz_box=document.querySelector('.quiz_box');
      const info_box = document.querySelector(".info_box");
     // const exit_btn = info_box.querySelector(".buttons .quit");
      //const continue_btn = info_box.querySelector(".buttons .restart");
      const start_btn = document.querySelector(".start_btn button");
      const next_btn = document.querySelector("footer .next_btn");
      let inputElement = document.querySelector('input[name="diagram"]');
      const result_box = document.querySelector(".result_box");
      const mark1=document.getElementById('mark1');
      const d1 = document.getElementById('diagrams');
      const errorMessage=document.getElementById("errorMessage")
      const que_text = document.querySelector(".que_text");
      const input_box=document.querySelector(" .input input")
      // if startQuiz button clicked
      next_btn.style.display="block";
     // inputElement.style.display="none";
      result_box.style.display='none';
      quiz_box.style.display='block';
      let sent=false;
     var ans= new Array;
     var actual = ["book","spoon","goat","candle","flag","camel","knife","giraffe","timpani,drum","umbrella","pig","crocodile,alligator"]

showImages(0);


    // show Images
    function audioToText(){
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
         // Display the transcribed text
         document.getElementById('input_bar').value = message;
        //ans[i]=message;
        // Check if the recognition process has completed
        if (event.results[0].isFinal) {
          // Stop recognition if the process has completed
          recognition.stop();
        }
      });
      recognition.addEventListener('end', () => {
        // Display a message when recognition ends
        document.getElementById('recognition-status').textContent = '🟢 Voice Recognition ended';
        //repeat(message);
        
      });
      recognition.start();
      // Stop recognition after 5 seconds
      setTimeout(() => {
      recognition.stop();
    }, 4000);
    }
      function showImages(index){
        const img = document.querySelector("#main-img");
        let que_tag ='<span class="rem">What is the name of object shown in the image below:</span><div class="que_img"><img src="'+'</span>';
        let path= diagrams[index].imageUrl;
        img.src='static/12figs/'+path;
       
        que_text.innerHTML = que_tag;
       
      }
      // when next button is clicked
      next_btn.onclick = ()=>{
        if(dg_count < diagrams.length -1){ //if question count is less than total question length
      
        let inputValue = inputElement.value;
        // check if empty input box
        if(inputElement.value.trim() === ""){
          inputElement.classList.add("error");
          errorMessage.innerHTML = "Please fill the input";
        }else{
            inputElement.classList.remove("error");
            errorMessage.innerHTML = "";
            inputElement.value="";
            ans.push(inputValue.toLowerCase());
           
            
            if (inputValue.toLowerCase() === diagrams[dg_count].correctName.toLowerCase() || (dg_count===8 && inputValue.toLowerCase()==='drum') ) {
                marks++;
            } 
            
              //console.log(dg_count);
              dg_count++; //increment the que_count value
              showImages(dg_count);
        }
        }
        else{
          let inputValue = inputElement.value;
          if(inputElement.value.trim() === ""){
            inputElement.classList.add("error");
            errorMessage.innerHTML = "Please fill the input";
          }else{
            if (inputValue.toLowerCase() === diagrams[dg_count].correctName.toLowerCase() || ( inputValue.toLowerCase()==='alligator') ) {
              marks++;
          } 
        let ansMap = new Map();
        
        for(let i=0;i<12;i++){
          ansMap.set(actual[i], ans[i]);
        }
       
          $.ajax({
            type: "POST",
            url: "/send_score",
            data: { 
               score: marks,
               column: "language1",
               source:"language1_response",
               user_response:JSON.stringify(Object.fromEntries(ansMap))
            },
            success: function(response) {
               console.log(response);
               sent=true; 
               redirect(sent);     
            } 
            
         });
            //  showResult();
            function redirect(sent){
              if(sent===true){
                window.location.href=nextUrl;
              }
            }
             
           } //calling showResult function
        }
    }
    // show results box
    function showResult(){
      next_btn.style.display='none';
      inputElement.style.display='none';
      que_text.style.display='none'
      quiz_box.style.display="none";
      result_box.style.display="block";
      const scoreText = result_box.querySelector(".score_text");
      
      if (marks > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ marks +'</p> out of <p>'+ diagrams.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(marks > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ marks +'</p> out of <p>'+ diagrams.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ marks+'</p> out of <p>'+ diagrams.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    }
  
    