
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
          "name": "Sickle",
          "imageUrl": "sickle.png",
          "correctName": "Sickle"
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
       // on clicking start button
    //   start_btn.onclick = ()=>{
    //    // showImages(0); 
    //    info_box.classList.add("activeInfo");
    //     info_box.style.display="block"
    //     next_btn.style.display="block";
    //     input_box.style.display="block";
    //     start_btn.style.display="none"; 
    //     quiz_box.style.display='none';
    // }
    // if exitQuiz button clicked


// if continueQuiz button clicked
// continue_btn.onclick = ()=>{
//   info_box.style.display="none"
//   quiz_box.style.display="block"
//   input_box.style.display="block";
//   info_box.classList.remove("activeInfo"); //hide info box
//   quiz_box.classList.add("activeQuiz"); //show quiz box
//   showImages(0); //calling showQestions function
showImages(0);
// }
// quit quiz
// quit_quiz.onclick = ()=>{
//   window.location.reload(); //reload the current window
// }
// exit quiz
// exit_btn.onclick = ()=>{
//   info_box.classList.remove("activeInfo"); //hide info box
//   info_box.style.display="none"
//   start_btn.style.display="block"; 
//   quiz_box.style.display="none"
// }

    // show Images
      function showImages(index){
        const img = document.querySelector("#main-img");
        let que_tag ='<span class="rem">Type the name of object shown in image below:</span><div class="que_img"><img src="'+'</span>';
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
            if (inputValue.toLowerCase() === diagrams[dg_count].correctName.toLowerCase()) {
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
            if (inputValue.toLowerCase() === diagrams[dg_count].correctName.toLowerCase()) {
              marks++;
          } 
             showResult();
             
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
      $.ajax({
        type: "POST",
        url: "/send_score",
        data: { 
           score: marks,
           column: "ace3"
        },
        success: function(response) {
           console.log(response);
           sent=true; 
           redirect(sent);     
        } 
        
     });
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
  
    