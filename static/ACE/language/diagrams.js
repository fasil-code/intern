
    const diagrams= [
        {
          "name": "Book",
          "imageUrl": "book.png",
          "correctName": "Book"
        },
        {
          "name": "Spoon",
          "imageUrl": "soon.png",
          "correctName": "Spoon"
        },
        {
          "name": "Goat",
          "imageUrl": "goat.png",
          "correctName": "Goat"
        },
        {
          "name": "Candle",
          "imageUrl": "candle.png",
          "correctName": "Candle"
        },
        {
          "name": "Flag",
          "imageUrl": "flag.png",
          "correctName": "Flag"
        },
        {
          "name": "Camel",
          "imageUrl": "camel.png",
          "correctName": "Camel"
        },
        {
          "name": "Sickle",
          "imageUrl": "sickle.png",
          "correctName": "Sickle"
        },
        {
          "name": "Giraffe",
          "imageUrl": "giraffe.png",
          "correctName": "Giraffe"
        },
        {
          "name": "Timpani",
          "imageUrl": "timpani.png",
          "correctName": "Timpani"
        },
        {
          "name": "Umbrella",
          "imageUrl": "umbrella.png",
          "correctName": "Umbrella"
        },
        {
          "name": "Pig",
          "imageUrl": "pig.png",
          "correctName": "Pig"
        },
        {
          "name": "Crocodile",
          "imageUrl": "crocodile.png",
          "correctName": "Crocodile"
        }
      ]
      let marks = 0;
      const mark1=document.getElementById('mar');
      const d1 = document.getElementById('diagrams');
      const errmsg=document.getElementById("errorMessage")
      // function onSub() {
      //   // Change the URL to the results route
       
      //   window.location.href = '/results';
      // }
      document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('form');
        // Add the event listener and the rest of the code here
        if (form) {
          
            // Add the rest of the code here
            
        form.addEventListener('submit', e => {
          e.preventDefault();
        
          // Get the names and input fields for each diagram
          //const names = ['Diagram 1', 'Diagram 2', /* Add more names for the remaining diagrams */];
          const inputs = document.querySelectorAll('.diagram input');
        
          // Calculate the total marks
          var diagram1 = document.getElementById("diagram1").value;
          var diagram2 = document.getElementById("diagram2").value; 
          var diagram3 = document.getElementById("diagram3").value;
          var diagram4 = document.getElementById("diagram4").value; 
          var diagram5 = document.getElementById("diagram5").value;
          var diagram6 = document.getElementById("diagram6").value; 
          var diagram7 = document.getElementById("diagram7").value;
          var diagram8 = document.getElementById("diagram8").value;       
          var diagram9 = document.getElementById("diagram9").value;
          var diagram10 = document.getElementById("diagram10").value; 
          var diagram11 = document.getElementById("diagram11").value;
          var diagram12 = document.getElementById("diagram12").value; 
        
          if(diagram1=="" || diagram2=="" ||  diagram3=="" ||  diagram4=="" ||  diagram5=="" ||  diagram6=="" || diagram7=="" || diagram8=="" || diagram9=="" || diagram10=="" || diagram11==""  || diagram12==""){
            alert("Please fill out all of the fields.");
            document.getElementById("errorMessage").innerHTML = "Please fill out all of the fields.";
            return;
          }
           for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value.toLowerCase() === diagrams[i].correctName.toLowerCase()) {
              marks++;
            }
          }
          // const score = document.getElementById("mar");
          // score.innerHTML="YourScore is :"+marks;
           d1.style.display='none'
        form.style.display='none'
        errmsg.style.display='none'
          mark1.innerHTML="Your Score is :"+marks;
         // marksDiv.innerHTML = `Marks: ${marks}`;
        });
      }
      });
     
  // export const mark=marks;