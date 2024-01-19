/**
 * Declare constants for DOM elements
 * and possible choices
 */
const buttons = document.getElementsByTagName("button");
let playerHealth = 100;
let monsterHealth = 100;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Add event listener to all the buttons
 */
for (let button of buttons) {
  button.addEventListener("click", function () {
    let playerChoice = this.getAttribute("data-choice");
    console.log(playerChoice);
    //playGame(playerChoice);

      // Start new game
      if (this.getAttribute("data-type") === "startNewGame") {
        playerHealth = 100;
        monsterHealth = 100;
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
      }

      // Game attacks
      if (this.getAttribute("data-choice") === "attackMonster") {
        let attackValue = getRandomValue(5, 12);
        monsterHealth -= attackValue;
        attackPlayer();
        console.log("player attack: " + attackValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
      }
  });
}

function playGame(playerChoice) {

  
}

function attackPlayer() {
  let attackValue = getRandomValue(8, 15);
  playerHealth -= attackValue;
  console.log("monster attack: " +attackValue);
}