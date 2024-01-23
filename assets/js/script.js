/**
 * Declare constants for DOM elements
 * and possible choices
 */
const buttons = document.getElementsByTagName("button");
const healthbarValuePlayer = document.querySelector('.healthbarValuePlayer');
const healthbarValueMonster = document.querySelector('.healthbarValueMonster');
const disableSpecialAttack = document.querySelector('.disableSpecialAttack');
const disableHealPlayer = document.querySelector('.disableHealPlayer');
const disable = document.querySelectorAll('.disable');
let playerHealth = 100;
let monsterHealth = 100;
let currentRound = 0;
let roundCounter = 0;
let winner = null;

/**
 * Puts in a random value for damage or heal
 */
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function for who wins the game
 */
function winGame() {
  if (playerHealth <= 0 && monsterHealth <= 0) {
    winner = "draw";
    playerHealth = 0;
    monsterHealth = 0;
    healthbarValuePlayer.style.width = '0%';
    healthbarValueMonster.style.width = '0%';
    disable.disabled = true;
    console.log("It's a draw!");
  } 
  else if (playerHealth <= 0) {
    winner = "monster";
    playerHealth = 0;
    healthbarValuePlayer.style.width = '0%';
    disable.disabled = true;
    console.log("Monster wins!");
  }
  else if (monsterHealth <= 0) {
    winner = "player";
    monsterHealth = 0;
    healthbarValueMonster.style.width = '0%';
    disable.disabled = true;
    console.log("Player wins!");
  }
}
winGame();

/**
 * function for when the player can or cannot use special attack button
 */
function mayUseSpecialAttack() {
  // currentRound reset
  if (currentRound === 4) {
    currentRound = 1;
    disableSpecialAttack.disabled = true;
  }
  else if (currentRound === 3) {
    disableSpecialAttack.disabled = false;
  }
  else if (currentRound != 3) {
    disableSpecialAttack.disabled = true;
  }
}
mayUseSpecialAttack();

/**
 * function for when the player can or cannot use heal player button
 */
function mayUseHealPlayer() {
  // currentRound reset
  if (roundCounter === 3) {
    roundCounter = 1;
    disableHealPlayer.disabled = true;
  }
  else if (roundCounter === 2) {
    disableHealPlayer.disabled = false;
  }
  else if (roundCounter != 2) {
    disableHealPlayer.disabled = true;
  }
}
mayUseHealPlayer();

/**
 * Adding event listener to all the buttons
 */
for (let button of buttons) {
  button.addEventListener("click", function () {
    let playerChoice = this.getAttribute("data-choice");
    console.log(playerChoice);

      // Start new game
      if (this.getAttribute("data-choice") === "startNewGame") {
        playerHealth = 100;
        monsterHealth = 100;
        currentRound = 0;
        roundCounter = 0;
        winner = null;
        healthbarValuePlayer.style.width = '100%';
        healthbarValueMonster.style.width = '100%';
        mayUseSpecialAttack();
        mayUseHealPlayer();
        console.clear();
        console.log("New game started");
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
      }

      // Surrender
      if (this.getAttribute("data-choice") === "surrender") {
        playerHealth = 100;
        monsterHealth = 100;
        currentRound = 0;
        roundCounter = 0;
        winner = null;
        healthbarValuePlayer.style.width = '100%';
        healthbarValueMonster.style.width = '100%';
        mayUseSpecialAttack();
        mayUseHealPlayer();
        console.clear();
        console.log("You surrendered!");
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
      }

      // player attacks
      if (this.getAttribute("data-choice") === "attackMonster") {
        let attackValue = getRandomValue(5, 12);
        monsterHealth -= attackValue;
        attackPlayer();
        healthbarValuePlayer.style.width = playerHealth + "%";
        healthbarValueMonster.style.width = monsterHealth + "%";
        currentRound++;
        roundCounter++;
        mayUseSpecialAttack();
        mayUseHealPlayer();
        winGame();
        console.log("player attack: " + attackValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
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
          roundCounter++;
          mayUseSpecialAttack();
          mayUseHealPlayer();
          winGame();
          console.log("player attack: " + attackValue);
          console.log("player health: " + playerHealth);
          console.log("monster health: " + monsterHealth);
          console.log("current round: " + currentRound);
          console.log("round counter: " + roundCounter);
        }
      }

      // Heal player
      if (this.getAttribute("data-choice") === "healPlayer") {

        let healValue = getRandomValue(8, 20);

        if (playerHealth + healValue >= 100) {
          playerHealth = 100;
          healthbarValueMonster.style.width = '100%';
        } else {
          playerHealth += healValue;
        }
        attackPlayer();
        healthbarValuePlayer.style.width = playerHealth + "%";
        healthbarValueMonster.style.width = monsterHealth + "%";
        currentRound++;
        roundCounter = 0;
        mayUseSpecialAttack();
        mayUseHealPlayer();
        winGame();
        console.log("player heal: " + healValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
      }
  });
}

/**
 * Function for attacking the player each time an action is made
 */
function attackPlayer() {
  let attackValue = getRandomValue(8, 15);
  playerHealth -= attackValue;
  console.log("monster attack: " + attackValue);
}