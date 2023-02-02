
$.ajax({
    url: "/api-key",
    success: function(api_key) {
        // Store the API key in a global variable
        window.API_KEY = api_key;

        // Make another AJAX request using the API key
        let firstErrorMessage = "";
        let secondErrorMessage = "";
        let s1=0,s2=0;
        document.getElementById("next-btn").addEventListener("click", function(event){
            event.preventDefault();
            let first = document.getElementById("first").value;
            let second = document.getElementById("second").value;
            first=first.toLowerCase();
            second=second.toLowerCase();
            first=first.charAt(0).toUpperCase() + first.slice(1);
            second=second.charAt(0).toUpperCase() + second.slice(1);
            let firstLen=first.split(" ");
            let secondLen=second.split(" ");
            try {
                if(firstLen.length<3){
                    firstErrorMessage="First sentence is incomplete"
                    document.getElementById("first-error").innerHTML =firstErrorMessage ;
                }
                else{
                    checkText(first, "first-sentence");
                }
                    
                if(secondLen.length<3){
                    secondErrorMessage="Second sentence is incomplete"
                    document.getElementById("second-error").innerHTML =secondErrorMessage ;
                }
                else{
                    checkText(second, "second-sentence");
                }
                
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
                    'X-RapidAPI-Key': window.API_KEY,
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
                console.log(data);
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
                } else {
                    
                    console.log("No errors found in " + type);
                }
                if(firstErrorMessage !== "") {
                    document.getElementById("first-error").innerHTML = firstErrorMessage;
                } else {
                    document.getElementById("first-error").innerHTML = "No errors found in first sentence";
                    s1++;
                }
                if(secondErrorMessage !== "") {
                    document.getElementById("second-error").innerHTML = secondErrorMessage;
                } else {
                    document.getElementById("second-error").innerHTML = "No errors found in second sentence";
                    s2++;
                }
                document.getElementById("result").innerHTML="Your Score is "+(s1+s2)+"/2";
                s1=0,s2=0;
            })
    
            .catch(error => {
                console.error(error);
                document.getElementById("error").innerHTML = "An error occurred while checking " + type + ", please try again later.";
            });
       }
    }
})
function scoring(){
    console.log("hello");
    let score=s1+s2;
    
}

