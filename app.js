const catBtns = document.querySelectorAll(".category__btn");
const answerBtn = document.querySelector(".submit__answer");
const playBtn = document.querySelector(".play__again");
const theme = document.querySelector("#switch__checkbox");
const menuScreen = document.querySelector(".menu__screen");
const questionScreen = document.querySelector(".question__screen");
const scoreScreen = document.querySelector(".score__screen");

document.addEventListener("DOMContentLoaded", () => {
  // Scroll effect
  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
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
    menuScreen.style.transform = "translateX(-200%)";
    questionScreen.style.transform = "translateX(-200%)";
    scoreScreen.style.transform = "translateX(-200%)";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  playBtn.addEventListener("click", () => {
    questionScreen.style.display = "none";
    scoreScreen.style.display = "none";

    menuScreen.style.display = "flex";
    menuScreen.style.transition = "none";
    menuScreen.style.transform = "translateX(100%)";

    menuScreen.offsetHeight;

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
