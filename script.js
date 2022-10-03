// question data
var questions = [
    {   
        "questionInfo":"question #1",
        "option1":"A",
        "option2":"B",
        "option3":"C",
        "option4":"D",
        "correctOption":"option1",
    },
    {   
        "questionInfo":"question #2",
        "option1":"A",
        "option2":"B",
        "option3":"C",
        "option4":"D",
        "correctOption":"option2",
    },
    {   
        "questionInfo":"question #3",
        "option1":"A",
        "option2":"B",
        "option3":"C",
        "option4":"D",
        "correctOption":"option2",
    },    
    {   
        "questionInfo":"question #4",
        "option1":"A",
        "option2":"B",
        "option3":"C",
        "option4":"D",
        "correctOption":"option2",
    },
    {   
        "questionInfo":"question #5",
        "option1":"A",
        "option2":"B",
        "option3":"C",
        "option4":"D",
        "correctOption":"option2",
    }
]

// document objects
var timeEl = document.querySelector("#timer-count");
var startBtn = document.querySelector("#startButton");
var questionInfoText = document.querySelector("#question-info");
var answer = document.querySelectorAll(".answer");
var introSec = document.querySelector("#intro");
var quizSec = document.querySelector("#quiz");
var resultSec = document.querySelector("#result");
var scoreNum = document.querySelector("#score");

// global variables
var index = 0;
var timerCount = 50;
var timer;

//
function setTime(){
    timer = setInterval(function() {
        if (timerCount > 0) {
            timerCount--;
        }
        timeEl.textContent = "Time : " + timerCount;
        // Tests if time has run out
        if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        }
    }, 1000);
}

function startQuiz(){
    introSec.style.display = "none";
    quizSec.style.display ="block";
    var question = questions[index];
    
    questionInfoText.textContent = question.questionInfo;
    option1.textContent = question.option1;
    option2.textContent = question.option2;
    option3.textContent = question.option3;
    option4.textContent = question.option4;    
}

function handleSelection(event){
    if(timerCount > 0 ){
        index++;
        if(index < questions.length){
            var element = event.target.id;
            if(element !== questions[index].correctOption){
                if(timerCount < 15){
                    timerCount = 0;
                    showResult();
                } else{
                    timerCount = timerCount - 15;
                    startQuiz();             
                } 
            } else {
                startQuiz();
            }
        } else {
            showResult();
        }
    } else {
        showResult();
    }
}

//
function showResult(){
    clearInterval(timer);
    quizSec.style.display = "none";
    resultSec.style.display = "block";
    scoreNum.textContent = timerCount;
}

// Add listeners
startBtn.addEventListener("click", setTime);
startBtn.addEventListener("click", startQuiz);
for(var i=0; i <answer.length; i++){
    answer[i].addEventListener("click", handleSelection);
}


    





