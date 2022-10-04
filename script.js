// question data
var questions = [
    {   
        "questionInfo":"question #1",
        "option1":"Choose A",
        "option2":"Choose B",
        "option3":"Choose C",
        "option4":"Choose D",
        "correctOption":"option1",
    },
    {   
        "questionInfo":"question #2",
        "option1":"Want A",
        "option2":"Want B",
        "option3":"Want C",
        "option4":"Want D",
        "correctOption":"option4",
    },
    {   
        "questionInfo":"question #3",
        "option1":"A is right",
        "option2":"B is right",
        "option3":"C is right",
        "option4":"D is right",
        "correctOption":"option2",
    },    
    {   
        "questionInfo":"question #4",
        "option1":"A - yeah!",
        "option2":"B - yeah!",
        "option3":"C - yeah!",
        "option4":"D - yeah!",
        "correctOption":"option3",
    },
    {   
        "questionInfo":"question #5",
        "option1":"A -GOGOGO",
        "option2":"B -GOGOGO",
        "option3":"C -GOGOGO",
        "option4":"D -GOGOGO",
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
var scoreSec = document.querySelector("#score-board");
var scoreNum = document.querySelector("#score");
var initSubmitBtn = document.querySelector("#submit-initials");
var initialText = document.getElementById("initials");
var rank = document.querySelector("#ranking");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear");
var check = document.querySelector("#check-answer");
var scoreT = document.querySelector("#score-tag");


// global variables
var index = 0;
var timerCount = 75;
var timer;
var allScores = [];
var personNum = 0;

//Set up countdown timer
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

//showing quiz section
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

//showing questions and answers with countdown 
function handleSelection(event){
    if(timerCount > 0 ){
        index++;
        if(index < questions.length){
            var element = event.target.id;
            if(element !== questions[index].correctOption){
                check.textContent = "Wrong!";
                if(timerCount < 15){
                    timerCount = 0;
                    showResult();
                } else{
                    timerCount = timerCount - 15;
                    startQuiz();             
                } 
            } else {
                check.textContent = "Correct!";
                startQuiz();
            }
        } else {
            showResult();
        }
    } else {
        showResult();
    }
}

//show result individual score function
function showResult(){
    clearInterval(timer);
    check.textContent = ""; 
    quizSec.style.display = "none";
    resultSec.style.display = "block";
    scoreNum.textContent = timerCount;
    index = 0;
}

//show score records 
function showScores(){
    introSec.style.display = "none";
    quizSec.style.display = "none";
    resultSec.style.display = "none";
    scoreSec.style.display = "block";
    saveScore();
    renderScores();
}

//save score with initial to local storage
function saveScore(){
    var scoreInfo = {
        name: initialText.value,
        score: timerCount
    };
    allScores[personNum] = scoreInfo;
    personNum ++;
    localStorage.setItem("allScores", JSON.stringify(allScores));
    initialText.value = "";
}

//get score with initial from local storage and show 
function renderScores(){
    rank.textContent = "";
    var storedScores = JSON.parse(localStorage.getItem("allScores"));

    for (var i = 0; i < storedScores.length; i++){
        var score = storedScores[i];
        var l = document.createElement("li");
        l.textContent = score.name + " : " + score.score;
        rank.appendChild(l); 
    }
}

//go back to the intro page 
function goBack(){
    timerCount = 75;
    introSec.style.display = "block";
    quizSec.style.display = "none";
    resultSec.style.display = "none";
    scoreSec.style.display = "none";
}

//clear score records in local storage 
function clearScores(){
    allScores = [];
    personNum = 0;
    localStorage.clear();
    rank.textContent = "";
}

//show score by clicking "view Highscores"
function showScoresSection(){
    introSec.style.display = "none";
    quizSec.style.display = "none";
    resultSec.style.display = "none";
    scoreSec.style.display = "block";
}

// Add listeners
startBtn.addEventListener("click", setTime);
startBtn.addEventListener("click", startQuiz);
for(var i=0; i <answer.length; i++){
    answer[i].addEventListener("click", handleSelection);
}
initSubmitBtn.addEventListener("click", showScores);
goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearScores);
scoreT.addEventListener("click",showScoresSection);



    






