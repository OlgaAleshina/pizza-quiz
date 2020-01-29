const startButton = document.getElementById("start-button");
const heading = document.getElementById("heading");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const resultButton = document.getElementById("result-button");
const resultContainer = document.getElementById("result-container");
let radioButtonElement = document.getElementsByTagName("input");

let resultsArray = [];
let questionIndex = 0;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", isChecked);
resultButton.addEventListener("click", calculateResult);

function startQuiz() {
  heading.classList.add("hide");
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextButton.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (questions.length < questionIndex + 1) {
    questionContainer.classList.add("hide");
    nextButton.classList.add("hide");
    resultButton.classList.remove("hide");
  } else {
    showQuestion(questions[questionIndex]);
  }
}
function isChecked() {
  let checkedAnswersArray = Array.from(
    document.querySelectorAll('input[type="radio"]')
  );
  if (checkedAnswersArray.filter(radio => radio.checked).length === 1) {
    questionIndex++;
    saveCheckedAnswer();
    setNextQuestion();
  } else {
    console.log("try again");
  }
}

function saveCheckedAnswer() {
  let checkedAnswersArray = Array.from(
    document.querySelectorAll('input[type="radio"]')
  )
    .filter(radio => radio.checked)
    .map(radio => radio.value);
  console.log(checkedAnswersArray);
  resultsArray.push(checkedAnswersArray[0]);
  console.log(resultsArray);
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  const answersValue = Object.values(question.answers);
  const valueLetterArray = ["a", "b", "c"];
  let i = 0;

  answersValue.forEach(answer => {
    const answerLabel = document.createElement("label");
    answerLabel.classList = "form-check-label";
    const radioButton = document.createElement("INPUT");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", "optradio");
    radioButton.setAttribute("value", valueLetterArray[i]);
    radioButton.classList.add("form-check-inline");
    answerLabel.innerText = answer;
    answerLabel.appendChild(radioButton);
    answerButtonsElement.appendChild(answerLabel);
    i++;
  });
}

function calculateResult() {
  resultContainer.classList.remove("hide");
  resultButton.classList.add("hide");
  /* restart the quiz
  nextButton.innerText = "restart";
  nextButton.classList.remove("hide");
  questionIndex = 1;*/

  let array = [
    resultsArray.filter(letter => letter == "a").length,
    resultsArray.filter(letter => letter == "b").length,
    resultsArray.filter(letter => letter == "c").length
  ];
  let largest = array.reduce((a, b) => (a > b ? a : b));
  let index = array.findIndex((index, largest) => index === largest);
  if (index == 1) {
    resultContainer.innerText = resultDefinition.a;
  } else if (index == 2) {
    resultContainer.innerText = resultDefinition.b;
  } else {
    resultContainer.innerText = resultDefinition.c;
  }

  console.log(array);
  console.log(largest);
  console.log(index);

  /*let numberOfAs = resultsArray.filter(letter => letter == "a").length;
  let numberOfBs = resultsArray.filter(letter => letter == "b").length;
  let numberOfCs = resultsArray.filter(letter => letter == "c").length;
  if (numberOfAs > numberOfBs && numberOfAs > numberOfCs) {
    resultContainer.innerText = resultDefinition.a;
  } else if (numberOfBs > numberOfAs && numberOfBs > numberOfCs) {
    resultContainer.innerText = resultDefinition.b;
  } else if (numberOfCs > numberOfAs && numberOfCs > numberOfBs) {
    resultContainer.innerText = resultDefinition.c;
  }*/
}

// array of questions
let questions = [
  {
    question: "Pic a type of olives to top your pizza",
    answers: {
      a: "green olives",
      b: "black olives",
      c: "no olives"
    }
  },
  {
    question: "What is the perfect pizza toppings combination?",
    answers: {
      a: "olives and artichokes",
      b: "tomatoes and cheese",
      c: "pepperoni and mozzarella"
    }
  },
  {
    question: "Choose one pizza topping to eat for the rest of your life",
    answers: {
      a: "pineapples",
      b: "mushrooms",
      c: "extra cheese"
    }
  },
  {
    question: "A pizza is not a pizza without...",
    answers: {
      a: "pepperoni",
      b: "onion",
      c: "artichoke"
    }
  },
  {
    question: "Which topping you'll never add to your pizza?",
    answers: {
      a: "bacon",
      b: "there is nothing I couldn't add",
      c: "pineapple"
    }
  },
  {
    question: "Pineapple on pizza is a...",
    answers: {
      a: "must have",
      b: "no go",
      c: "I don't care"
    }
  }
];

const resultDefinition = {
  a:
    "More than 29. <br> You're living an unapologetic way of life, with a strong preference to pineapples and other weird stuff on your pizza. It's OK, you've tried almost every topping option in your 20's, so do you boo boo!",
  b:
    "22-28. <br> You love to experiment with different types of toppings, but you'll never neglect your all time favorites. Every night is pizza night, enjoy it while you can because anchovy toppings days are coming. ",
  c:
    "15-21. <br> You definitely prefer to go with the regular pizza toppings and ignore the weird ones. Pineapples on pizza might sound like what horror movies are made of, but one day you'll get there. Trust us."
};
