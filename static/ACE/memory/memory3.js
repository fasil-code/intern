
let addressBook = [
    {
    Name: "sunil kumar",
    Street: "station road",
    Locality: "patel nagar",
    District: "indore",
    State: "madhya pradesh"
    },
    {
    Name: "ramesh patel",
    Street: "shastri marg",
    Locality: "saket nagar",
    District: "bhopal",
    State: "madhya pradesh"
    },
    {
    Name: "suresh sharma",
    Street: "rajendra nagar",
    Locality: "rajendra park",
    District: "new delhi",
    State: "delhi"
    },
    {
    Name: "ravi gupta",
    Street: "palika bazaar",
    Locality: "kanpur",
    District: "kanpur nagar",
    State: "uttar pradesh"
    },
    {
    Name: "anand patel",
    Street: "sardar patel road",
    Locality: "ahmedabad",
    District: "ahmedabad",
    State: "gujarat"
    }
    ];
//Retrieve the random number from local storage
let rand = localStorage.getItem("rand");

//Check if the item is present in the local storage
if(rand){
    //Parse the random number back to an integer
    rand = parseInt(rand);
   
}
let score = localStorage.getItem("score");

//Check if the item is present in the local storage
if(score){
    //Parse the random number back to an integer
    score = parseInt(score);
    console.log(score);
   
}
let objectSize =Object.values(addressBook[rand]).length;
let count=0;
let sent=false;
let ans=[];
let actual=[];
document.getElementById("next-btn").addEventListener("click", function(event){
    event.preventDefault();
    count++;
    let score=0;
    //array for keeping track of questions which were not answered or answered incorrectly
    let arr=new Array();
    for(let i=0;i<objectSize;i++){
        let answer=document.getElementById(i).value.toLowerCase();
        ans.push(answer);
        actual.push(Object.values(addressBook[rand])[i]);
        //if answer matches
        if(answer==Object.values(addressBook[rand])[i]){
            document.getElementById("box"+i).style.display="none";
            if(i==0){
                score+=3;
            }
            else{
                score++;
            }

        }
        else{
            arr.push(i);
        }
    }
    let flag=false;
    let correctAnswers=5-arr.length,incorrectAnswers=arr.length;
   
    if(score!=7){
        document.getElementById("hint").innerHTML="🔴 For Hints press hint button";
        document.getElementById("Hint-modal").style.visibility="visible";
        document.getElementById("heading").style.display="none";
        let modalBody = document.querySelector(".modal-body");
        for(let i=0;i<arr.length;i++){
            let str=Object.values(addressBook[rand])[arr[i]];
            let li = document.createElement("li");
            li.textContent =i+1+": "+Object.entries(addressBook[rand])[arr[i]][0]+" starts with "+str.slice(0,2);
            modalBody.appendChild(li);
        }
        for(let i=0;i<arr.length;i++){
            let index=arr[i];
            let answer=document.getElementById(index).value.toLowerCase();
            //if answer matches
            if(answer==Object.values(addressBook[rand])[index]){
                correctAnswers++;
            }
        }
        
        score=score+correctAnswers;
        console.log(score);
        if(count==2){
            //mapping of actual response with user response
             let ansMap = new Map();
              for(let i=0;i<5;i++){
                ansMap.set(actual[i], ans[i]);
             } 
            $.ajax({
                type: "POST",
                url: "/send_score",
                data: { 
                   score: score,
                   column: "memory4",
                   source:"memory4_response",
                   user_response:JSON.stringify(Object.fromEntries(ansMap))
                },
                success: function(response) {
                   console.log(response);
                   sent=true; 
                   redirect(sent);  
                
   
                } 
                
             });
        }
    }
    else{
        score+=5;
        //mapping of actual response with user response
         let ansMap = new Map();
          for(let i=0;i<5;i++){
            ansMap.set(actual[i], ans[i]);
          } 
        $.ajax({
            type: "POST",
            url: "/send_score",
            data: { 
               score: score,
               column: "memory4",
               source:"memory4_response",
               user_response:JSON.stringify(Object.fromEntries(ansMap))
            },
            success: function(response) {
                console.log(response);
                sent=true; 
                redirect(sent);    
             } 
             
          });
     }
 })
 function redirect(sent){
     if(sent===true){
       window.location.href=nextUrl;
     }
   }
 
