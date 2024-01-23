// TO DO: Create a timer function that gives 10 seconds for each question. 
// If the user does not answer the question in time, they get it wrong and move to the next question. (-1 on their score)
// TO DO: Create a function that stores the user's initials and score in local storage.

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

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz 
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
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
}

// Display score at end of quiz
function showScore() {
    resetQuiz();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextBtn.innerHTML = "Restart";
        nextBtn.style.display = "block";
}

// Cycle through questions
function goToNextQuestion() {
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

startQuiz();


// Code for basic quiz setup from https://www.youtube.com/watch?v=PBcqGxrr9g8