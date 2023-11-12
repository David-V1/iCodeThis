let questionIdx = 0;

let questions = [
  {
    question: "Best programming language framework?",
    options: ["React", "Angular", "Vanilla JavaScript"],
    answer: "Angular",
    isSkipped: true,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
    ],
    answer: "Hyper Text Markup Language",
    isSkipped: true,
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>"],
    answer: "<style>",
    isSkipped: true,
  },
  {
    question: "What is the purpose of the alt attribute in images?",
    options: [
      "To create a high-quality version of the image",
      "To provide a text alternative for the image",
      "To make the image load faster",
    ],
    answer: "To provide a text alternative for the image",
    isSkipped: true,
  },
  {
    question:
      'Which of the following is the correct syntax for referring to an external script called "xxx.js"?',
    options: [
      '<script href="xxx.js">',
      '<script name="xxx.js">',
      '<script src="xxx.js">',
    ],
    answer: '<script src="xxx.js">',
    isSkipped: true,
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: [
      "// this is a comment //",
      "/* this is a comment */",
      "<!-- this is a comment -->",
    ],
    answer: "/* this is a comment */",
    isSkipped: true,
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<lb>", "<br>"],
    answer: "<br>",
    isSkipped: true,
  },
  {
    question: "Which of these elements are all <table> elements?",
    options: ["<table><tr><td>", "<table><tr><tt>", "<table><tb><tc>"],
    answer: "<table><tr><td>",
    isSkipped: true,
  },
];
const optionLetters = ["A", "B", "C"];

function remainingQuestions() {
  const remainingQuestions = questions.filter((question) => question.isSkipped);
  return remainingQuestions.length;
}

function questionAnswered() {
  questions[questionIdx].isSkipped = false;
}

function skipQuestion() {
  const skipBtn = document.getElementById("skip");
  skipBtn.addEventListener("click", () => {
    questionIdx++;
    renderQuestion();
    questionNumber();
    clearSelection();
  });
}
skipQuestion();

function roundRobin() {
  if (questionIdx === questions.length) {
    const skippedQuestions = questions.filter((question) => question.isSkipped);
    questions = skippedQuestions;
    questionIdx = 0;
  }
}
function clearSelection() {
  const options = document.querySelectorAll(".answer-options p");
  const optionsLetters = document.querySelectorAll(".answer-options span");

  options.forEach((option) => option.classList.remove("selected"));
  optionsLetters.forEach((letter) => letter.classList.remove("selected-span"));
}

function renderQuestion() {
  roundRobin();
  if (questionIdx === questions.length) {
    quizCompleted();
    clearInterval(stopwatchInterval);
    return;
  }
  const question = document.querySelector(".question");
  const options = document.querySelectorAll(".answer-options p");

  question.textContent = questions[questionIdx].question;

  options.forEach((option, idx) => {
    const answerOptionNoLetter = questions[questionIdx].options[idx];
    const span = option.querySelector("span");
    // A = 65, B = 66, C = 67, etc.
    const letter = String.fromCharCode(65 + idx);

    if (span) {
      span.textContent = letter;
    } else {
      // !span, create one
      const newSpan = document.createElement("span");
      newSpan.textContent = letter;
      option.insertBefore(newSpan, option.firstChild);
    }

    // inserting text
    const textNode = document.createTextNode(` ${answerOptionNoLetter}`);
    if (span.nextSibling) {
      span.nextSibling.textContent = ` ${answerOptionNoLetter}`;
    } else {
      option.appendChild(textNode);
    }
  });
}
renderQuestion();

function questionNumber() {
  const questionNum = document.querySelector(".q-rem p");
  questionNum.textContent = `Question ${
    questionIdx + 1
  } (${remainingQuestions()} remaining)`;
}
questionNumber();

function quizCompleted() {
  const htmlDoneContent = `
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="modal-bg"></div>
    <div id="complete-box" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md slide-in">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-lg font-xl text-gray-900">
        Quiz Completed!
      </h1>
      <button class="text-gray-400 hover:text-gray-900">
        <svg
          onclick="closeModal()"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div>
      <p class="text-sm text-gray-500">Your final score - <span class="text-md text-gray-600">Correct:${scoreManager.getCorrectScore()} | Wrong: ${scoreManager.getIncorrectScore()}</span></p>
      <p class="text-sm text-gray-500">Time taken - <span class="text-md text-gray-600">${
        timer.textContent
      }</span></p>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", htmlDoneContent);
}

function closeModal() {
  document.getElementById("modal-bg").style.display = "none";
  document.getElementById("complete-box").style.display = "none";
  document.body.classList.remove("modal-active");
  location.reload();
}

const scoreManager = (function () {
  let correctScore = 0;
  let incorrectScore = 0;

  function incrementCorrect() {
    const correctSpan = document.getElementById("correct");
    correctScore++;
    correctSpan.textContent = correctScore;
  }

  function incrementIncorrect() {
    const incorrectSpan = document.getElementById("incorrect");
    incorrectScore++;
    incorrectSpan.textContent = incorrectScore;
  }

  function getCorrectScore() {
    return correctScore;
  }

  function getIncorrectScore() {
    return incorrectScore;
  }

  return {
    incrementCorrect: incrementCorrect,
    incrementIncorrect: incrementIncorrect,
    getCorrectScore: getCorrectScore,
    getIncorrectScore: getIncorrectScore,
  };
})();

const answerManager = (function () {
  let selectedAnswer = null;

  function selectAnswer() {
    const options = document.querySelectorAll(".answer-options p");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        // textIdx === [1]
        const textNode = option.childNodes[1];
        const textContent = textNode ? textNode.nodeValue.trim() : "";

        selectedAnswer = textContent.toLowerCase();
      });
    });
  }

  function nextQuestion() {
    questionIdx++;
    selectedAnswer = null;
    clearSelection();
  }

  function checkAnswer() {
    if (selectedAnswer === null) {
      alert("Please select an answer");
    } else {
      if (
        selectedAnswer === questions[questionIdx].answer.trim().toLowerCase()
      ) {
        scoreManager.incrementCorrect();
      } else {
        scoreManager.incrementIncorrect();
      }
      questionAnswered();
      nextQuestion();
      renderQuestion();
      questionNumber();
    }
  }

  return {
    selectAnswer: selectAnswer,
    checkAnswer: checkAnswer,
  };
})();

answerManager.selectAnswer();

document
  .getElementById("ans")
  .addEventListener("click", answerManager.checkAnswer);

function startStopwatch(display) {
  var startTime = Date.now();
  var interval = setInterval(function () {
    var elapsedTime = Date.now() - startTime;
    var hours = Math.floor(elapsedTime / 3600000);
    var minutes = Math.floor((elapsedTime % 3600000) / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
  }, 1000);

  return interval;
}
let timer = document.querySelector(".timer span");
let stopwatchInterval = startStopwatch(timer);
