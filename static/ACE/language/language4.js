       
     
        let firstErrorMessage = "";
        let secondErrorMessage = "";
        let s1=0,s2=0;
        let count=0;
        let firstLen,secondLen;
        let first,second;
        let ans=[];
        document.getElementById("next-btn").addEventListener("click", function(event){
            event.preventDefault();
            first = document.getElementById("first").value;
            second = document.getElementById("second").value;
            first=first.toLowerCase();
            second=second.toLowerCase();
            first=first.charAt(0).toUpperCase() + first.slice(1);
            second=second.charAt(0).toUpperCase() + second.slice(1);
            firstLen=first.split(" ");
            secondLen=second.split(" ");
            
            try {
                
                checkText(first, "first-sentence");
                   
                 checkText(second, "second-sentence");
                  
                  
            } catch (error) {
                console.error(error);
                alert("An error occured while checking text, please try again later.");
            }
           
        });
        function checkText(message, type){
           
           
            const encodedParams = new URLSearchParams();
            encodedParams.append("language", "en-US");
            encodedParams.append("text", message);
            
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': 'b1ae5b8ab7mshdae051681457ddep1fbd4cjsn1a204c61719d',
                    'X-RapidAPI-Host': 'dnaber-languagetool.p.rapidapi.com'
                },
                body: encodedParams
            }
            
            fetch('https://dnaber-languagetool.p.rapidapi.com/v2/check', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                count++;
                // console.log(data);
                if (data.matches.length > 0) {
                    let errorMessage = "Errors found in " + type + ": ";
                    data.matches.forEach(function(match) {
                        errorMessage += match.message;
                    });
                    if(type === "first-sentence") {
                        firstErrorMessage = errorMessage;
                    } else {
                        secondErrorMessage = errorMessage;
                    }
                }
                if(type==="first-sentence" && firstLen.length>=3 && data.matches.length==0){
                   
                    // document.getElementById("first-error").innerHTML = "No errors found in first sentence";
                    s1++;
                  
                }
                if(type==="second-sentence" && secondLen.length>=3 && data.matches.length==0) {
                    // document.getElementById("second-error").innerHTML = "No errors found in second sentence";
                    s2++;
                   
                }
                if(count==2){
                   
                    scoring(s1+s2);
                }
                
            })
           
            .catch(error => {
                console.error(error);
                document.getElementById("error").innerHTML = "An error occurred while checking " + type + ", please try again later.";
            });
           
       }
       
   
function scoring(score){
   let sent=false;
    ans.push(first);
    ans.push(second);
   
    $.ajax({
        type: "POST",
        url: "/send_score",
        data: { 
           score: score,
           column: "language3",
           source:"language3_response",
           user_response:JSON.stringify(ans)
        },
        success: function(response) {
            console.log(response);
           
            // sent=true;
            redirect();
 }
     });
 }
      
    function redirect(sent){
    //   if(sent===true){
        window.location.href=nextUrl;
    //   }
    }


