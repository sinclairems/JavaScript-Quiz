// Questions and Answers
const questions = [
    {
        question: "What is the biggest planet in our solar system?",
        choices: ["Earth", "Uranus", "Saturn"],
        answer: "Jupiter"
    },

    {
        question: "Which constellation is known as The Water Bearer?", 
        choices: ["Orion", "Gemini", "The Little Dipper"],
        answer: "Aquarius"
    },

    {
        question: "How long does Pluto take to orbit the sun?", 
        choices: ["248 days", "248 months", "248 weeks"],
        answer: "248 years"
    },

    {
        question: "How far away is our moon?", 
        choices: ["352,550 miles", "40,850 miles", "1,001,250 miles"],
        answer: "238,855 miles"
    },

    {
        question: "Is there life on Mars?", 
        choices: ["It's complicated", "Definitely 👽", "Not yet"],
        answer: "There is no proof to date"
    },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

// Get references to the HTML elements 
const startButton = document.getElementById("startButton");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choices");
const timeLeftElement = document.getElementById("timeLeft"); // Timer display
const startScreen = document.getElementById("startScreen"); // Initial screen
const questionScreen = document.getElementById("questionScreen"); // Question display
const endScreen = document.getElementById("endScreen"); // Final screen
const finalScoreElement = document.getElementById("finalScore"); // Score display
const initialsInput = document.getElementById("initials"); // Initials input
const submitScoreButton = document.getElementById("submitScore"); // Submit button

// Event Listeners
startButton.addEventListener("click", startQuiz);
submitScoreButton.addEventListener("click", submitScore); // Add this for score submission

// Quiz Functions
function startQuiz() {
  startScreen.style.display = "none";
  questionScreen.style.display = "block";
  showQuestion();
  startTimer();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000); // Update every 1000 milliseconds (1 second)
}


function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  choicesList.innerHTML = ""; // Clear previous choices

  currentQuestion.choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => checkAnswer(choice)); // Check when clicked
    choicesList.appendChild(li);
  });
}


function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    // Correct answer
  } else {
    // Incorrect answer
    timeLeft -= 10; // Subtract time 
    if (timeLeft < 0) timeLeft = 0; // Prevent negative time
    timeLeftElement.textContent = timeLeft;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}


function endQuiz() {
  // ... show endScreen, stop timer, display score
}