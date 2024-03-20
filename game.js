// Define variables for DOM elements
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Event listeners
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    resetQuiz();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    resetQuiz();
}

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        showResultBox();
    }
}

// Function to reset quiz variables
function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Function to display questions and options
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '<div class="option-grid">';

    questions[index].options.forEach((option, i) => {
        if (option.endsWith('.jpg') || option.endsWith('.png')) {
            // If the option ends with .jpg or .png, treat it as an image option
            optionTag += `<div class="option"><img src="${option}" alt="Option ${i + 1}" style="width: 200px; height: 150px;"></div>`;
            // Modify width and height values as needed
        } else {
            // Otherwise, treat it as a text option
            optionTag += `<div class="option"><span>${option}</span></div>`;
        }

        // Add a line break after the second option to create a new row in the grid
        if ((i + 1) % 2 === 0 && i !== questions[index].options.length - 1) {
            optionTag += '</div><div class="option-grid">';
        }
    });

    optionTag += '</div>';

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// Function to handle user's selection
function optionSelected(answer) {
    let userAnswer;
    if (answer.querySelector('img')) {
        // If the selected option contains an image, extract the src attribute as the answer
        userAnswer = answer.querySelector('img').getAttribute('src');
    } else {
        // Otherwise, extract the text content of the option
        userAnswer = answer.textContent.trim();
    }
  
    console.log("User answer:", userAnswer);
  
    let correctAnswer = questions[questionCount].answer;
    let allOptions = document.querySelectorAll('.option');
  
    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
  
        // Highlight the correct answer
        for (let i = 0; i < allOptions.length; i++) {
            let option = allOptions[i];
            let optionContent;
            if (option.querySelector('img')) {
                optionContent = option.querySelector('img').getAttribute('src');
            } else {
                optionContent = option.textContent.trim();
            }
            if (optionContent === correctAnswer) {
                option.classList.add('correct');
            }
        }
    }
  
    // Disable all options after selection
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }
  
    nextBtn.classList.add('active');
  }
  

// Function to update question counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Function to update header score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to display quiz result
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    const progressEndValue = (userScore / questions.length) * 100;
    let progressStartValue = 0;
    const speed = 20;

    const progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,155, .1) 0deg)`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
