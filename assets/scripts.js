// Questions and Answers
const questions = [
    {
        question: "What is the biggest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Uranus", correct: false },
            { text: "Saturn", correct: false }
        ]
    },

    {
        question: "Which constellation is known as The Water Bearer?", 
        answers: [
            { text: "Orion", correct: false },
            { text: "Gemini", correct: false },
            { text: "Aquarius", correct: true },
            { text: "The Little Dipper", correct: false }
        ]
    },

    {
        question: "How long does Pluto take to orbit the sun?", 
        answers: [
            { text: "248 days", correct: false },
            { text: "248 years", correct: true },
            { text: "248 months", correct: false },
            { text: "248 weeks", correct: false }
        ]
    },

    {
        question: "How far away is our moon?", 
        answers: [
            { text: "352,550 miles", correct: false },
            { text: "40,850 miles", correct: false },
            { text: "1,001,250 miles", correct: false },
            { text: "238,855 miles", correct: true }
        ]
    },

    {
        question: "Is there life on Mars?", 
        answers: [
            { text: "It's complicated", correct: false },
            { text: "There is no proof to date", correct: true },
            { text: "Definitely 👽", correct: false },
            { text: "Not yet", correct: false }
        ]
    },
];

// Variables
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-btns");
const nextBtn = document.getElementById("next-btn");
const highScore = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let timer;

// Start Quiz 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

/* Timer */
function startTimer() {
    let timeLeft = 10;
    let timer = setInterval(function() {
        if (timeLeft <= 0 || nextBtn.style.display === "block") {
            clearInterval(timer);
        }
        document.getElementById("timer").innerHTML = timeLeft;
        timeLeft -= 1;
    }, 1000);
}


// Show JS questions and answers
function showQuestion() {
    resetQuiz();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;
    questionEl.innerHTML = `${questionNum}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtn.appendChild(button);
    });
}


// Remove template questions and answers
function resetQuiz() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

// Check if selected answer is correct and display Next button
function selectAnswer(e) {  
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from (answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
    //clearInterval(timer);
}

// Display score at end of quiz
function showScore() {
    resetQuiz();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextBtn.innerHTML = "Restart";
        nextBtn.style.display = "block";
    hideTimer();
}

// Hide timer at end of quiz
function hideTimer() {
    document.getElementById("timer").style.display = "none";  
}

// Cycle through questions
function goToNextQuestion() {
    startTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event Listeners
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        goToNextQuestion();
    } else {
        startQuiz();
    }
});

addEventListener("load", startTimer)
startQuiz();


// Code for basic quiz setup from https://www.youtube.com/watch?v=PBcqGxrr9g8
