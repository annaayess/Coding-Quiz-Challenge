const goButton = document.getElementById('go-button')
const questionScreen = document.getElementById('question-screen')
goButton.addEventListener('click', startQuiz)
const questionElement = document.getElementById('question')


const answerButtons = document.getElementById('answer-btn')
const nextButton = document.getElementById('next-btn')


function startQuiz() {
    console.log('Started Quiz')
    goButton.classList.add('hide')
    questionScreen.classList.remove('hide')
    nextQuestion()

}

function nextQuestion() {

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

function selectAnswer(){

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



let currentQuestionIndex = 0;
let score = 0; 





