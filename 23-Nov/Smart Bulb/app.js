const loginScreen = document.querySelector(".login-wrapper");
const offScreen = document.querySelector(".ctrl-wrapper");
const loginBtn = document.querySelector(".btn");
const logoutBtn = document.querySelector("#logout");
const lightControlBtn = document.querySelector(".ctrl-btn");
const slider = document.querySelector("#slider");
const bulbs = document.querySelectorAll(".bulb");

loginBtn.addEventListener("click", () => {
  userLoggedIn();
});

function changeBgColor(v) {
  const val = v / 100;
  const container = document.querySelector(".container");
  container.style.backgroundColor = `rgba(255, 255, 255, ${val})`;
}

function showBulbs() {
  bulbs.forEach((bulb) => {
    bulb.style.display = "block";
  });
}

function hideBulbs() {
  bulbs.forEach((bulb) => {
    bulb.style.display = "none";
  });
}

function onLoad() {
  loginScreen.style.display = "block";
  offScreen.style.display = "none";
  slider.style.display = "none";
  logoutBtn.style.display = "none";
  hideBulbs();
}

onLoad();

function userLoggedOut() {
  const logoutBtn = document.querySelector("#logout");
  const container = document.querySelector(".container");
  const btnStatus = document.querySelector("#btn-txt");
  logoutBtn.addEventListener("click", () => {
    console.log("clicked");
    offScreen.style.display = "none";
    logoutBtn.style.display = "none";
    loginScreen.style.display = "block";
    container.style.backgroundColor = "#fff";
    slider.style.display = "none";
    hideBulbs();
    console.log("button status: ", btnStatus.textContent);
    if (btnStatus.textContent === "ON") {
      offButton();
    }
  });
}

userLoggedOut();

function userLoggedIn() {
  const container = document.querySelector(".container");
  loginScreen.style.display = "none";
  offScreen.style.display = "block";
  logoutBtn.style.display = "block";
  container.style.backgroundColor = "#283766";
}

function offButton() {
  const btnText = document.getElementById("btn-txt");
  const circle = document.querySelector(".ctrl-btn div");
  btnText.textContent = "OFF";
  btnText.style.color = "#fff";
  circle.style.backgroundColor = "#1E2B57";
  circle.style.borderColor = "#2e4170";
}

function toggleLights() {
  const btnText = document.getElementById("btn-txt");
  const container = document.querySelector(".container");
  const circle = document.querySelector(".ctrl-btn div");

  if (btnText.textContent === "OFF") {
    btnText.textContent = "ON";
    btnText.style.color = "#000";
    container.style.backgroundColor = "#fff";
    circle.style.backgroundColor = "#FCFCFC";
    circle.style.borderColor = "#E2E2E2";
    slider.style.display = "block";
    showBulbs();
  } else {
    offButton();
    slider.style.display = "none";
    container.style.backgroundColor = "#181028";
    hideBulbs();
  }
}
document.querySelector(".ctrl-btn").addEventListener("click", toggleLights);

$("#slider").roundSlider({
  svgMode: true,
  sliderType: "min-range",
  handleShape: "round",
  handleSize: "25",
  startAngle: 5,
  startValue: 100,
  circleShape: "half-top",
  width: 7,
  radius: 150,
  value: 98,
  editableTooltip: false,
  pathColor: "#EFF1F5",
  borderWidth: 0,
  change: function (event) {
    var value = event.value;
    changeBgColor(value);
  },
});
