const buttonGroup = document.getElementById("option11");
const form= document.getElementById("form");
const option1=document.querySelector('#option0')
const option2=document.querySelector('#option1')
const option3=document.querySelector('#option2')
const option4=document.querySelector('#option3')
const option5=document.querySelector('#heading')
const submit=document.querySelector('#submit')
const scored=document.querySelector('#scored')

const posts = [
      { character: '😀', description: 'grinning face' },
      { character: '😃', description: 'grinning face with big eyes' },
      { character: '😄', description: 'grinning face with smiling eyes' },
      { character: '😁', description: 'beaming face with smiling eyes' },
      { character: '😆', description: 'grinning squinting face' },
      { character: '😅', description: 'grinning face with sweat' },
      { character: '😂', description: 'face with tears of joy' },
      { character: '🙂', description: 'slightly smiling face' },
    
      { character: '😉', description: 'winking face' },
      { character: '😊', description: 'smiling face with smiling eyes' },
      { character: '😇', description: 'smiling face with halo' },
   
      { character: '😍', description: 'smiling face with heart-eyes' },
     
      { character: '😘', description: 'face blowing a kiss' },
      { character: '😗', description: 'kissing face' },
      { character: '☺️', description: 'smiling face' },
      { character: '😚', description: 'kissing face with closed eyes' },
      { character: '😙', description: 'kissing face with smiling eyes' },
      { character: '😋', description: 'face savoring food' },
      { character: '😛', description: 'face with tongue' },
      { character: '😜', description: 'winking face with tongue' },
     
      { character: '😝', description: 'squinting face with tongue' },
     
      { character: '😐', description: 'neutral face' },
      { character: '😑', description: 'expressionless face' },
      { character: '😶', description: 'face without mouth' },
      { character: '😏', description: 'smirking face' },
      { character: '😒', description: 'unamused face' },
    
      { character: '😬', description: 'grimacing face' },
     
      { character: '😌', description: 'relieved face' },

      { character: '😕', description: 'confused face' },
{ character: '🙁', description: 'slightly frowning face' },
{ character: '☹️', description: 'frowning face' },
{ character: '😖', description: 'confounded face' },
{ character: '😞', description: 'disappointed face' },
{ character: '😟', description: 'worried face' },
{ character: '😤', description: 'face with steam from nose' },
{ character: '😢', description: 'crying face' },
{ character: '😭', description: 'loudly crying face' },
{ character: '😦', description: 'frowning face with open mouth' },
{ character: '😧', description: 'anguished face' },
{ character: '😨', description: 'fearful face' },
{ character: '😩', description: 'weary face' },
{ character: '😬', description: 'grimacing face' },

{ character: '😰', description: 'anxious face with sweat' },
{ character: '😱', description: 'face screaming in fear' },
{ character: '😳', description: 'flushed face' },

{ character: '😡', description: 'pouting face' },
{ character: '😠', description: 'angry face' },

{ character: '😷', description: 'face with medical mask' },


{ character: '😇', description: 'smiling face with halo' },

{ character: '😈', description: 'smiling face with horns' },
{ character: '👿', description: 'angry face with horns' },
{ character: '👹', description: 'ogre' },
{ character: '👺', description: 'goblin' },
{ character: '💀', description: 'skull' },
{ character: '☠️', description: 'skull and crossbones' },
{ character: '👻', description: 'ghost' },
{ character: '👽', description: 'alien' },
{ character: '👾', description: 'alien monster' },

{ character: '🎃', description: 'jack-o-lantern' },
{ character: '😺', description: 'smiling cat face with open mouth' },
{ character: '😸', description: 'grinning cat face with smiling eyes' },
{ character: '😹', description: 'cat face with tears of joy' },
{ character: '😻', description: 'smiling cat face with heart-eyes' },       
{ character: '😼', description: 'cat face with wry smile'},
{ character: '😽', description: 'kissing cat face with closed eyes' },       
{ character: '🙀', description: 'weary cat face' },
{ character: '😿', description: 'crying cat face' },       
{ character: '😾', description: 'pouting cat face' },       
       
{ character: '🙈', description: 'see-no-evil monkey' },       
{ character: '🙉', description: 'hear-no'},
{ character: '🙊', description: 'speak-no'},
  
     
]

const myset= new Set();
console.log(posts.length)

let score=0

function renderEmoji(){
      let arr=[]
      while(arr.length < 4){
          var r = Math.floor(Math.random() *70) + 1;
          if(arr.indexOf(r) === -1 && !myset.has(r)) arr.push(r);
      }
     return arr;

}
var correct;
let question=8;
var index=0;
function renderCorrect(){
    
     correct = Math.floor(Math.random() * ((3)+1));
return correct
}

function loadQuestion(){
      
      let arr=renderEmoji();
       renderCorrect();
     index=arr[correct];
    
option5.innerHTML=posts[arr[correct]].description
option1.innerHTML=posts[arr[0]].character;
option2.innerHTML=posts[arr[1]].character;
option3.innerHTML=posts[arr[2]].character; 
option4.innerHTML=posts[arr[3]].character;

}
let clicked=false
var choosen=-1;
function rem(){
      for (const child of buttonGroup.children) {
            child.style.border='none'
            child.style.transition='0.3s ease-in-out'
            
            child.style.background=''
            clicked=false
            }
     }



const buttonGroupPressed = e => { 
      
         for (const child of buttonGroup.children) {
       
           child.style.border='none'
           child.style.transition='0.3s ease-in-out'
          
           child.style.background=''
           clicked=false
           }
           if(e.target.id=="option1"|| e.target.id=="option2"|| e.target.id=="option3"|| e.target.id=="option0"){
     document.getElementById(e.target.id).style.border='1px solid blue'
     document.getElementById(e.target.id).style.background='#cce5ff'
       clicked=true;
       choosen=e.target.id;
      
           }
       
      
     }
   
let start_time;
var rr=false;
if(rr===false){
      start_time=new Date();
      rr=true;
      loadQuestion();
}
else{
      loadQuestion();
}

buttonGroup.addEventListener("click", buttonGroupPressed);

submit.addEventListener('click',()=>{
      if(clicked){
            myset.add(index);
            
    if(choosen==="option"+correct){
   
      score++;
    }
if(question>=0){
question--;
rem()
loadQuestion();

}
else{
      submit.innerHTML='Submit'
     scored.innerHTML= "Your score is "+score
     form.style.display='none'
     let end_time=new Date().getTime()
      let time_taken=end_time-start_time
      let time_taken_min=Math.floor(time_taken/60000)            
      let time_taken_sec=Math.floor((time_taken%60000)/1000)
      let time=time_taken_min+":"+time_taken_sec;

      submit.innerHTML='Submit'
     scored.innerHTML= "Your score is "+score
     form.style.display='none'
     $.ajax({
      type: "POST",
      url: "/send_score",
      data: { 
         score: score,
         column: "emoji",
         time:time,
        
      },
      success: function(response) {
         console.log(response);     
      } 
      
   });
      
}
      }
      else{
            alert("select any option")
      }
});