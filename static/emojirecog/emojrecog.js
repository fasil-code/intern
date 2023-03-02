let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let questions=[
    {

'options':['sad','happy','angry','surprised'],
'answer':'happy',

    },
       {

'options':['sad','happy','angry','disgust'],
'answer':'sad',

    }
       ,
       {
'options':['happy','angry','surprised','fear'],
'answer':'surprised',

    }
       ,
       {
            
'options':['contempt','disgusted','scared','happy'],
'answer':'contempt',
},
{
'options':['surprised','disgusted','fear','happy'],  
'answer':'fear',
},           
{

    'options':['surprised','happy','anger','disgust'],  
    'answer':'disgust',
    },   
{           
'options':['angry','happy','scared','contempt'],           
'answer':'contempt',
},         
                 {
            
'options':['contempt','disgusted','fear','sad'],
'answer':'fear',
},      
    
                          {
            
'options':['sad','disgusted','happy','surprised'],
'answer':'sad',
},        
                              {
            
'options':['contempt','angry','surprised','happy'],
'answer':'angry',
},        
                         

]

let res_choose=new Array();
let res_correct = new Array(questions.length);
let res_time={};
res_time['happy']=0
res_time['sad']=0
res_time['angry']=0
res_time['surprised']=0
res_time['contempt']=0
res_time['disgust']=0
res_time['fear']=0

let emojiMessage=`
1. You will have only 15 seconds per each question.
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






for (let i = 0; i < questions.length; i++) {
  res_correct[i] = questions[i].answer;
}
console.log(res_correct)
//selecting all required elements
const starter = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn button");

const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
restart_quiz.style.display="none";
quit_quiz.style.display="none";

    continue_btn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
    });
    exit_btn.addEventListener("click", () => {
        window.speechSynthesis.cancel();
        });

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
    info_box.style.display="block"
    starter.style.display="none"
    quiz_box.style.display="none"
     //show info box
     
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    info_box.style.display="none"
    starter.style.display="block"
    quiz_box.style.display="none"
}
let start_time;
// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.style.display="none"
    quiz_box.style.display="block"
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    start_time=new Date().getTime();
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter=0;
let counterLine;
let widthValue = 0;


// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}
const mp={};

    
        mp['happy']=69
        mp['sad']=37        
        mp['angry']=45
        mp['surprised']=83
        mp['disgust']=59
        mp['fear']=25
            mp['contempt']=18

    
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{


    window.location.reload(); //reload the current window
}
var st=new Date();
var end=new Date();
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length -1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        st=new Date()
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        let end_time=new Date().getTime()
      let time_taken=end_time-start_time
      let time_taken_min=Math.floor(time_taken/60000)            
      let time_taken_sec=Math.floor((time_taken%60000)/1000)
      let time=time_taken_min+":"+time_taken_sec;
      console.log(res_time)
        $.ajax({
            type: "POST",
            url: "/send_score",
            data: { 
               score: userScore,
               column: "ert",
               time:time,
               res_correct:JSON.stringify(res_correct),
               res_choose:JSON.stringify(res_choose),
               res_time: JSON.stringify(res_time)
            },
            success: function(response) {
               console.log(response);     
            } 
            
         });
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}
function random(option){
    let maxi=mp[option];
    
    let r= Math.floor(Math.random() * maxi) + 1
    
    path='/subject'+' ('+r+')'+'.png'
    return path
}
// getting questions and options from array
function showQuetions(index){
  
    const que_text = document.querySelector(".que_text");
    const img = document.querySelector("#main-img");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span class="rem">Identify the type of emotion in the image below:</span><div class="que_img"><img src="'+'</span>';
  let correct1=questions[que_count].answer;
    let path= correct1+random(correct1)
    img.src='static/images/dataset/'+path;
    
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
   
}
// creating the new div tags which for icons


//if user clicked on option
function optionSelected(answer){
   
    
 
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    res_choose.push(userAns)
    end=new Date() - st; //getting the time when user clicked on option and subtracting it
  
    if(res_time[userAns]<end){
        res_time[userAns]=end
    }
   
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
               
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
   
    quit_quiz.style.display="block";

    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                  
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}
// setting timer 
var length=(quiz_box.clientWidth);
var speed=(683*23)/(length);


function startTimerLine(time){
    counterLine = setInterval(timer, speed);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > length){ 
            clearInterval(counterLine); //clear counterLine
        }
    }
}

// Question counter
function queCounter(index){
   
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}