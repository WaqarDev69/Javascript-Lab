// Selectors
//btns
const lowRiskBtn = document.getElementById("low-risk");
const mediumRiskBtn = document.getElementById("med-risk");
const highRiskBtn = document.getElementById("high-risk");
const stopBtn = document.getElementById("stop-game");

const input = document.getElementById("bet-amount");
const money = document.getElementById("money");
const amount = document.querySelector(".ammount");
const goal = document.querySelector(".goal");
const gameInfo = document.querySelector(".game-info");
const stats = document.querySelector(".stats");
const goalMessage = document.querySelector(".goal-message");
const reload = document.querySelector(".reload");
const betResult = document.querySelector(".bet-result");
const thiefImg = document.querySelector(".thief-img");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const modalAmount = document.querySelector(".modal-amount");

// Global Variables

let yourBalance = 1000;
amount.textContent = yourBalance;

// Event Listeners
lowRiskBtn.addEventListener("click", lowRiskCalc);
mediumRiskBtn.addEventListener("click", mediumRiskCalc);
highRiskBtn.addEventListener("click", highRiskCalc);
reload.addEventListener("click", reloadPage);
stopBtn.addEventListener("click", stopGame);
closeModal.addEventListener("click", stopGame);

function resultCalc(e) {
  if (yourBalance >= 2000) {
    stats.style.display = "none";
    goalMessage.style.display = "block";
    goalMessage.style.color = "rgb(35, 48, 48)";
    gameInfo.style.background = "#2ecc71";
    btnDisabled();
  } else if (yourBalance < 0) {
    stats.style.display = "none";
    goalMessage.style.display = "block";
    goalMessage.style.color = "rgb(255, 0, 0)";
    goalMessage.textContent = "You Have Loose the Game ❌";
    gameInfo.style.background = "rgb(35, 48, 48)";
    btnDisabled();
  } else if (e === "police") {
    stats.style.display = "none";
    goalMessage.style.display = "block";
    thiefImg.style.display = "block";
    goalMessage.style.color = "rgb(255, 0, 0)";
    goalMessage.textContent = "Police Caught you 🚔";
    gameInfo.style.background = "rgb(35, 48, 48)";
    btnDisabled();
  }
}
function btnDisabled() {
  lowRiskBtn.disabled = true;
  mediumRiskBtn.disabled = true;
  highRiskBtn.disabled = true;
}
function stopGame() {
  modal.classList.toggle("show-modal");
  closeModal.classList.toggle("show-modal");
  modalAmount.textContent = `${yourBalance}$`;
  btnDisabled();
}

//reloading Page
function reloadPage() {
  return location.reload();
}

function riskCalc(
  winProbability,
  loseProbability,
  policeProbability,
  multiplierRange
) {
  let inputVal = Number(input.value);

  //validation
  if (inputVal <= 0 || inputVal > yourBalance) {
    alert("Invalid bet amount!");
    return;
  }

  const probability = Math.floor(Math.random() * 100) + 1;
  const randomMultiplier =
    Math.round((Math.random() * multiplierRange) / 0.5) * 0.5;

  console.log("Probability:", probability);

  // Random result generator
  if (probability <= winProbability) {
    let result = inputVal * randomMultiplier;
    yourBalance += result;
    betResult.textContent = `+${result} $`;
    betResult.style.color = "#2ecc71";

    resultCalc();
  } else if (probability <= winProbability + loseProbability) {
    yourBalance -= inputVal;
    betResult.textContent = `-${inputVal} $`;
    betResult.style.color = "red";
    resultCalc();
    console.log("You lose!");
  } else if (
    probability <=
    winProbability + loseProbability + policeProbability
  ) {
    yourBalance = 0;
    resultCalc("police");
    console.log("Police Caught You! You lost everything.");
  }

  // updating the UI
  amount.textContent = yourBalance;
  console.log(yourBalance);

  input.value = "";
}

function lowRiskCalc() {
  riskCalc(79, 20, 1, 2.5); // 80% win, 20% lose, 0% police, max 2.5x multiplier
}

function mediumRiskCalc() {
  riskCalc(50, 30, 10, 5); // 50% win, 30% lose, 20% police, max 5x multiplier
}

function highRiskCalc() {
  riskCalc(30, 50, 20, 10); // 30% win, 40% lose, 30% police, max 10x multiplier
}
