/**
 * Declare constants for DOM elements
 * and possible choices
 */
const buttons = document.getElementsByTagName("button");
const healthbarValuePlayer = document.querySelector('.healthbarValuePlayer');
const healthbarValueMonster = document.querySelector('.healthbarValueMonster');
const disabledButton = document.querySelector('.disabled');
let playerHealth = 100;
let monsterHealth = 100;
let currentRound = 0;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function mayUseSpecialAttack() {
  // currentRound reset
  if (currentRound === 4) {
    currentRound = 0;
  } else if (currentRound === 3) {
    disabledButton.disabled = false;
  }
  else if (currentRound === 0 || currentRound === 1 || currentRound === 2 || currentRound === 4) {
    disabledButton.disabled = true;
  }
}
mayUseSpecialAttack();

/**
 * Add event listener to all the buttons
 */
for (let button of buttons) {
  button.addEventListener("click", function () {
    let playerChoice = this.getAttribute("data-choice");
    console.log(playerChoice);

      // Start new game
      if (this.getAttribute("data-type") === "startNewGame") {
        playerHealth = 100;
        monsterHealth = 100;
        currentRound = 0;
        healthbarValuePlayer.style.width = '100%';
        healthbarValueMonster.style.width = '100%';
        mayUseSpecialAttack();
        console.clear();
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
      }

      // Game data choice
      // player attacks
      if (this.getAttribute("data-choice") === "attackMonster") {
        let attackValue = getRandomValue(5, 12);
        monsterHealth -= attackValue;
        attackPlayer();
        healthbarValuePlayer.style.width = playerHealth + "%";
        healthbarValueMonster.style.width = monsterHealth + "%";
        currentRound++;
        mayUseSpecialAttack();
        console.log("player attack: " + attackValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
      }

      // Special attack
      if (this.getAttribute("data-choice") === "specialAttack") {
        if (currentRound === 3) {
          let attackValue = getRandomValue(10, 25);
          monsterHealth -= attackValue;
          attackPlayer();
          healthbarValuePlayer.style.width = playerHealth + "%";
          healthbarValueMonster.style.width = monsterHealth + "%";
          currentRound = 0;
          mayUseSpecialAttack();
          console.log("player attack: " + attackValue);
          console.log("player health: " + playerHealth);
          console.log("monster health: " + monsterHealth);
          console.log("current round: " + currentRound);
        }
      } 
  });
}



/**
 * Function for attacking the player each time an action is made
 */
function attackPlayer() {
  let attackValue = getRandomValue(8, 15);
  playerHealth -= attackValue;
  console.log("monster attack: " +attackValue);
}