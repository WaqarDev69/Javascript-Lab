//selectors
const input = document.getElementById("bet-amount");
const lowRiskBtn = document.getElementById("low-risk");
const mediumRiskBtn = document.getElementById("med-risk");
const highRiskBtn = document.getElementById("high-risk");
const stopBtn = document.getElementById("stop-btn");
const amount = document.querySelector(".ammount");

//event listners
lowRiskBtn.addEventListener("click", resultCalculator);

//Global Variables
let curramount = 1000;
amount.textContent = curramount;

function checkWinOrLoss() {
if (curramount >= 2000) {
alert("You win the game");
lowRiskBtn.disabled = true;
} else if (curramount <= 0) {
alert("you loose the Game");
lowRiskBtn.disabled = true;
}
}

function resultCalculator() {
let inputValue = Number(input.value);
const randomValue = (Math.random() \* (1.1 - 0.9) + 0.9).toFixed(1);

if (!inputValue || Number(inputValue) < 1) {
alert("Enter a Valid Input");
} else {
let result = Math.floor(Number(inputValue \* randomValue));

    //calculating the loss and win ammount
    if (randomValue < 1) {
      curramount -= result;
      console.log("less then one", curramount);
      amount.style.color = "red";
      amount.textContent = curramount;
    } else if (randomValue >= 1) {
      console.log("greator then one", curramount);
      curramount += result;
      amount.style.color = "#2ecc71";
      amount.textContent = curramount;
    }

}

//checking the winning and loosing conditions
checkWinOrLoss();
}
