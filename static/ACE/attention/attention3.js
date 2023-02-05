let words=["ability","able","about","above","accept","accident","according","account","across","act","action","activity","actually","add","address","administration","admit","adult","affect","after","again","against","age","agency","agent","ago","agree","agreement","ahead","air","all","allow","almost","alone","along","already","also","although","always","am","American","among","an","analyze","and","animal","another","answer","any","anyone","anything","appear","apply","approach","area","argue","arm","around","arrive","art","article","artist","as","ask","assume","at","attack","attention","attorney","audience","author","authority","available","avoid","away","baby","back","bad","bag","ball","bank","bar","base","be","beat","beautiful","because","become","bed","before","begin","behavior","behind","believe","benefit","best","better","between","beyond","big","bill","billion","bit","black","blood","blue","board","body","book","born","both","box","boy","break","bring","brother","budget","build","building","business","but","buy","by","call","camera","campaign","can","cancer","candidate","capital","car","card","care","career","carry","case","catch","cause","cell","center","central","century","certain","certainly","chair","challenge","chance","change","character","charge","check","child","choice","choose","church","citizen","city","civil","claim","class","clear","clearly","close","coach","cold","collection","college","color","come","commercial","common","community","company","compare","computer","concern","condition","conference","Congress","consider","consumer","contain","continue","control","cost","could","country","couple","course","court","cover","create","crime","cultural","culture","cup","current","customer","cut","dark","data","daughter","day","dead","deal","death","debate","decade","decide","decision","deep","defense","degree","Democrat","democratic","describe","design","despite","detail","determine","develop","development","die","difference","different","difficult","dinner","direction","director","discover","discuss","discussion","disease","do","doctor","dog","door","down","draw","dream","drive","drop","drug","during","each","early","east","easy","eat","economic","economy","edge","education","effect","effort","eight","either","election","else","employee","end","energy","enjoy","enough","enter","entire","environment","environmental","especially","establish","even","evening","event","ever","every","everybody","everyone","everything","evidence","exactly","example","executive","exist","expect","experience","expert","explain","eye","face","fact","factor","fail","fall","family","far","fast","father","fear","federal","feel","feeling","few","field","fight","figure","fill","film","final","finally","financial","find","fine","finger","finish","fire","firm","first","fish","five","floor","fly","focus","follow","food","foot","for","force","foreign","forget","form","former","forward","four","free","friend","from","front","full","fund","future","game","garden","gas","general","generation","get","girl","give","glass","go","goal","good","government","great","green","ground","group","grow","growth","guess","gun","guy","hair","half","hand","hang","happen","happy","hard","have","he","head","health","hear","heart","heat","heavy","help","her","here","herself","high","him","himself","his","history","hit","hold","home","hope","hospital","hot","hotel","hour","house","how","however","huge","human","hundred","husband","I","idea","identify","if","image","imagine","impact","important","improve","in","include","including","increase","indeed","indicate","individual","industry","information","inside","instead","insurance","intellectual","intelligence","intend","interest","interesting","international","interview","into","investment","involve","issue","it","item","its","itself","job","join","just","keep","key","kid","kill","kind","kitchen","know","knowledge","land","language","large","last","late","later","laugh","law","lawyer","lay","lead","leader","learn","least","leave","left","leg","legal","less","let","letter","level","lie","life","light","like","likely","line","list","listen","little","live","local","long","look","lose","loss","lot","love","low","machine","magazine","main","maintain","major","majority","make","man","manage","management","manager","many","market","marriage","material","matter","may","maybe","me","mean","measure","media","medical","meet","meeting","member","memory","mention","message","method","middle","might","military","million","mind","minute","miss","mission","model","modern","moment","money","month","more","morning","most","mother","mouth","move","movement","movie","Mr","Mrs","much","music","must","my","myself","name","nation","national","natural","nature","near","nearly","necessary","need","network","never","new","news","newspaper","next","nice","night","no","none","nor","north","not","note","nothing","notice","now","number","occur","of","off","offer","office","officer","official","often","oh","oil","ok","old","on","once","one","only","onto","open","operation","opportunity","option","or","order","organization","other","others","our","out","outside","over","own","owner","page","pain","painting","paper","parent","part","participant","particular","particularly","partner","party","pass","past","patient","pattern","pay","peace","people","per","perform","performance","perhaps","period","person","personal","phone","photo","physical","pick","picture","piece","place","plan","plant","play","player","point","police","policy","political","politics","poor","popular","population","position","positive","possible","power","practice","prepare","present","president","pressure","pretty","prevent","price","private","probably","problem","process","produce","product","production","professional","professor","program","project","property","protect","prove","provide","public","pull","purpose","put","quality","question","quickly","quite","race","radio","raise","range","rate","rather","reach","read","ready","real","reality","realize","really","reason","receive","recent","recently","recognize","record","red","reduce","reflect","region","relate","relationship","religious","remain","remember","remove","report","represent","Republican","require","research","resource","respond","response","responsibility","rest","result","return","reveal","rich","right","rise","risk","road","rock","role","room","rule","run","safe","same","save","say","scene","school","science","scientist","score","sea","season","seat","second","section","security","see","seek","seem","sell","send","senior","sense","series","serious","serve","service","set","seven","several","sex","sexual","shake","share","she","shoot","short","shot","should","shoulder","show","side","sign","significant","similar","simple","simply","since","sing","single","sister","sit","site","situation","six","size","skill","skin","small","smile","so","social","society","soldier","some","somebody","someone","something","sometimes","son","song","soon","sort","sound","source","south","southern","space","speak","special","specific","speech","spend","sport","spring","staff","stage","stand","standard","star","start","state","statement","station","stay","step","still","stock","stop","store","story","strategy","street","strong","structure","student","study","stuff","style","subject","success","successful","such","suddenly","suffer","suggest","summer","support","sure","surface","system","table","take","talk","task","tax","teach","teacher","team","technology","television","tell","ten","tend","term","test","than","thank","that","the","their","them","themselves","then","theory","there","these","they","thing","think","third","this","those","though","thought","thousand","threat","three","through","throughout","throw","thus","time","to","today","together","tonight","too","top","total","tough","toward","town","trade","traditional","training","travel","treat","treatment","tree","trial","trip","trouble","true","truth","try","turn","TV","two","type","under","understand","unit","until","up","upon","us","use","usually","value","various","very","victim","view","violence","visit","voice","vote","wait","walk","wall","want","war","watch","water","way","we","wear","week","weight","well","west","western","what","whatever","when","where","whether","which","while","white","who","whole","whom","whose","why","wide","wife","will","win","wind","window","wish","with","within","without","woman","wonder","word","work","worker","world","worry","would","write","writer","wrong","yard","yeah","year","yes","yet","you","young","your","yourself"];
let n=words.length-1;
let arr=new Array(3);
let isAudioPlaying = false;
let isRecording = false;
function memorize(){
    
    for(let i=0;i<3;i++){
        let r=Math.floor(Math.random()*n);
        if(arr.indexOf(words[r])==-1){
            arr[i]=words[r];
        }
       
    }
    document.getElementById("w1").innerHTML=arr[0];
    document.getElementById("w2").innerHTML=arr[1];
    document.getElementById("w3").innerHTML=arr[2];
}
memorize();

