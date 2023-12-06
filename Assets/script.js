// questions/answers that will be pulled from with correcct answer
const questions = [
  {
    q: "What is the purpose of the addEventListener method in JavaScript?",
    a: [
      { text: "Adding a new HTML element", isCorrect: false },
      { text: "Declaring a variable", isCorrect: false },
      {
        text: "Attaching a function to be executed on a specific event",
        isCorrect: true,
      },
      { text: "Removing an event listener", isCorrect: false },
    ],
  },
  {
    q: "Which of the following is the correct way to comment a single line in JavaScript?",
    a: [
      {
        text: "<!-- This is a comment -->",
        isCorrect: false,
        isSelected: false,
      },
      { text: "/* This is a comment */", isCorrect: false },
      { text: "** This is a comment **", isCorrect: false },
      { text: "// This is a comment", isCorrect: true },
    ],
  },
  {
    q: "What is the purpose of the let keyword in JavaScript?",
    a: [
      { text: "Declaring a function", isCorrect: false },
      { text: "Declaring a global variable", isCorrect: false },
      { text: "Declaring a block-scoped variable", isCorrect: true },
      { text: "Declaring a constant variable", isCorrect: false },
    ],
  },
  {
    q: "In JavaScript, what does the typeof operator return when applied to an array?",
    a: [
      { text: "array", isCorrect: false },
      { text: "list", isCorrect: false },
      { text: "object", isCorrect: true },
      { text: "undefined", isCorrect: false },
    ],
  },
];

let secondsLeft = 50;
const timeEl = document.querySelector(".time");
const questPanel = document.getElementById("quesPanel")
let timerInterval;
var count = localStorage.getItem("user");
var count = localStorage.getItem("score");
var submit = document.querySelector("submit");

let currQuestion = 0;
let score = 0;

function hideStartButton() {
  document.getElementById("introPanel").classList.add('hidden');
  questPanel.classList.remove('hidden');
  timeStart()
  loadQues()
}


// function timePenalty(secondsLeft){
//   return secondsLeft - 10;
// }

function timeStart() {
  // document.getElementById("#start").hide()
  // Sets interval in variable
  timeEl.textContent = secondsLeft + " Seconds left";
   timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " Seconds left";
    console.log(secondsLeft);

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      loadScore()
    }
  }, 1000);
}



function loadQues() {
  const question = document.getElementById("ques");
  const opt = document.getElementById("opt");

  question.textContent = questions[currQuestion].q;
  opt.innerHTML = "";
  //will pick question that will be showed
  for (let i = 0; i < questions[currQuestion].a.length; i++) {
    const choicesBtn = document.createElement("button");
    // const choice = document.createElement("input");
    // const choiceLabel = document.createElement("label");

    // choice.type = "radio";
    // choice.name = "answer";
    // choice.value = i;

    choicesBtn.textContent = questions[currQuestion].a[i].text;
    choicesBtn.setAttribute('value', questions[currQuestion].a[i].isCorrect)
    choicesBtn.addEventListener('click', nextQuestion)
    // choicesdiv.appendChild(choice);
    // choicesdiv.appendChild(choiceLabel);
    opt.appendChild(choicesBtn);
  }
}


function nextQuestion() {
  
  if (this.value === 'false'){
    secondsLeft-=10;
    timeEl.textContent = secondsLeft + " Seconds left";
  }

  if (this.value === 'true'){
   score++;
  }
  
  currQuestion++;
  
  if (currQuestion === questions.length) {
    loadScore()
  } else {
    
    loadQues()
  }
}
//checks score to see if its right
//shows the score you get at the end
function loadScore() {

  clearInterval(timerInterval);
  questPanel.classList.add('hidden')
  document.getElementById("gameOverPanel").classList.remove('hidden');
  const totalScore = document.getElementById("score");
  totalScore.textContent = `You scored ${score} out of ${questions.length} questions`;
}

// submit.addEventListener("click", function(){
  
// })





document.getElementById('start').addEventListener('click', hideStartButton)