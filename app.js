const catBtns = document.querySelectorAll(".category__btn");
const answerBtn = document.querySelector(".submit__answer");
const playBtn = document.querySelector(".play__again");
const theme = document.querySelector("#switch__checkbox");
const menuScreen = document.querySelector(".menu__screen");
const questionScreen = document.querySelector(".question__screen");
const scoreScreen = document.querySelector(".score__screen");
const categoryWrap = document.querySelectorAll(".category__icon--wrapper");
const categoryIcon = categoryWrap[0].querySelector("img");
const categoryText = categoryWrap[0].querySelector("h1");
const scoreIcon = categoryWrap[1].querySelector("img");
const scoreText = categoryWrap[1].querySelector("h1");
const optionBtns = questionScreen.querySelectorAll(".answer__text");
const answerBtns = questionScreen.querySelectorAll(".answer__btn");
let category = "";
let questions = [];
let currentQ = 0;
let score = 0;
let chosenAns = "";
let chosenBtn = "";

document.addEventListener("DOMContentLoaded", () => {
  // Scroll effect
  catBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      chooseCategory(e);
      questions = await fetchData();
      renderQuestion(questions[currentQ], currentQ);
      currentQ++;
      menuScreen.style.transform = "translateX(-100%)";
      questionScreen.style.transform = "translateX(-100%)";
      scoreScreen.style.transform = "translateX(-100%)";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  answerBtn.addEventListener("click", () => {
    if (answerBtn.innerText === "Next Question") {
      if (currentQ !== 10) {
        chosenBtn.style.border = "";
        chosenBtn.children[0].style.backgroundColor = "";
        chosenBtn.children[2].classList.add("hidden");
        answerBtn.innerText = "Submit Answer";
        renderQuestion(questions[currentQ], currentQ);
        answerBtns.forEach((btn) => {
          btn.classList.remove("active");
          btn.style.pointerEvents = "auto";
          btn.children[2].classList.add("hidden");
        });
        currentQ++;
        chosenAns = "";
      } else {
        renderScore();
        answerBtn.innerText = "Submit Answer";
        menuScreen.style.transform = "translateX(-200%)";
        questionScreen.style.transform = "translateX(-200%)";
        scoreScreen.style.transform = "translateX(-200%)";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else if (chosenAns !== "") {
      answerBtn.innerText = "Next Question";
      answerBtns.forEach((btn) => {
        btn.style.pointerEvents = "none";
      });

      renderCorrectAns();
    }
  });

  answerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const button = e.currentTarget;
      chooseAnswer(button);
    });
  });

  playBtn.addEventListener("click", () => {
    questionScreen.style.display = "none";
    scoreScreen.style.display = "none";
    currentQ = 0;
    score = 0;
    chosenBtn.style.border = "";
    chosenBtn.children[0].style.backgroundColor = "";
    chosenBtn.children[2].classList.add("hidden");
    chosenBtn = "";
    answerBtns.forEach((btn) => {
      btn.style.pointerEvents = "auto";
      btn.classList.remove("active");
    });
    menuScreen.style.display = "flex";
    menuScreen.style.transition = "none";
    menuScreen.style.transform = "translateX(100%)";

    menuScreen.offsetHeight;
    document.querySelector(".category__icon--wrapper").classList.add("hidden");
    document.querySelector(".category__icon").className = "category__icon";
    document
      .querySelectorAll(".category__icon--wrapper")[1]
      .querySelector("img").className = "";

    menuScreen.style.transition = "1s all";
    menuScreen.style.transform = "translateX(0)";

    questionScreen.style.transform = "translateX(0)";
    scoreScreen.style.transform = "translateX(0)";
    questionScreen.style.display = "flex";
    scoreScreen.style.display = "flex";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // theme change
  theme.addEventListener("change", () => {
    changeTheme(theme.checked);
  });
  changeTheme(theme.checked);
});

