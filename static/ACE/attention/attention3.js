let words=["able","baby","cake","daddy","easy","funny","gate","happy","ice","juice","kite","love","mommy","nice","open","pretty","queen","ready","sun","take","uncle","van","win","x-ray","yellow","zoo","apron","banana","candy","dinner","egg","family","grape","honey","ice cream","jam","key","lemon","money","napkin","orange","pear","quilt","rabbit","sock","table","umbrella","vase","watch","xylophone","zipper","airplane","book","cat","dog","elephant","fish","giraffe","hat","igloo","jacket","kangaroo","lamp","mouse","newspaper","owl","penguin","rhinoceros","shoe","tiger","umbrella","violin","whale","xmas tree","yacht","zigzag"];
let n=words.length-1;
let arr=new Array(3);
function memorize(){
    
    for(let i=0;i<3;i++){
        let r=Math.floor(Math.random()*n);
        if(arr.indexOf(words[r])==-1){
            arr[i]=words[r];
        }
       
    }
    localStorage.setItem('arr', JSON.stringify(arr));
    document.getElementById("w1").innerHTML=arr[0];
    document.getElementById("w2").innerHTML=arr[1];
    document.getElementById("w3").innerHTML=arr[2];
}
memorize();
function textToAudio(num){
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

}
