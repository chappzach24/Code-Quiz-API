
// questions that will be pulled from
const Questions = [{
  q: "What is the purpose of the addEventListener method in JavaScript?",
  a: [{ text: "Adding a new HTML element", isCorrect: false },
  { text: "Declaring a variable", isCorrect: false },
  { text: "Attaching a function to be executed on a specific event", isCorrect: true },
  { text: "Removing an event listener", isCorrect: false }
  ]
},
{
  q: "Which of the following is the correct way to comment a single line in JavaScript?",
  a: [{ text: "<!-- This is a comment -->", isCorrect: false, isSelected: false },
  { text: "/* This is a comment */", isCorrect: false },
  { text: "** This is a comment **", isCorrect: false },
  { text: "// This is a comment", isCorrect: true }
  ]

},
{
  q: "What is the purpose of the let keyword in JavaScript?",
  a: [{ text: "Declaring a function", isCorrect: false },
  { text: "Declaring a global variable", isCorrect: false },
  { text: "Declaring a block-scoped variable", isCorrect: true },
  { text: "Declaring a constant variable", isCorrect: false }
  ]
},
{
  q: "In JavaScript, what does the typeof operator return when applied to an array?",
  a: [{ text: "array", isCorrect: false },
  { text: "list", isCorrect: false },
  { text: "object", isCorrect: true },
  { text: "undefined", isCorrect: false }
  ]
}]

let secondsLeft = 40;


function hideStartButton() {
  document.getElementById("#start").style.display = "none";
}

var timeEl = document.querySelector(".time");

// function timePenalty(secondsLeft){
//   return secondsLeft - 10;
// } 

function timeStart() {
  // document.getElementById("#start").hide() 
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    currentSeconds = secondsLeft--;
    timeEl.textContent = currentSeconds + " Seconds left";
    console.log(secondsLeft);

    if (currentSeconds === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);

    }
  }, 1000);
} 

// start button will start the game and clock
// start_btn.on("click", function() {
//   start_btn.prop("disabled", true);
//   start_btn.hide();
//   remove

// });

let currQuestion = 0
let score = 0
 
function loadQues() {
    const question = document.getElementById("ques")
    const opt = document.getElementById("opt")

    question.textContent = Questions[currQuestion].q;
    opt.innerHTML = ""
 
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
        const choicesdiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");
 
        choice.type = "radio";
        choice.name = "answer";
        choice.value = i;
 
        choiceLabel.textContent = Questions[currQuestion].a[i].text;
 
        choicesdiv.appendChild(choice);
        choicesdiv.appendChild(choiceLabel);
        opt.appendChild(choicesdiv);
    }
}

 
function loadScore() {
    const totalScore = document.getElementById("score")
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`
} 

 
function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        document.getElementById("opt").remove()
        document.getElementById("ques").remove()
        document.getElementById("btn").remove()
        loadScore();
    }
}
 
function checkAns() {
    const selectedAns = parseInt(document.querySelector('input[name="answer"]:checked').value);
 
    if (Questions[currQuestion].a[selectedAns].isCorrect) {
        score++;
        console.log("Correct")
        nextQuestion();
    } else {
      nextQuestion();

    }
}