function changeTheme(theme) {
  const body = document.querySelector("body");
  const switchCont = document.querySelector(".switch__cont");
  const menuSpan = menuScreen
    .querySelector(".menu__top")
    .querySelectorAll("span")[1];
  const btns = Array.from(document.querySelectorAll("button")).filter(
    (btn) => !btn.classList.contains("purple__btn")
  );
  const questionSpan = questionScreen.querySelector("span");
  const progress = document.querySelector(".progress__wrapper");
  const resultsWrapper = scoreScreen.querySelector(".results__wrapper");

  if (theme) {
    body.classList.add("dark");
    body.classList.remove("light");
    body.style.backgroundColor = "var(--dark-navy)";
    body.style.color = "#fff";
    switchCont.querySelectorAll("img")[0].src =
      "./assets/images/icon-sun-light.svg";
    switchCont.querySelectorAll("img")[1].src =
      "./assets/images/icon-moon-light.svg";
    menuSpan.style.color = "var(--light-bluish)";
    btns.forEach((btn) => {
      btn.style.backgroundColor = "var(--navy)";
      btn.style.boxShadow = "0px 16px 40px 0px rgba(49,62,81,0.14)";
    });
    progress.style.background = "var(--navy)";
    questionSpan.style.color = "var(--light-bluish)";
    resultsWrapper.style.background = "var(--navy)";
    resultsWrapper.querySelector("span").style.color = "var(--light-bluish)";
  } else if (!theme) {
    body.classList.remove("dark");
    body.classList.add("light");
    body.style.backgroundColor = "";
    body.style.color = "";
    menuSpan.style.color = "";
    btns.forEach((btn) => {
      btn.style.backgroundColor = "";
    });
    switchCont.querySelectorAll("img")[0].src =
      "./assets/images/icon-sun-dark.svg";
    switchCont.querySelectorAll("img")[1].src =
      "./assets/images/icon-moon-dark.svg";
    progress.style.background = "";
    questionSpan.style.color = "";
    resultsWrapper.style.background = "";
    resultsWrapper.querySelector("span").style.color = "";
  }
}

// choose category
function chooseCategory(e) {
  let chosenCat = e.target.classList[1].split("__")[0];
  renderCat(chosenCat);
  return chosenCat;
}
// render category
function renderCat(chosenCat) {
  categoryIcon.classList.add(chosenCat);
  scoreIcon.classList.add(chosenCat);
  const chosenCatsMap = {
    html: "HTML",
    css: "CSS",
    js: "Javascript",
    access: "Accessibility",
  };
  chosenCat = chosenCatsMap[chosenCat];
  category = chosenCat;
  categoryIcon.src = `./assets/images/icon-${chosenCat.toLowerCase()}.svg`;
  categoryText.innerText = chosenCat;
  scoreIcon.src = `./assets/images/icon-${chosenCat.toLowerCase()}.svg`;

  scoreText.innerText = chosenCat;
  categoryWrap[0].classList.remove("hidden");
}
// fetch data
async function fetchData(chosenCat) {
  const response = await fetch("./data.json");
  const { quizzes } = await response.json();
  const questions = quizzes.filter((obj) => obj.title === category)[0]
    .questions;
  return questions;
}

// render questions
function renderQuestion(q, n) {
  const questionText = document.querySelector(".question");
  const progressBar = document.querySelector(".progress__bar");
  const questionNumber = document.querySelector(".question__number");
  progressBar.style.width = `${(n + 1) * 10}%`;
  const question = q.question;
  const options = q.options;
  questionText.classList.add("changing");
  setTimeout(() => {
    questionText.innerText = question;
    questionText.classList.remove("changing");
  }, 200);

  optionBtns.forEach((btn, i) => {
    btn.classList.add("changing");
    setTimeout(() => {
      btn.textContent = options[i];
      btn.classList.remove("changing");
    }, 200);
  });
  questionNumber.innerText = `Question ${n + 1} of 10`;
}
// choose answer
function chooseAnswer(button) {
  answerBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  chosenBtn = button;
  button.classList.add("active");
  chosenAns = button.children[1].innerText;
}
// render answer chosen vs correct answer
function renderCorrectAns(btns) {
  const answer = questions[currentQ - 1].answer;
  if (chosenAns === answer) {
    score++;
    chosenBtn.style.border = "3px solid var(--green)";
    chosenBtn.children[0].style.backgroundColor = "var(--green)";
    chosenBtn.children[2].src = "./assets/images/icon-correct.svg";
    chosenBtn.children[2].classList.remove("hidden");
  } else {
    answerBtns.forEach((btn) => {
      if (btn.children[1].innerText === answer) {
        btn.children[2].src = "./assets/images/icon-correct.svg";
        btn.children[2].classList.remove("hidden");
      }
    });
    chosenBtn.style.border = "3px solid var(--red)";
    chosenBtn.children[0].style.backgroundColor = "var(--red)";
    chosenBtn.children[2].src = "./assets/images/icon-error.svg";
    chosenBtn.children[2].classList.remove("hidden");
  }
}
// render score
function renderScore() {
  document.querySelector(".score").children[0].innerHTML = score;
}

// reset
