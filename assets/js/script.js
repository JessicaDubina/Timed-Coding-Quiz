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
let answers = document.querySelectorAll(".answers li");

const quizQuestions = [
    {
        question: "This is question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: 2
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
];


const startQuiz = () => {
    if (startQuizElement.classList.contains("active")) {
        startQuizElement.setAttribute("class", "start-quiz-screen");
        quizQuestionsElement.setAttribute("class", "quiz-questions active");
    } 

    //initialize first question/answer
    question.textContent = quizQuestions[0].question;
    for (let i = 0; i < answers.length; i++) {
        answers[i].textContent = quizQuestions[0].options[i];
    }

    //initialize timer at max time
    let timerCount = 5;

    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount;
    
    //stop timer at 0
    if (timerCount === 0) {
        clearInterval(timer);
        //when timer is 0: .quiz-questions has .active removed; quiz-done has .active added
        //initial status: .quiz-questions is .active
        quizQuestionsElement.setAttribute("class", "quiz-questions");
        quizDoneElement.setAttribute("class", "quiz-done active");
    }
    }, 1000);
}

//event listener on start quiz button to switch screens and begin quiz
startQuizButton.addEventListener("click", startQuiz);

//function to toggle highscore and quiz screens
const toggleScreen = () => {
    //if quiz screen is active
    if(quizScreenElement.classList.contains("active")) {
        quizScreenElement.setAttribute("class", "quiz-screen");
        headerElement.setAttribute("class", "quiz-screen");
        highscoreScreenElement.setAttribute("class", "highscore-screen active")
        addHighscores();
    } else {
        quizScreenElement.setAttribute("class", "quiz-screen active");
        headerElement.setAttribute("class", "quiz-screen active");
        highscoreScreenElement.setAttribute("class", "highscore-screen")
    }
}

//add event listener to submit button to toggle over to highscore screen
submitButton.addEventListener("click", function() {
    let userHighscores = {
        user: userInitialsInput.value.trim(),
        score: "0"
    };

    localStorage.setItem("userHighscores",JSON.stringify(userHighscores));
    userInitialsInput.value = "";
    toggleScreen();
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
