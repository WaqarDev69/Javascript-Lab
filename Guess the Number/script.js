//selectors
const secretBox = document.querySelector('.secret-number-box')
const againBtn = document.querySelector('.again-btn')
const title = document.querySelector('.game-title')
const inputNumber = document.querySelector('.input-number')
const checkBtn = document.querySelector('.check-btn')
const message = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highScoreField = document.querySelector('.highscore')
const gameContainer = document.querySelector('.game-container')



//event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkBtn.addEventListener('click', check);
    againBtn.addEventListener('click', again);
});



//Logic
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = sessionStorage.getItem('highscore') ? Number(sessionStorage.getItem('highscore')) : 0;
highScoreField.textContent = '🏅 Highscore: ' + highscore;
console.log(secretNumber);

function checkWinner() {
    title.textContent='You Win The Game 🎉';
    message.textContent = 'Correct Number ✅'
    gameContainer.style.backgroundColor = 'green'
    message.style.color='white'
        secretBox.textContent = secretNumber 
        checkBtn.disabled = true;
}
function storeData() {
    if (score > highscore) {
        highscore = score;
        sessionStorage.setItem('highscore', highscore);
        highScoreField.textContent = '🏅 Highscore: ' + highscore;
    }  
}
function check() {
    let inputNumberValue=Number(inputNumber.value)
   if (!inputNumberValue || inputNumberValue > 20) {
    message.textContent='Enter a Valid Number';
    message.style.color='red'
    return
} else if (secretNumber === inputNumberValue){
            checkWinner()
         storeData()

    } else if (secretNumber !== inputNumberValue){
        score--;
        scoreField.textContent= '💯 Score : '+ score;
        if(score < 1){
            title.textContent='You Loose The Game 💀';
             gameContainer.style.backgroundColor = 'red'
             checkBtn.disabled = true;
        } if (inputNumberValue > secretNumber) {
            message.textContent='📈 too high';
            message.style.color='white'
        } else if (inputNumberValue < secretNumber) {                
            message.textContent='📉 too low';
            message.style.color='white';
        }
    }

}
function again() {
    location.reload()
}

