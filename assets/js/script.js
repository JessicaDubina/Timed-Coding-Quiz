//element selectors
let timerElement = document.querySelector(".timer");
let quizQuestionsElement = document.querySelector(".quiz-questions");
let quizDoneElement = document.querySelector(".quiz-done");
let submitButton = document.querySelector("#submit-initials");
let quizScreenElement = document.querySelector("#quiz-screen");
let headerElement = document.querySelector("header");
let highscoreScreenElement = document.querySelector("#highscore-screen");
let userInitialsInput = document.querySelector("#initials");
let highscoreList = document.querySelector("#highscores-list");
let clearListButton = document.querySelector("#clear-highscores");
let startQuizElement = document.querySelector(".start-quiz-screen");
let startQuizButton = document.querySelector("#start-quiz");
let backButton = document.querySelector("#back-button");
let viewHighscoresLink = document.querySelector("#view-highscores");
let question = document.querySelector(".question");
let answerList = document.querySelector(".answers");
let answers = document.querySelectorAll(".answers li");
let quizFeedback = document.querySelector(".quiz-feedback-box");
let finalScoreElement = document.querySelector("#final-score");

let score = 0;

const quizQuestions = [
    {
        question: "This is question 1",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 2",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 2
    },
    {
        question: "This is question 3",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 2
    },
    {
        question: "This is question 4",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 5",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 6",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 7",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 8",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
    {
        question: "This is question 9",
        options: ["1. Option", "Option 2", "option 3", "option 4"],
        answer: "Option 2"
    },
];


const startQuiz = () => {
    score = 0;
    //move active status to quiz screen
    if (startQuizElement.classList.contains("active")) {
        startQuizElement.setAttribute("class", "start-quiz-screen");
        quizQuestionsElement.setAttribute("class", "quiz-questions active");
    } 

    //initialize first question/answer
    let questionIndex = 0;
    for (let i = 0; i < answers.length; i++) {
        question.textContent = quizQuestions[questionIndex].question;
        answers[i].textContent = quizQuestions[questionIndex].options[i];
    }

    //iterate to next question
    const nextQuestion = () => {
        //let currentQuestionIndex = quiz
        if (questionIndex < quizQuestions.length - 1) {

        questionIndex = questionIndex + 1;
        question.textContent = quizQuestions[questionIndex].question;
        for (let i = 0; i < answers.length; i++) {
                answers[i].textContent = quizQuestions[questionIndex].options[i];
            }
        } else {
            alert("You've completed all the available questions. Remaining time will be added to your score!")
            score = score + timerCount;
            timerCount = 0;
        }
    }

    
    //initialize timer at max time
    let timerCount = 60;

    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount;
    
        //stop timer at 0 and moves to quiz-done screen
        if (timerCount <= 0) {
            clearInterval(timer);
            timerElement.textContent = "Timer: 0";
            quizQuestionsElement.setAttribute("class", "quiz-questions");
            quizDoneElement.setAttribute("class", "quiz-done active");
            finalScoreElement.textContent = "Your final score is " + score;
        } 
    }, 1000);

    //event listener for selecting an answer

    //add into event listener:
    //when button is clicked, toggle to next question.
    //create function to toggle to next question

    answerList.addEventListener("click", function(event) {
        let userSelection = event.target;
        if (userSelection.matches("li") === true ) {
            console.log(userSelection);
            if (userSelection.textContent === quizQuestions[0].answer) {
                quizFeedback.textContent = "Correct!";
                score = score + 10;
                nextQuestion();
            } else {
            quizFeedback.textContent = "Wrong!";
            timerCount = timerCount - 5;
            nextQuestion();
            }
        }
    })
}

//event listener on start quiz button to switch screens and begin quiz
startQuizButton.addEventListener("click", startQuiz);

//function to toggle to highscore screen
const toggleScreenToHighscores = () => {
    quizScreenElement.setAttribute("class", "quiz-screen");
    headerElement.setAttribute("class", "quiz-screen");
    highscoreScreenElement.setAttribute("class", "highscore-screen active")
    addHighscores();
}

//add event listener to submit button to toggle over to highscore screen
submitButton.addEventListener("click", function() {
    let userHighscores = {
        user: userInitialsInput.value.trim(),
        score: score
    };

    localStorage.setItem("userHighscores",JSON.stringify(userHighscores));
    userInitialsInput.value = "";
    toggleScreenToHighscores();
});

//take new user highscore form storage and append to highscore list
const addHighscores = () => {
    let storedUser = JSON.parse(localStorage.getItem("userHighscores"));
    let newHighscore = storedUser.user + " - " + storedUser.score;
    let li = document.createElement("li");
    li.textContent = newHighscore;
    highscoreList.appendChild(li);
}

clearListButton.addEventListener("click", function() {
    highscoreList.innerHTML = "";
})

backButton.addEventListener("click", function() {
    //reset quiz screen active status to landing page
    startQuizElement.setAttribute("class", "start-quiz-screen active");
    quizQuestionsElement.setAttribute("class", "quiz-questions");
    quizDoneElement.setAttribute("class", "quiz-done");
    //clear active status from highscore screen and toggle back to quiz landing screen
    quizScreenElement.setAttribute("class", "quiz-screen active");
    headerElement.setAttribute("class", "quiz-screen active");
    highscoreScreenElement.setAttribute("class", "highscore-screen");
})

viewHighscoresLink.addEventListener("click", function() {
    //clear active status from quiz screen and toggle back to highscore screen
    quizScreenElement.setAttribute("class", "quiz-screen");
    headerElement.setAttribute("class", "quiz-screen");
    highscoreScreenElement.setAttribute("class", "highscore-screen active");
})
