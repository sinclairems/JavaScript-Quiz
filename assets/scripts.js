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
let score = 0;

// Get references to the HTML elements 
const startButton = document.getElementById("startButton");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choices");
const answer = document.getElementById("answer");
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

  const choices = [...currentQuestion.choices]; // Create a copy of choices array
  const answerIndex = choices.indexOf(currentQuestion.answer);

  // Shuffle choices to randomize order
  choices.sort(() => Math.random() - 0.5);

  const choiceButtons = document.querySelectorAll(".choice-btn");
  choiceButtons.forEach((button, index) => {
    button.textContent = choices[index];
    button.onclick = () => checkAnswer(choices[index], index === answerIndex); // Fixed check for correct answer
  });
}

function checkAnswer(selectedAnswer, isCorrect) {
  if (isCorrect) {
    score += 10;
  } else {
    score -= 10;
    timeLeft -= 10; // Subtract time for incorrect answer
    if (timeLeft < 0) timeLeft = 0;
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
  clearInterval(timerInterval);
  questionScreen.style.display = "none";
  endScreen.style.display = "block";

  // Update the final score element to display the score
  finalScoreElement.textContent = score;
}

function submitScore() {
  const initials = initialsInput.value.toUpperCase(); // Get and format initials
  const newScore = { initials, score: finalScore };

  // Retrieve existing scores from localStorage or start with an empty array
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the new score
  highScores.push(newScore);

  // Sort the high scores 
  highScores.sort((a, b) => b.score - a.score);

  // Save the updated high scores back to localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
