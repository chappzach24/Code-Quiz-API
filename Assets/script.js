let count = 0;



// Selects element by class
var timeEl = document.querySelector(".time");
// Selects element by id
document.getElementById("start_time").onclick = timeStart;
var secondsLeft = 30;

function timeStart() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " Seconds left";
    console.log(secondsLeft);

    if (secondsLeft === 0) {
      // Stops execution of action at set interval

      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }
  }, 1000);
}

let queations = [

  {
    title: "What is the purpose of the let keyword in JavaScript?",
    choices: ["Declaring a constant variable", "Declaring a block-scoped variable", "Declaring a global variable", "Declaring a function"],
    answer: "Declaring a block-scoped variable",
  },
  {
    title:"Which of the following is the correct way to comment a single line in JavaScript?",
    choices:["<!-- This is a comment -->", " /* This is a comment */", "// This is a comment", " ** This is a comment **"],
    answer:"// This is a comment",
  },
  {
    title:"What is the purpose of the addEventListener method in JavaScript?",
    choices:["Adding a new HTML element", "Attaching a function to be executed on a specific event", "Declaring a variable", "Removing an event listener"],
    answer:"Attaching a function to be executed on a specific event",
  },
  {
    title: "In JavaScript, what does the typeof operator return when applied to an array?",
    choices:["array",  "object", "list", "undefined"],
    answer: "object",
  },
]

start_btn.on("click", function() {
  start_btn.prop("disabled", true);
  start_btn.hide();

})
