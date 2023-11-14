let currentQuestionIndex = 0;
let score = 60;
let timer = {};

const questionScreen = document.getElementById('question-screen')
const questionElement = document.getElementById('question')
const highScoreScreen = document.getElementsByClassName('highscores')[0];
const endScreen = document.getElementsByClassName('finish-screen')[0];
const mainMenu = document.getElementsByClassName("hide")[0];

const highScoreList = document.getElementById("highscore-list");

const goButton = document.getElementById('go-button')
const answerButtons = document.getElementById('answer-btn')
const nextButton = document.getElementById('next-btn')
const highscoreBtn = document.getElementById('highscore-btn');

const highScores = {
    29: ["goerge", "anna"],
    27: ["james"],
    23: ["Chris"]
}

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Tag Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyperlinks Text Mark Language", correct: false},
            {text: "Hyperlinking Text Marking Language", correct: false},
        ]
    },
    {
        question: "Which symbol indicates a tag?",
        answers: [
            {text: "Angle brackets", correct: true},
            {text: "Quotation marks", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Exclamation marks", correct: false},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: [
            {text: "=", correct: true},
            {text: "*", correct: false},
            {text: "-", correct: false},
            {text: "x", correct: false},
        ]
    },
    {
        question: "How do you declare a JavaScript variable?",
        answers: [
            {text: "variable firstName;", correct: false},
            {text: "v firstName", correct: false},
            {text: "var- firstName", correct: false},
            {text: "var firstName;", correct: true},
        ]
    }, {
        question: "How do you call a function named 'myFunction'?",
        answers: [
            {text: "myFunction()", correct: true},
            {text: "call function myFunction", correct: false},
            {text: "call myFunction", correct: false},
            {text: "myFunction=(call)", correct: false},
        ]
    }
]; 

// Docuemnt Object Model (DOM)

function startQuiz() {
    console.log('Started Quiz')
    mainMenu.style.display = "none"; // hide the main menu screen
    questionScreen.style.display = "block";
    goButton.classList.add('hide')
    questionScreen.classList.remove('hide')
    startTimer();
    nextQuestion()
}

function startTimer(){
    timer = setInterval(function() {
        score = score - 1;
        document.getElementById("score").innerHTML = "00:"+score;
    }, 1000); // miliseconds 1000 = 1 second
}

function stopTimer(){
    clearInterval(timer);
}

function nextQuestion() {

    let questionInfo = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = questionInfo.question;
    document.getElementById("answer-a").children[0].innerHTML = questionInfo.answers[0].text;
    document.getElementById("answer-b").children[0].innerHTML = questionInfo.answers[1].text;
    document.getElementById("answer-c").children[0].innerHTML = questionInfo.answers[2].text;
    document.getElementById("answer-d").children[0].innerHTML = questionInfo.answers[3].text;
    
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

function selectAnswer(answerIdx){

    // penalty to the score if the answer is wrong
    console.log(currentQuestionIndex)
    if(questions[currentQuestionIndex].answers[answerIdx].correct != true){
        score = score - 10;
    }
    // other wise just move on

    currentQuestionIndex++; // next question index

    // If this is the last question - move on to the highscore screen
    if(questions.length === currentQuestionIndex || score <= 0){
        // 1 == 1   -> true
        // 1 == "1" -> true
        // 1 === 1 -> ture
        // 1 === "1" -> false (not the smae type)
        endQuiz()
    }
    else{
        // Otherwise, move to the next question
        nextQuestion();
    }
}

function updateHighScores(){
    let playerName = document.getElementById("player-name").value;

    if(highScores[score] == undefined){
        highScores[score] = [];
    }
    highScores[score].push(playerName);

    showHighScores();
}

function showHighScores(){
    endScreen.style.display = "none"; 
    highScoreScreen.style.display = "block";
    questionScreen.style.display = "none"; 
    mainMenu.style.display = "none"; 

    highScoreList.innerHTML = "";

    // get all the scores from the object sorting them by an descending order
    let scores = Object.keys(highScores).map((item, index) => parseInt(item)).sort().reverse();
    // example: [30,25,20]

    for(let i = 0; i < scores.length; i++)
    {
        let score = scores[i];
        let names = highScores[score]; // get the arrray of names per score
        // ["george", "anna"]
        for(let idx in names){
            let name = names[idx];
            highScoreList.innerHTML = highScoreList.innerHTML + `<li>${name} - ${score}</li>`;
        }
    }
    // show the score
    // show the high score
    // button to go back to the main menu
}

function endQuiz(){

    score = score < 0 ? 0 : score;
    // same thing as
    // if(score < 0){
    //     score = 0;
    // }
    
    questionScreen.style.display = "none";
    endScreen.style.display = "block"; 
    document.getElementById("final-score").innerHTML = score;
    stopTimer();
}

function restartQuiz(){
    currentQuestionIndex = 0;
    score = 60;

    endScreen.style.display = "none"; 
    highScoreScreen.style.display = "none"; 
    questionScreen.style.display = "none"; 
    mainMenu.style.display = "block"; 
    document.getElementById("player-name").value = "";
    document.getElementById("score").innerHTML = "00:00";
}


// Main code

// start running the quiz
goButton.addEventListener('click', function(){
    startQuiz(currentQuestionIndex)
})

// Enable the answer buttons:
document.getElementById("answer-a").addEventListener('click', function(){
    selectAnswer(0);
})
document.getElementById("answer-b").addEventListener('click', function(){
    selectAnswer(1);
})
document.getElementById("answer-c").addEventListener('click', function(){
    selectAnswer(2);
})
document.getElementById("answer-d").addEventListener('click', function(){
    selectAnswer(3);
})
document.getElementById("submit-score").addEventListener('click', function(){
    updateHighScores();
})
document.getElementById("restart-quiz").addEventListener('click', function(){
    restartQuiz();
})
highscoreBtn.addEventListener('click', function(){
    showHighScores();
})

