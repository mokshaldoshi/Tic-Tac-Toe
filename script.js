let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset-btn");
let newbtn = document.querySelector(".new-btn");
let clickSound = document.querySelector("#sound");
let container = document.querySelector(".msg-container");
let msg = document.querySelector("#win-msg");
let winSound = document.querySelector("#win-sound");

let turnX = true;
let draw =  0;  

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnX = true;
    draw = 0;
    enableButton();
    container.classList.add("hide");
}

const drawGame = () => {
    msg.innerText = "Game is drawn";
    container.classList.remove("hide");
    disableButton();
}

const disableButton = () => {
    btns.forEach((btn) => {
        btn.disabled = true;
    })
}

const enableButton = () => {
    btns.forEach((btn) => {
        btn.disabled = false;
        btn.innerText = "";
        btn.style.backgroundColor = "";
        btn.style.color = "";
    })
}

const showWinner = (Winner) => {
    msg.innerText = `Winner is ${Winner}`;
    container.classList.remove("hide");
    disableButton();
    showFireworks();
}

const checkWinner = () => {

    for(let pattern of winPatterns){
        
        let p1 = btns[pattern[0]].innerText;
        let p2 = btns[pattern[1]].innerText;
        let p3 = btns[pattern[2]].innerText;

    if(p1 != "" && p2 != "" && p3 != ""){
        if(p1 === p2 && p2 === p3){
                showWinner(p1);
                return true;
            }
        }
    }
};

btns.forEach((btn) => {
    btn.addEventListener("click" , () => {
        clickSound.currentTime = 0;
        clickSound.play();
        if(turnX){
            btn.innerText = "X";
            btn.style.backgroundColor = "#3185FC";
            turnX = false;
        }
        else{
            btn.innerText = "O";
            btn.style.color = "#E84855";
            turnX = true;
        }
        btn.disabled =  true;
        draw++;

        let isWin = checkWinner();
        if(draw === 9 && !isWin) drawGame();
    });
});

const showFireworks = () => {
  confetti({
    particleCount: 200,
    spread: 150,
    origin: {
      y: 0.5,
    },
  });
  winSound.currentTime = 0;
  winSound.play();
}

newbtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);