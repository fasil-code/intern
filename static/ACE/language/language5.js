
const diagrams= [
    {
      "name": "Book",
      "imageUrl": "static/12figs/book.png",
      "correctName": "Book"
    },
    {
      "name": "Spoon",
      "imageUrl": "static/12figs/spoon.png",
      "correctName": "Spoon"
    },
    {
      "name": "Goat",
      "imageUrl": "static/12figs/goat.png",
      "correctName": "Goat"
    },
    {
      "name": "Candle",
      "imageUrl": "static/12figs/candle.png",
      "correctName": "Candle"
    },
    {
      "name": "Flag",
      "imageUrl": "static/12figs/flag.png",
      "correctName": "Flag"
    },
    {
      "name": "Camel",
      "imageUrl": "static/12figs/camel.png",
      "correctName": "Camel"
    },
    {
      "name": "Sickle",
      "imageUrl": "static/12figs/sickle.png",
      "correctName": "Sickle"
    },
    {
      "name": "Giraffe",
      "imageUrl": "static/12figs/giraffe.png",
      "correctName": "Giraffe"
    },
    {
      "name": "Timpani",
      "imageUrl": "static/12figs/timpani.png",
      "correctName": "Timpani"
    },
    {
      "name": "Umbrella",
      "imageUrl": "static/12figs/umbrella.png",
      "correctName": "Umbrella"
    },
    {
      "name": "Pig",
      "imageUrl": "static/12figs/pig.png",
      "correctName": "Pig"
    },
    {
      "name": "Crocodile",
      "imageUrl": "static/12figs/crocodile.png",
      "correctName": "Crocodile"
    }
  ]
  const Questions=[
    {
        "ques1":"Which Of the following is used in rain?",
        "correct":"Umbrella"
    },
    {
        "ques1":"Which Of the following emits light?",
        "correct":"Candle"
    },
    {
        "ques1":"Which one of the following is assocaited with farming?",
        "correct":"Sickle"
    },
    {
        "ques1":"Which one of the following is found in deserts?",
        "correct":"Camel"
    }

  ]
  const buttonGroup = document.getElementById("option11");
  const form= document.getElementById("form");
  const option1=document.querySelector('#option1')
  const option2=document.querySelector('#option2')
  const option3=document.querySelector('#option3')
  const option4=document.querySelector('#option4')
  const heading=document.querySelector('#heading')
  const submit=document.querySelector('#submit')
  const scored=document.querySelector('#scored')
  let dg_count = 0;
  let marks = 0;
  let score=0
  const questionElem = document.getElementById('question');
  const optionElems = document.querySelectorAll('.option');
  const submitButton = document.getElementById('submit');
  let usedQuestions = [];

  function getRandomOptions(index) {
    const options = [];
    options.push(index);
    while (options.length < 4) {
      const randomIndex = Math.floor(Math.random() * 11)+1;
     // const randomAnswer = allAnswers[randomIndex];
      if (!options.includes(randomIndex)) {
        options.push(randomIndex);
      }
    }
    return options;
  }

function renderarr(arr){
      let ques=[]
      while(ques.length < 4){
          const randomIndex = Math.floor(Math.random() * arr.length);
          if(!ques.includes(arr[randomIndex])) 
          ques.push(arr[randomIndex]);  
      }
     return ques;  

}
let sent=false;
var correct;
var ques_no=0;
let question=4;
var actual=["umbrella","candle","sickle","camel"];
var ans= new Array;
function loadQuestion(){

const remainingQuestions = Questions.filter(q => !usedQuestions.includes(q));
const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const randomQuestion = remainingQuestions[randomIndex];
    usedQuestions.push(randomQuestion);
heading.innerHTML=Questions[ques_no].ques1;


const index = diagrams.findIndex((element) => element.correctName === Questions[ques_no].correct);
let  arr=getRandomOptions(index);

let ques=renderarr(arr);

option1.src=diagrams[ques[0]].imageUrl
option2.src=diagrams[ques[1]].imageUrl
option3.src=diagrams[ques[2]].imageUrl
option4.src=diagrams[ques[3]].imageUrl


}
let clicked=false
var choosen=-1;
function rem(){
      for (const child of buttonGroup.children) {
            child.style.border='none'
            child.style.transition='0.3s ease-in-out'
           // child.style.transform='none'
            child.style.background=''
            clicked=false
            }
     }



const buttonGroupPressed = e => { 
   
         for (const child of buttonGroup.children) {
       
           child.style.border='none'
           child.style.transition='0.3s ease-in-out'
          // child.style.transform='none'
           child.style.background=''
           clicked=false
           }
           if(e.target.id==="option1"|| e.target.id==="option2"|| e.target.id==="option3"|| e.target.id==="option4"){
     document.getElementById(e.target.id).style.border='1px solid #0d6efd'
     document.getElementById(e.target.id).style.background='#0d6efd'
       clicked=true;
       choosen=e.target.id;
           }
       
      
     }
   
var r=false;
let start_time;
if(r===false){
      loadQuestion();
      r=true;
      start_time=new Date().getTime();
      
}
else{
      loadQuestion();
}

buttonGroup.addEventListener("click", buttonGroupPressed);

submit.addEventListener('click',()=>{
      if(clicked){
       const op=document.getElementById(choosen);
        

         var str=op.getAttribute("src").replace("static/12figs/",'')
         var newstr=str.replace(".png",'')
    // if(op.getAttribute("src")==="static/12figs/"+Questions[ques_no].correct.toLowerCase()+".png"){
    //   score++;
    // }
    if(newstr===Questions[ques_no].correct.toLowerCase()){
      score++;
    }
    ans.push(newstr);
   
    ques_no++;
if(question>1){
question--;
rem()
loadQuestion();

}
else{
      let end_time=new Date().getTime()
      let time_taken=end_time-start_time
      let time_taken_min=Math.floor(time_taken/60000)            
      let time_taken_sec=Math.floor((time_taken%60000)/1000)
      let time=time_taken_min+":"+time_taken_sec;
      let score_percentage=Math.floor((score/4)*100)
      submit.innerHTML='Submit'
    //  scored.innerHTML= "Your score is "+score
     form.style.display='none'
     let ansMap = new Map();
     for(let i=0;i<4;i++){
       ansMap.set(actual[i], ans[i]);
     }
    
     $.ajax({
      type: "POST",
      url: "/send_score",
      data: { 
         score: score,
         column: "language2",
         source:"language2_response",
        user_response:JSON.stringify(Object.fromEntries(ansMap))
        //  time:time,
        
      },
      success: function(response) {
         console.log(response);
         sent=true;
         redirect(sent);      
      } 
      
   });
   function redirect(sent){
    if(sent===true){
      window.location.href=nextUrl;
    }
  }
 
      
}
      }
      else{
            alert("select any option")
      }
});

