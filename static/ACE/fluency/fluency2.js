l = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Cow",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
]
function refreshPage(){
    window.location.reload();
} 
// repeats back spoken words
function repeat(message) {
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
// audio to text
let ans = new Array();
// Define a function to start speech recognition
function audioToText(i) {
    let message = "";
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
        // document.getElementById('text' + i).textContent = transcript;
        message = transcript;
        message = message.toLowerCase();
        if (message[message.length - 1] === ".") {
            message = message.slice(0, -1);
        }
        
        // Check if the recognition process has completed
        if (event.results[0].isFinal) {
            // Stop recognition if the process has completed
            recognition.stop();
        }
    });
    recognition.addEventListener('end', () => {
        // Display a message when recognition ends
        document.getElementById('recognition-status').textContent = '🟢 Voice Recognition ended';
        if(ans.indexOf(message)==-1){
            ans.push(message);
        }
        repeat(message);
        document.getElementById("text").innerHTML = "Record next name";
        animateText();
    });
    recognition.start();
    // Stop recognition after 4 seconds
    setTimeout(() => {
    recognition.stop();
  }, 5000);
}
//animate text
function animateText() {
    const textElement = document.getElementById("text");
    textElement.classList.add("animate");
    setTimeout(() => {
      textElement.classList.remove("animate");
    }, 1000);
  }
function scoring() {
    document.getElementById("hidden").style.display="block";
    let score = 0;
    let ind = 0;
    let found = [];
    if (ans.length > 0) {
        while (ind < ans.length) {
            let flag = 0;
            let str = ans[ind];
            for (var i = 0; i < l.length; i++) {
                if ((str.toLowerCase()) === (l[i].toLowerCase())) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 1 && !found.includes(str)) {
                found.push(str);
                score++;
            }
            ind++;
        }
    }
    let a;
    if(score==0){
        a=0;
    }
    else if(score>=1 && score<=2){
        a=1;
    }
    else if(score>=3 && score<=5){
        a=2;
    }
    else if(score>=6 && score<=7){
        a=3;
    }
    else if(score>=8 && score<=10){
        a=4;
    }
    else if(score>=11 && score<=13){
        a=5;
    }
    else if(score>=14 && score<=16){
        a=6;
    }
    else if(score>16){
        a=7;
    }
    score=a;
    
    $.ajax({
        type: "POST",
        url: "/send_score",
        data: { 
           score: score,
           column: "fluency2",
           source:"fluency2_response",
           user_response:JSON.stringify(ans)
        },
        success: function(response) {
           console.log(response);
           sent=true;
           redirect(sent);
}
    });
};
     
   function redirect(sent){
     if(sent===true){
       window.location.href=nextUrl;
     }
   }


