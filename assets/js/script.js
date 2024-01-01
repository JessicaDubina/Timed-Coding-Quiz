//Main landing screen element selectors
let quizScreenElement = document.querySelector("#quiz-screen");
let headerElement = document.querySelector("header");
let startQuizElement = document.querySelector(".start-quiz-screen");
let startQuizButton = document.querySelector("#start-quiz");

//Quiz questions screen element selectors
let timerElement = document.querySelector(".timer");
let quizQuestionsElement = document.querySelector(".quiz-questions");
let question = document.querySelector(".question");
let answerList = document.querySelector(".answers");
let answers = document.querySelectorAll(".answers li");
let quizFeedback = document.querySelector(".quiz-feedback-box");

//Quiz done screen element selectors
let quizDoneElement = document.querySelector(".quiz-done");
let submitButton = document.querySelector("#submit-initials");
let userInitialsInput = document.querySelector("#initials");
let finalScoreElement = document.querySelector("#final-score");

//Highscore screen element selectors
let highscoreScreenElement = document.querySelector("#highscore-screen");
let highscoreList = document.querySelector("#highscores-list");
let clearListButton = document.querySelector("#clear-highscores");
let backButton = document.querySelector("#back-button");
let viewHighscoresLink = document.querySelector("#view-highscores");


let score = 0;

//object that contains all of the quiz questions
const quizQuestions = [
    {
        question: "Which of the following is NOT a type of loop on JavaScript?",
        options: ["for", "for/in", "while", "when"],
        answer: "when"
    },
    {
        question: "What does the array unshift() method do?",
        options: ["removes the first array element", "adds a new element to an array (at the beginning)", "returns an indexed element from an array", "removes the last element from an array"],
        answer: "adds a new element to an array (at the beginning)"
    },
    {
        question: "The CSS box model consists of (in order from interior to exterior)",
        options: ["content, padding, margins and borders", "content, margins, borders and padding", "content, padding, borders and margins", "content, borders, padding and margins"],
        answer: "content, padding, borders and margins"
    },
    {
        question: "Elements with a meaning refers to:",
        options: ["Semantic elements", "Non-semantic elements", "Header elements", "Title elements"],
        answer: "Semantic elements"
    },
    {
        question: "During an event in JavaScript, the 'this' keyword refers to",
        options: ["the nearest object", "the element that received the event", "the global object", "nothing, unless it is pre-defined"],
        answer: "the element that received the event"
    },
    {
        question: "Which is NOT a way to define a function in JavaScript",
        options: ["a function as a statement", "a function as an expression", "a function as an object", "a function as an arrow function"],
        answer: "a function as an object"
    },
    {
        question: "Given a flex container, if we wanted move the contents into a column in the center of the box, and order them from bottom to top, which properties should we use?",
        options: ["Flex direction: column-reverse; align-items: center;", "Flex direction: column-reverse; justify-content: center;", "Flex direction: column; align-items: center;", "Flex direction: column; justify-content: center;"],
        answer: "Flex direction: column-reverse; align-items: center;"
    },
    {
        question: "Which is NOT a way to collect user input?",
        options: ["Prompt('Enter your name')", "<input> element", "alert('Enter your name')", "button.addEventListener()"],
        answer: "alert('Enter your name')"
    },
    {
        question: "An allocated piece of memory that the JavaScript engine is unable to reclaim is condsidered what?",
        options: ["poor allocation to local storage", "permanent local storage", "memory loss", "memory leak"],
        answer: "memory leak"
    },
];

//function to toggle from start quiz screen to quiz question screen
const toggleQuizQuestionScreen = () => {
    if (startQuizElement.classList.contains("active")) {
        startQuizElement.setAttribute("class", "start-quiz-screen");
        quizQuestionsElement.setAttribute("class", "quiz-questions active");
    }
}

//function to toggle to highscore screen
const toggleHighscoreScreen = () => {
    quizScreenElement.setAttribute("class", "quiz-screen");
    headerElement.setAttribute("class", "quiz-screen");
    highscoreScreenElement.setAttribute("class", "highscore-screen active");
    addHighscores();
}

//initializes Quiz and carries user through all quiz questions. 
//once time is up or all questions have been answered, transitions to quiz-done screen
const startQuiz = () => {
    //reset quiz variables
    quizFeedback.textContent = "";
    score = 0;
    let questionIndex = 0;
    
    toggleQuizQuestionScreen();

    //initialize first question/answer
    for (let i = 0; i < answers.length; i++) {
        question.textContent = quizQuestions[questionIndex].question;
        answers[i].textContent = quizQuestions[questionIndex].options[i];
    }

    //function to move to next question
    const nextQuestion = () => {
        if (questionIndex < quizQuestions.length - 1) {
            questionIndex = questionIndex + 1;
            question.textContent = quizQuestions[questionIndex].question;
            for (let i = 0; i < answers.length; i++) {
                answers[i].textContent = quizQuestions[questionIndex].options[i];
            }
        } else if (questionIndex === quizQuestions.length - 1) {
            alert("You've completed all the available questions. Remaining time will be added to your score!");
            score = score + timerCount;
            timerCount = 0;
            answerList.removeEventListener("click", checkAnswer);
        } 
    }

    //Check if answer is correct and score/timer actions based on answer
    const checkAnswer = (event) => {
        let userSelection = event.target;
        if (userSelection.matches("li") === true ) {
            if (userSelection.textContent === quizQuestions[questionIndex].answer) {
                quizFeedback.textContent = "Correct!";
                score = score + 10; 
            } else {
            quizFeedback.textContent = "Wrong!";
            timerCount = timerCount - 5;
            }
            nextQuestion();
        }
    }

    //event listener for selecting an answer  
    answerList.addEventListener("click", checkAnswer);

    //initialize timer at max time
    let timerCount = 60;

    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Timer: " + timerCount;
    
        //stop timer at 0 and moves to quiz-done screen
        if (timerCount <= 0) {
            clearInterval(timer);
            endQuiz(score);
        } 
    }, 1000);  
}

//move to quiz done screen and display score
const endQuiz = (score) => {
    timerElement.textContent = "Timer: 0";
    quizQuestionsElement.setAttribute("class", "quiz-questions");
    quizDoneElement.setAttribute("class", "quiz-done active");
    finalScoreElement.textContent = "Your final score is " + score;
    questionIndex = 0;
}

//event listener on start quiz button to switch screens and begin quiz
startQuizButton.addEventListener("click", startQuiz);

//event listener for submit button to toggle over to highscore screen
submitButton.addEventListener("click", function() {
    
    let userHighscores = {
        user: userInitialsInput.value.trim(),
        score: score
    };

    localStorage.setItem("userHighscores",JSON.stringify(userHighscores));
    userInitialsInput.value = "";
    toggleHighscoreScreen();
});

//take new user highscore form and append to highscore list
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
