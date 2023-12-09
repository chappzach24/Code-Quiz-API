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
let userNameInput = document.getElementById("userName");
let userName = "";

var submit = document.querySelector("#submit");

let currQuestion = 0;
let score = 0;

function hideStartButton() {
  document.getElementById("introPanel").classList.add('hidden');
  questPanel.classList.remove('hidden');
  timeStart()
  loadQues()
}




function timeStart() {

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
  
    choicesBtn.textContent = questions[currQuestion].a[i].text;
    choicesBtn.setAttribute('value', questions[currQuestion].a[i].isCorrect)
    choicesBtn.addEventListener('click', nextQuestion)
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
    const totalScore = document.getElementById("score");
    totalScore.textContent = ` You scored ${score} out of ${questions.length} questions`;
    showScoreboard()
  } else {
    
    loadQues()
  }
}



function saveUserName() {
  // Get the user name from the input field

  userName = document.getElementById("userName").value;

  // Ensure the user entered a name
  if (userName.trim() === "") {
    alert("Please enter your initials.");
    return;
  }

  // Save the user name to local storage
  localStorage.setItem("userName", userName);

  console.log("User name saved:", userName);

  return userName
}

function loadScore() {
  let userName = saveUserName()
  document.getElementById("submitBtn").addEventListener("click", saveUserName);
  // document.getElementById("submitBtn").addEventListener("click", showScoreboard);
  saveHighScore(userName, score);

  
  // Get the user name from the input field
  userName = userNameInput.value;
  localStorage.setItem("userName", userName)
  
  const totalScore = document.getElementById("score");
  totalScore.textContent = ` You scored ${score} out of ${questions.length} questions`;
  
  // Save user name and score to localStorage
  
  localStorage.setItem("score", score);
  
  showScoreboard();
}


function getHighScores() {
  // Retrieve high scores from localStorage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  return highScores;
}

function showScoreboard() {
  // stop time and clear page before the scoreboard shows up
  clearInterval(timerInterval);
  questPanel.classList.add('hidden')
  user = localStorage.getItem("userName")
  document.getElementById("gameOverPanel").classList.remove('hidden');
  document.getElementById("refresh").classList.remove('hidden');


  const scoreboardPanel = document.getElementById("scoreboardPanel");
  scoreboardPanel.classList.remove("hidden");
  // Get high scores from localStorage
  const highScores = getHighScores();

  // Display high scores in the scoreboardList
  const scoreboardList = document.getElementById("scoreboardList");
  scoreboardList.innerHTML = "";

  console.log(score)

  highScores.forEach((score, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index+ 1}. ${score.userName} - ${score.score}`;
    scoreboardList.appendChild(listItem);
  });
} 

function saveHighScore(userName, score) {
  // Retrieve existing high scores
  const highScores = getHighScores();
  // Add the current user's score to the array
  highScores.push({ userName, score });

  // Sort high scores in descending order
  highScores.sort((a, b) => b.score - a.score);

  // Save the updated high scores to localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}







document.getElementById('start').addEventListener('click', hideStartButton)