function textToAudio(num){
   // Check the value of the flag
  if (isRecording) {
    // Display an error message or return from the function
    document.getElementById('recognition-status').textContent="🔴 Voice recognition is currently in progress";
    return;
  }
  const msg = new SpeechSynthesisUtterance(
    arr[num]
    
  );
  msg.lang = "hi-IN";

const voices = speechSynthesis.getVoices().filter(voice => voice.lang === "hi-IN");
      
      msg.voice = voices[1];
      msg.volume = 1;
      msg.rate=0.8;
      msg.pitch = 0.8;
      window.speechSynthesis.cancel(msg);
      window.speechSynthesis.speak(msg);
      // Set the flag to true when the audio starts playing
        isAudioPlaying = true;

        // Set the flag to false when the audio ends
        msg.addEventListener('end', () => {
          isAudioPlaying = false;
  });
      

}
//repeats back spoken words
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
      msg.rate = 0.8;
      msg.pitch = 1;
      window.speechSynthesis.cancel(msg);
      window.speechSynthesis.speak(msg);

}

let ans=new Array(3);
// Define a function to start speech recognition
function audioToText(i){
  if (isAudioPlaying) {
    // Display an error message or return from the function

    document.getElementById('recognition-status').textContent="🔴 Audio is currently playing";
    return;
  }
   // Set the flag to true when the recognition starts
   isRecording = true;
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
    message=transcript;
    message=message.toLowerCase();
    if(message[message.length-1]==="."){
    message=message.slice(0,-1);
    }
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
     // Set the flag to false when the recognition ends
     isRecording = false;
    
  });
  recognition.start();
  // Stop recognition after 4 seconds
  setTimeout(() => {
  recognition.stop();
}, 5000);
}   
 //scoring

 function scoring(){
  let sent=false;
  let score=0;
  for(let i=0;i<3;i++){
      let ind=arr.indexOf(ans[i]);
     if(ind!=-1){
         score++;
         arr.splice(ind,1);
     }
  }
  $.ajax({
     type: "POST",
     url: "/send_score",
     data: { 
        score: score,
        column: "ace3"
     },
     success: function(response) {
        console.log(response);
        sent=true; 
        redirect(sent);     
     } 
     
  });
}
function redirect(sent){
  if(sent===true){
    window.location.href=nextUrl;
  }
}


