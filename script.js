let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const compMovePara = document.querySelector("#comp-move");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
  checkGameOver();
};

const checkGameOver = () => {
  if (userScore === 10 || compScore === 10) {
    if (userScore === 10) {
      msg.innerText = "🎉 You won the game!";
      msg.style.backgroundColor = "green";
    } else {
      msg.innerText = "😢 Computer won the game!";
      msg.style.backgroundColor = "red";
    }
    choices.forEach(choice => choice.style.pointerEvents = "none"); // disable choices
    resetBtn.style.display = "block"; // show reset button
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  compMovePara.innerText = `Computer chose: ${compChoice}`;

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  compMovePara.innerText = "Computer chose: -";
  choices.forEach(choice => choice.style.pointerEvents = "auto"); // enable choices again
  resetBtn.style.display = "none";
});
