const buttonGroup = document.getElementById("option11");
const form= document.getElementById("form");
const option1=document.querySelector('#option0')
const option2=document.querySelector('#option1')
const option3=document.querySelector('#option2')
const option4=document.querySelector('#option3')
const option5=document.querySelector('#heading')
const submit=document.querySelector('#submit')
const scored=document.querySelector('#scored')

const posts=[
      {
            "emoji": "😀",
              "description": "grinning face",
               "category": "Smileys & Emotion",
      "aliases": ["grinning"],
      "tags": ["smile", "happy"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😃",
      "description": "grinning face with big eyes",
      "category": "Smileys & Emotion",
      "aliases": ["smiley"],
      "tags": ["happy", "joy", "haha"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😄",
      "description": "grinning face with smiling eyes",
      "category": "Smileys & Emotion",
      "aliases": ["smile"],
      "tags": ["happy", "joy", "laugh", "pleased"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😁",
      "description": "beaming face with smiling eyes",
      "category": "Smileys & Emotion",
      "aliases": ["grin"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😆",
      "description": "grinning squinting face",
      "category": "Smileys & Emotion",
      "aliases": ["laughing", "satisfied"],
      "tags": ["happy", "haha"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😅",
      "description": "grinning face with sweat",
      "category": "Smileys & Emotion",
      "aliases": ["sweat_smile"],
      "tags": ["hot"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😂",
      "description": "face with tears of joy",
      "category": "Smileys & Emotion",
      "aliases": ["joy"],
      "tags": ["tears"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "🙂",
      "description": "slightly smiling face",
      "category": "Smileys & Emotion",
      "aliases": ["slightly_smiling_face"],
      "tags": [],
      "unicode_version": "7.0",
      "ios_version": "9.1"
      },
      
      
      {
      "emoji": "😉",
      "description": "winking face",
      "category": "Smileys & Emotion",
      "aliases": ["wink"],
      "tags": ["flirt"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😊",
      "description": "smiling face with smiling eyes",
      "category": "Smileys & Emotion",
      "aliases": ["blush"],
      "tags": ["proud"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😇",
      "description": "smiling face with halo",
      "category": "Smileys & Emotion",
      "aliases": ["innocent"],
      "tags": ["angel"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      
      
      {
      "emoji": "😘",
      "description": "face blowing a kiss",
      "category": "Smileys & Emotion",
      "aliases": ["kissing_heart"],
      "tags": ["flirt"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😗",
      "description": "kissing face",
      "category": "Smileys & Emotion",
      "aliases": ["kissing"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "☺️",
      "description": "smiling face",
      "category": "Smileys & Emotion",
      "aliases": ["relaxed"],
      "tags": ["blush", "pleased"],
      "unicode_version": "",
      "ios_version": "6.0"
      },
      {
      "emoji": "😚",
      "description": "kissing face with closed eyes",
      "category": "Smileys & Emotion",
      "aliases": ["kissing_closed_eyes"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😙",
      "description": "kissing face with smiling eyes",
      "category": "Smileys & Emotion",
      "aliases": ["kissing_smiling_eyes"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😋",
      "description": "face savoring food",
      "category": "Smileys & Emotion",
      "aliases": ["yum"],
      "tags": ["tongue", "lick"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😛",
      "description": "face with tongue",
      "category": "Smileys & Emotion",
      "aliases": ["stuck_out_tongue"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😜",
      "description": "winking face with tongue",
      "category": "Smileys & Emotion",
      "aliases": ["stuck_out_tongue_winking_eye"],
      "tags": ["prank", "silly"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😝",
      "description": "squinting face with tongue",
      "category": "Smileys & Emotion",
      "aliases": ["stuck_out_tongue_closed_eyes"],
      "tags": ["prank"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      
      {
      "emoji": "😐",
      "description": "neutral face",
      "category": "Smileys & Emotion",
      "aliases": ["neutral_face"],
      "tags": ["meh"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😑",
      "description": "expressionless face",
      "category": "Smileys & Emotion",
      "aliases": ["expressionless"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😶",
      "description": "face without mouth",
      "category": "Smileys & Emotion",
      "aliases": ["no_mouth"],
      "tags": ["mute", "silence"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      
      {
      "emoji": "😏",
      "description": "smirking face",
      "category": "Smileys & Emotion",
      "aliases": ["smirk"],
      "tags": ["smug"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😒",
      "description": "unamused face",
      "category": "Smileys & Emotion",
      "aliases": ["unamused"],
      "tags": ["meh"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😬",
      "description": "grimacing face",
      "category": "Smileys & Emotion",
      "aliases": ["grimacing"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😮‍💨",
      "description": "face exhaling",
      "category": "Smileys & Emotion",
      "aliases": ["face_exhaling"],
      "tags": [],
      "unicode_version": "13.1",
      "ios_version": "14.0"
      },
      
      {
      "emoji": "😌",
      "description": "relieved face",
      "category": "Smileys & Emotion",
      "aliases": ["relieved"],
      "tags": ["whew"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😔",
      "description": "pensive face",
      "category": "Smileys & Emotion",
      "aliases": ["pensive"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😪",
      "description": "sleepy face",
      "category": "Smileys & Emotion",
      "aliases": ["sleepy"],
      "tags": ["tired"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😴",
      "description": "sleeping face",
      "category": "Smileys & Emotion",
      "aliases": ["sleeping"],
      "tags": ["zzz"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😷",
      "description": "face with medical mask",
      "category": "Smileys & Emotion",
      "aliases": ["mask"],
      "tags": ["sick", "ill"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
     
      
      
      
      
      {
      "emoji": "😵",
      "description": "face with crossed-out eyes",
      "category": "Smileys & Emotion",
      "aliases": ["dizzy_face"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😵‍💫",
      "description": "face with spiral eyes",
      "category": "Smileys & Emotion",
      "aliases": ["face_with_spiral_eyes"],
      "tags": [],
      "unicode_version": "13.1",
      "ios_version": "14.0"
      },
      
      
      
      
      {
      "emoji": "😎",
      "description": "smiling face with sunglasses",
      "category": "Smileys & Emotion",
      "aliases": ["sunglasses"],
      "tags": ["cool"],
      
      },
      
     
      {
      "emoji": "😕",
      "description": "confused face",
      "category": "Smileys & Emotion",
      "aliases": ["confused"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😟",
      "description": "worried face",
      "category": "Smileys & Emotion",
      "aliases": ["worried"],
      "tags": ["nervous"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "🙁",
      "description": "slightly frowning face",
      "category": "Smileys & Emotion",
      "aliases": ["slightly_frowning_face"],
      "tags": [],
      "unicode_version": "7.0",
      "ios_version": "9.1"
      },
      {
      "emoji": "☹️",
      "description": "frowning face",
      "category": "Smileys & Emotion",
      "aliases": ["frowning_face"],
      "tags": [],
      "unicode_version": "",
      "ios_version": "9.1"
      },
      {
      "emoji": "😮",
      "description": "face with open mouth",
      "category": "Smileys & Emotion",
      "aliases": ["open_mouth"],
      "tags": ["surprise", "impressed", "wow"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😯",
      "description": "hushed face",
      "category": "Smileys & Emotion",
      "aliases": ["hushed"],
      "tags": ["silence", "speechless"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😲",
      "description": "astonished face",
      "category": "Smileys & Emotion",
      "aliases": ["astonished"],
      "tags": ["amazed", "gasp"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😳",
      "description": "flushed face",
      "category": "Smileys & Emotion",
      "aliases": ["flushed"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      
      {
      "emoji": "😦",
      "description": "frowning face with open mouth",
      "category": "Smileys & Emotion",
      "aliases": ["frowning"],
      "tags": [],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😧",
      "description": "anguished face",
      "category": "Smileys & Emotion",
      "aliases": ["anguished"],
      "tags": ["stunned"],
      "unicode_version": "6.1",
      "ios_version": "6.0"
      },
      {
      "emoji": "😨",
      "description": "fearful face",
      "category": "Smileys & Emotion",
      "aliases": ["fearful"],
      "tags": ["scared", "shocked", "oops"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😰",
      "description": "anxious face with sweat",
      "category": "Smileys & Emotion",
      "aliases": ["cold_sweat"],
      "tags": ["nervous"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😥",
      "description": "sad but relieved face",
      "category": "Smileys & Emotion",
      "aliases": ["disappointed_relieved"],
      "tags": ["phew", "sweat", "nervous"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😢",
      "description": "crying face",
      "category": "Smileys & Emotion",
      "aliases": ["cry"],
      "tags": ["sad", "tear"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😭",
      "description": "loudly crying face",
      "category": "Smileys & Emotion",
      "aliases": ["sob"],
      "tags": ["sad", "cry", "bawling"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😱",
      "description": "face screaming in fear",
      "category": "Smileys & Emotion",
      "aliases": ["scream"],
      "tags": ["horror", "shocked"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😖",
      "description": "confounded face",
      "category": "Smileys & Emotion",
      "aliases": ["confounded"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😣",
      "description": "persevering face",
      "category": "Smileys & Emotion",
      "aliases": ["persevere"],
      "tags": ["struggling"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😞",
      "description": "disappointed face",
      "category": "Smileys & Emotion",
      "aliases": ["disappointed"],
      "tags": ["sad"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😓",
      "description": "downcast face with sweat",
      "category": "Smileys & Emotion",
      "aliases": ["sweat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😩",
      "description": "weary face",
      "category": "Smileys & Emotion",
      "aliases": ["weary"],
      "tags": ["tired"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😫",
      "description": "tired face",
      "category": "Smileys & Emotion",
      "aliases": ["tired_face"],
      "tags": ["upset", "whine"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😤",
      "description": "face with steam from nose",
      "category": "Smileys & Emotion",
      "aliases": ["triumph"],
      "tags": ["smug"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😡",
      "description": "pouting face",
      "category": "Smileys & Emotion",
      "aliases": ["rage", "pout"],
      "tags": ["angry"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😠",
      "description": "angry face",
      "category": "Smileys & Emotion",
      "aliases": ["angry"],
      "tags": ["mad", "annoyed"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😈",
      "description": "smiling face with horns",
      "category": "Smileys & Emotion",
      "aliases": ["smiling_imp"],
      "tags": ["devil", "evil", "horns"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "👿",
      "description": "angry face with horns",
      "category": "Smileys & Emotion",
      "aliases": ["imp"],
      "tags": ["angry", "devil", "evil", "horns"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "💀",
      "description": "skull",
      "category": "Smileys & Emotion",
      "aliases": ["skull"],
      "tags": ["dead", "danger", "poison"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      
      
      {
      "emoji": "👹",
      "description": "ogre",
      "category": "Smileys & Emotion",
      "aliases": ["japanese_ogre"],
      "tags": ["monster"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "👺",
      "description": "goblin",
      "category": "Smileys & Emotion",
      "aliases": ["japanese_goblin"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "👻",
      "description": "ghost",
      "category": "Smileys & Emotion",
      "aliases": ["ghost"],
      "tags": ["halloween"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "👽",
      "description": "alien",
      "category": "Smileys & Emotion",
      "aliases": ["alien"],
      "tags": ["ufo"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "👾",
      "description": "alien monster",
      "category": "Smileys & Emotion",
      "aliases": ["space_invader"],
      "tags": ["game", "retro"],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      
      {
      "emoji": "😺",
      "description": "grinning cat",
      "category": "Smileys & Emotion",
      "aliases": ["smiley_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😸",
      "description": "grinning cat with smiling eyes",
      "category": "Smileys & Emotion",
      "aliases": ["smile_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😹",
      "description": "cat with tears of joy",
      "category": "Smileys & Emotion",
      "aliases": ["joy_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😻",
      "description": "smiling cat with heart-eyes",
      "category": "Smileys & Emotion",
      "aliases": ["heart_eyes_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😼",
      "description": "cat with wry smile",
      "category": "Smileys & Emotion",
      "aliases": ["smirk_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      },
      {
      "emoji": "😽",
      "description": "kissing cat",
      "category": "Smileys & Emotion",
      "aliases": ["kissing_cat"],
      "tags": [],
      "unicode_version": "6.0",
      "ios_version": "6.0"
      }
     
  
  ];
  
  
  


let score=0

function renderEmoji(){
      let arr=[]
      while(arr.length < 4){
          var r = Math.floor(Math.random() * 73) + 1;
          if(arr.indexOf(r) === -1) arr.push(r);
      }
     return arr;

}
var correct;
let question=8;
function renderCorrect(){
    
     correct = Math.floor(Math.random() * ((3)+1));
return correct
}

function loadQuestion(){
      
      let arr=renderEmoji();
       renderCorrect();
      
option5.innerHTML=posts[arr[correct]].description
option1.innerHTML=posts[arr[0]].emoji
option2.innerHTML=posts[arr[1]].emoji
option3.innerHTML=posts[arr[2]].emoji 
option4.innerHTML=posts[arr[3]].emoji


}
let clicked=false
var choosen=-1;
function rem(){
      for (const child of buttonGroup.children) {
            child.style.border='none'
            child.style.transition='none'
            child.style.transform='none'
            child.style.background=''
            clicked=false
            }
     }



const buttonGroupPressed = e => { 
      
         for (const child of buttonGroup.children) {
       
           child.style.border='none'
           child.style.transition='none'
           child.style.transform='none'
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
   

loadQuestion();
buttonGroup.addEventListener("click", buttonGroupPressed);

submit.addEventListener('click',()=>{
      if(clicked){
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
     $.ajax({
      type: "POST",
      url: "/send_score",
      data: { 
         score: score,
         column: "emoji"
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


