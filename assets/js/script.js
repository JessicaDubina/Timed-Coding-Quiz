//make timer: start at 1 minute, then run down to 0
let timerElement = document.querySelector(".timer");

let timerCount = 5;


timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    
    //stop timer at 0
    if (timerCount === 0) {
        clearInterval(timer);
        
        //***** add code to swap .active to .quiz done ****

    }
}, 1000);

//initial status: quiz-questions is active
//when timer is 0: .quiz-questions has .active removed; quiz-done has .active added