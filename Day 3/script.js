const questions = [
    {
        question : "Which is the largest animal in the world?",
        answers : [
            {text : "Elephant",correct : false},
            {text : "Blue Whale",correct : true},
            {text : "Giraffe",correct : false},
            {text : "Great White Shark",correct : false}
        ]
    },
    {
        question : "Which is the largest desert in the world?",
        answers : [
            {text : "Sahara Desert",correct : false},
            {text : "Arabian Desert",correct : false},
            {text : "Antarctic Desert",correct : true},
            {text : "Gobi Desert",correct : false}
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answers : [ 
            {text : "Australia",correct : true},
            {text : "Antarctica",correct : false},
            {text : "Europe",correct : false},
            {text : "South America",correct : false}
        ]
    },
    {
        question : "Which is the Best College in the world?",
        answers : [
            {text : "Harvard University",correct : false},
            {text : "Lovely Professional University",correct : true},
            {text : "MIT",correct : false},
            {text : "Oxford University",correct : false}
        ]
    },

];


const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo+". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer(answer));
    });
}



function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}   




startQuiz();