const menuScreen = document.querySelector(".menu__screen");
const questionScreen = document.querySelector(".question__screen");
const scoreScreen = document.querySelector(".score__screen");
const catBtns = document.querySelectorAll(".category__btn");
const answerBtn = document.querySelector(".submit__answer");
const playBtn = document.querySelector(".play__again");
const main = document.querySelector("main");

// Scroll effect
catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    menuScreen.style.transform = "translateX(-100%)";
    questionScreen.style.transform = "translateX(-100%)";
    scoreScreen.style.transform = "translateX(-100%)";
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  });
});

answerBtn.addEventListener("click", () => {
  menuScreen.style.transform = "translateX(-200%)";
  questionScreen.style.transform = "translateX(-200%)";
  scoreScreen.style.transform = "translateX(-200%)";
  window.scrollTo({
    top: 0,
    behavior: "smooth", // You can use 'auto' for instant scrolling
  });
});

playBtn.addEventListener("click", () => {
  questionScreen.style.display = "none";
  scoreScreen.style.display = "none";

  menuScreen.style.display = "block";
  menuScreen.style.transition = "none";
  menuScreen.style.transform = "translateX(100%)";

  menuScreen.offsetHeight;

  menuScreen.style.transition = ".5s all";
  menuScreen.style.transform = "translateX(0)";

  questionScreen.style.transform = "translateX(0)";
  scoreScreen.style.transform = "translateX(0)";
  questionScreen.style.display = "flex";
  scoreScreen.style.display = "flex";
  window.scrollTo({
    top: 0,
    behavior: "smooth", // You can use 'auto' for instant scrolling
  });
});
