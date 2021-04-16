let questions = [
  {
    question: "wer hat HTML erfunden?",
    answer_01: "Robbie Williams",
    answer_02: "Lady Gaga",
    answer_03: "Tim Berners-Lee",
    answer_04: "Justin Bieber",
    right_answer: 3,
  },

  {
    question: "was bedeutet das HTML Tag &lt;a&gt;?",
    answer_01: "Text Fett",
    answer_02: "Container",
    answer_03: "Ein Link",
    answer_04: "Kursiv",
    right_answer: 3,
  },

  {
    question: "wie bindet man eine Website in eine Website ein?",
    answer_01: "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
    answer_02: "&lt;iframe&gt;",
    answer_03: "&lt;frame&gt;",
    answer_04: "&lt;frameset&gt;",
    right_answer: 2,
  },

  {
    question: "Wie stellt man Text am BESTEN fett dar?",
    answer_01: "&lt;strong&gt;",
    answer_02: "CSS nutzen",
    answer_03: "&lt;bold&gt;",
    answer_04: "&lt;b&gt;",
    right_answer: 1,
  },

  {
    question: "welches Attribut kann man NICHT für Textarea verwenden?",
    answer_01: "readonly",
    answer_02: "max",
    answer_03: "from",
    answer_04: "spellcheck",
    right_answer: 1,
  },

  {
    question:
      "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
    answer_01: "a[title] {...}",
    answer_02: "a > title {...}",
    answer_03: "a.title {...}",
    answer_04: "a=title {...}",
    right_answer: 1,
  },

  {
    question: "Wie definiert man in Javascript eine Variable?",
    answer_01: "let 100 = rate;",
    answer_02: "100 = let rate;",
    answer_03: "rate = 100;",
    answer_04: "let rate = 100;",
    right_answer: 4,
  },
];

let currentQuestionNo = 0;

let noRightAnswers = 0;

let audio_correct = new Audio('audio/correct.mp3');
let audio_wrong = new Audio('audio/wrong.mp3');
let audio_cheer = new Audio('audio/cheer.mp3');

function init() {
  initQuestionFooter();
  showCurrentQuestionNumber();
  showCurrentQuestion();
}

function initQuestionFooter() {
  document.getElementById("no_questions").innerHTML = "";
  document.getElementById("no_questions").innerHTML += questions.length;
}

function showCurrentQuestionNumber() {
  document.getElementById("no_questionOf").innerHTML = "";
  document.getElementById("no_questionOf").innerHTML += currentQuestionNo + 1;
}

function showCurrentQuestion() {
  showProgressBar();
  let question = questions[currentQuestionNo];
  document.getElementById("question-text").innerHTML = question["question"];
  document.getElementById("answer-1").innerHTML = question["answer_01"];
  document.getElementById("answer-2").innerHTML = question["answer_02"];
  document.getElementById("answer-3").innerHTML = question["answer_03"];
  document.getElementById("answer-4").innerHTML = question["answer_04"];
  showCurrentQuestionNumber();
}

function showProgressBar() {
  let progressBar = document.getElementById("progress-no");
  let progressPercentage = parseInt(
    (100 * currentQuestionNo) / questions.length
  );
  console.log("progress: ", progressPercentage);
  progressBar.innerHTML = `${progressPercentage} %`;
  progressBar.style.width = `${progressPercentage}%`;
}

function answerClick(answerNo) {
  console.log(`selected answer is answer ${answerNo}`);
  let idRightAnswer = `answer-${questions[currentQuestionNo]["right_answer"]}`;

  if (answerNo == questions[currentQuestionNo]["right_answer"]) {
    console.log("selected answer is correct!");
    document.getElementById(`answer-${answerNo}`).classList.add("bg-success");
    audio_correct.play();
    noRightAnswers++;
  } else {
    console.log("selected answer is wrong!");
    document.getElementById(`${idRightAnswer}`).classList.add("bg-success");
    document.getElementById(`answer-${answerNo}`).classList.add("bg-danger");
    audio_wrong.play();
  }

  document.getElementById("btn-next-question").disabled = false;
}

function nextQuestion() {
  if (isQuizOver()) {
    showEndScreen();
  } else {
    currentQuestionNo += 1;
    resetStyles();
    showCurrentQuestion();
    showCurrentQuestionNumber();
  }
}

function resetStyles() {
  document.getElementById("header-img").src = "img/pencil.jpg";
  document.getElementById("btn-next-question").disabled = true;

  let elements = document.getElementsByClassName("card-body");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("bg-success");
    elements[i].classList.remove("bg-danger");
  }
}

function showEndScreen() {
  currentQuestionNo = 7;

  showProgressBar();
  document.getElementById("no-right-answers").innerHTML = noRightAnswers;
  document.getElementById("no-all-questions").innerHTML = questions.length;
  document.getElementById("header-img").src = "img/trophy.png";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("question-body").style.display = "none";
  audio_cheer.play();
}

function resetQuiz() {
  noRightAnswers = 0;
  currentQuestionNo = 0;
  resetStyles();
  showCurrentQuestion();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("question-body").style.display = "block";
}

function isQuizOver(){
    return currentQuestionNo >= questions.length - 1;

}
