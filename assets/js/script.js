//make timer: start at 1 minute, then run down to 0
let timerElement = document.querySelector(".timer");
let quizQuestionsElement = document.querySelector(".quiz-questions");
let quizDoneElement = document.querySelector(".quiz-done");
let submitButton = document.querySelector("#submit-initials");
let quizScreenElement = document.querySelector("#quiz-screen");
let headerElement = document.querySelector("header");
let highscoreScreenElement = document.querySelector("#highscore-screen");
let userInitialsInput = document.querySelector("#initials");

let timerCount = 5;


timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    
    //stop timer at 0
    if (timerCount === 0) {
        clearInterval(timer);
        //when timer is 0: .quiz-questions has .active removed; quiz-done has .active added
        quizQuestionsElement.setAttribute("class", "quiz-questions");
        quizDoneElement.setAttribute("class", "quiz-done active");
    }
}, 1000);

//function to toggle highscore and quiz screens
const toggleScreen = () => {
    //if quiz screen is active
    if(quizScreenElement.classList.contains("active")) {
        quizScreenElement.setAttribute("class", "quiz-screen");
        headerElement.setAttribute("class", "quiz-screen");
        highscoreScreenElement.setAttribute("class", "highscore-screen active")
    } else {
        quizScreenElement.setAttribute("class", "quiz-screen active");
        headerElement.setAttribute("class", "quiz-screen active");
        highscoreScreenElement.setAttribute("class", "highscore-screen")
    }
}

//add event listener to submit button to toggle over to highscore screen
submitButton.addEventListener("click", function() {
    localStorage.setItem("user",userInitialsInput.value);
    debugger
    toggleScreen();
});

//initial status: quiz-questions is active
