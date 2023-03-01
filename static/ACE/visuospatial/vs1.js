
    const diagrams= [
        {
            "name": "8dots",
            "imageUrl": "8dot.png",
            "dot_count":"8"
        },
        {
            "name": "10dots",
            "imageUrl": "10dot.png",
            "dot_count":"10"
        },
        {
          "name": "7dots",
          "imageUrl": "7dot.png",
          "dot_count":"7"
        },
        
        {
            "name": "9dots",
            "imageUrl": "9dot.png",
            "dot_count":"9"
        }
      ]
      let dg_count = 0;
      let marks = 0;
      const quiz_box=document.querySelector('.quiz_box');
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
    //   next_btn.style.display="none";
    //   inputElement.style.display="none";
      result_box.style.display='none';
    //   quiz_box.style.display='none';
    //    // on clicking start button
    //   start_btn.onclick = ()=>{
    //     showImages(0); 
    //     next_btn.style.display="block";
    //     input_box.style.display="block";
    //     start_btn.style.display="none"; 
    //     quiz_box.style.display='block';
    // }
    showImages(0);
    // random function
    var ans= new Array;
    var actual= ["8","10","7","9"];
    // show Images
      function showImages(index){
        const img = document.querySelector("#main-img");
        let que_tag ='<span class="rem">Type the number of dots shown in picture below:</span><div class="que_img"><img src="'+'</span>';
        let path= diagrams[index].imageUrl;
        img.src='static/dot_figs/'+path;
       
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
            if (inputValue === diagrams[dg_count].dot_count) {
                marks++;
            } 
            
             //
              
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
            ans.push(inputValue);
            if (inputValue === diagrams[dg_count].dot_count) {
              marks++;
          } 
            //  showResult();
            let ansMap = new Map();
            for(let i=0;i<4;i++){
              ansMap.set(actual[i], ans[i]);
            }
            $.ajax({
              type: "POST",
              url: "/send_score",
              data: { 
                 score: marks,
                 column: "visuospatial1",
                 source:"visuospatial1_response",
                 user_response:JSON.stringify(Object.fromEntries(ansMap))
              },
              success: function(response) {
                 console.log(response);
                 sent=true; 
                 redirect(sent);     
              } 
              
           });
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
 
    function redirect(sent){
      if(sent===true){
        window.location.href=nextUrl;
      }
    }
