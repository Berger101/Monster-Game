/**
 * Declare constants for DOM elements
 * and possible choices
 */
const buttons = document.getElementsByTagName("button");
const healthbarValuePlayer = document.querySelector(".healthbarValuePlayer");
const healthbarValueMonster = document.querySelector(".healthbarValueMonster");
const disableSpecialAttack = document.querySelector(".disableSpecialAttack");
const disableHealPlayer = document.querySelector(".disableHealPlayer");
const disable = document.querySelectorAll(".disable");
let playerHealth = 100;
let monsterHealth = 100;
let currentRound = 0;
let roundCounter = 0;
let winner = null;

/**
 * Function for starting a new game
 */
function resetGame() {

  // Reseting all the variables
  playerHealth = 100;
  monsterHealth = 100;
  currentRound = 0;
  roundCounter = 0;
  winner = null;
  healthbarValuePlayer.style.width = "100%";
  healthbarValueMonster.style.width = "100%";

  // Calling functions
  mayUseSpecialAttack();
  mayUseHealPlayer();
  displayRandomMonster();

  // Console log message
  console.clear();
  console.log(`You fight: ${currentMonster.name}`);
  console.log("player health: " + playerHealth);
  console.log(`${currentMonster.name} Health: ${monsterHealth}`);
  console.log("current round: " + currentRound);
  console.log("round counter: " + roundCounter);

  // Message in logContainer
  clearLog();
  logMessage(`You fight: ${currentMonster.name}`);
  logMessage("Player Health: " + playerHealth);
  logMessage(`${currentMonster.name} Health: ${monsterHealth}`);
}

/**
 * Puts in a random value for damage or heal
 */
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Function for attacking the player each time an action is made
 */
function attackPlayer(monsterObj, attackMin, attackMax) {
  let attackValue = getRandomValue(attackMin, attackMax);
  playerHealth -= attackValue;

  console.log(`${monsterObj.name} Attacked: ${attackValue}`);

  logMessage(`${monsterObj.name} Attacked: ${attackValue}`);
}

/**
 * Function for healing vampire monster everytime monster attacks
 */
function healMonster(monsterObj, healAmount) {
  monsterHealth += healAmount;

  console.log(`${monsterObj.name} Healed: ${healAmount}`);

  logMessage(`${monsterObj.name} Healed: ${healAmount}`);
}

// Creating monsters object
let monsters = {
  monster1: {
    name: 'Big Monster',
    health: 100,
    image: 'assets/images/monster.png',
    attackMin: 8,
    attackMax: 15,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster2: {
    name: 'Fire Demon',
    health: 80,
    image: 'assets/images/firedemon.png',
    attackMin: 11,
    attackMax: 17,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster3: {
    name: 'Ghost',
    health: 100,
    image: 'assets/images/ghost.png',
    attackMin: 7,
    attackMax: 12,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster4: {
    name: 'Vampire',
    health: 100,
    image: 'assets/images/vampire.png',
    attackMin: 10,
    attackMax: 13,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);

      if (this === currentMonster) {
        healMonster(this, 2);
      }
    }
  },
};

// Declaring currentMonster to be accessible globaly
let currentMonster;

/**
 * Function for displaying random monster everytime browser is reloaded or a new game starts
 */
function displayRandomMonster() {
  // Select a random monster when browser loads
  const monsterKeys = Object.keys(monsters);
  const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
  currentMonster = monsters[randomMonsterKey];

  if (currentMonster === monsters.monster2) {
    monsterHealth = 80;
    healthbarValueMonster.style.width = "80%";
  }
  
  // Display details of the selected random monster
  document.getElementById('monsterName').textContent = `${currentMonster.name}`;
  document.getElementById('monsterImage').src = currentMonster.image;

  // Console log message
  console.log(`You fight: ${currentMonster.name}`);
  console.log("Player Health: " + playerHealth);
  console.log(`${currentMonster.name} Health: ${monsterHealth}`);
  console.log("current round: " + currentRound);
  console.log("round counter: " + roundCounter);
  
  // Message in logContainer
  logMessage(`You fight: ${currentMonster.name}`);
  logMessage("Player Health: " + playerHealth);
  logMessage(`${currentMonster.name} Health: ${monsterHealth}`);
}
displayRandomMonster();

/**
 * Function for who wins the game
 */
function winGame() {
  if (playerHealth <= 0 && monsterHealth <= 0) {
    winner = "draw";
    playerHealth = 0;
    monsterHealth = 0;
    healthbarValuePlayer.style.width = "0%";
    healthbarValueMonster.style.width = "0%";
    disable.disabled = true;
    console.log("It's a draw!");
  } 
  else if (playerHealth <= 0) {
    winner = "monster";
    playerHealth = 0;
    healthbarValuePlayer.style.width = "0%";
    disable.disabled = true;
    console.log("Monster wins!");
  }
  else if (monsterHealth <= 0) {
    winner = "player";
    monsterHealth = 0;
    healthbarValueMonster.style.width = "0%";
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
      if (playerChoice === "startNewGame") {
        resetGame();
      }

      // Surrender
      if (playerChoice === "surrender") {     
        resetGame();
      }

      // player attacks
      if (playerChoice === "attackMonster") {
        let attackValue = getRandomValue(5, 12);
        monsterHealth -= attackValue;
        currentMonster.performAttack();
        healthbarValuePlayer.style.width = playerHealth + "%";
        healthbarValueMonster.style.width = monsterHealth + "%";
        currentRound++;
        roundCounter++;
        mayUseSpecialAttack();
        mayUseHealPlayer();
        winGame();

        // Console log message
        console.log("player attack: " + attackValue);
        console.log("player health: " + playerHealth);
        console.log(`${currentMonster.name} Health: ${monsterHealth}`);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);

        // Message in logContainer
        logMessage("Player Attack: " + attackValue);
        logMessage("Player Health: " + playerHealth);
        logMessage(`${currentMonster.name} Health: ${monsterHealth}`);
      }

      // Special attack
      if (playerChoice === "specialAttack") {

        if (currentRound === 3) {
          let attackValue = getRandomValue(10, 25);
          monsterHealth -= attackValue;
          currentMonster.performAttack();
          healthbarValuePlayer.style.width = playerHealth + "%";
          healthbarValueMonster.style.width = monsterHealth + "%";
          currentRound = 0;
          roundCounter++;
          mayUseSpecialAttack();
          mayUseHealPlayer();
          winGame();

          // Console log message
          console.log("player Special Attack: " + attackValue);
          console.log("player health: " + playerHealth);
          console.log(`${currentMonster.name} Health: ${monsterHealth}`);
          console.log("current round: " + currentRound);
          console.log("round counter: " + roundCounter);

          // Message in logContainer
          logMessage("Player Special Attack: " + attackValue);
          logMessage("Player Health: " + playerHealth);
          logMessage(`${currentMonster.name} Health: ${monsterHealth}`);
        }
      }

      // Heal player
      if (playerChoice === "healPlayer") {

        let healValue = getRandomValue(8, 20);

        if (playerHealth + healValue >= 100) {
          playerHealth = 100;
          healthbarValueMonster.style.width = "100%";
        } else {
          playerHealth += healValue;
        }
        currentMonster.performAttack();
        healthbarValuePlayer.style.width = playerHealth + "%";
        healthbarValueMonster.style.width = monsterHealth + "%";
        currentRound++;
        roundCounter = 0;
        mayUseSpecialAttack();
        mayUseHealPlayer();
        winGame();

        // Console log message
        console.log("player heal: " + healValue);
        console.log("player health: " + playerHealth);
        console.log(`${currentMonster.name} Health: ${monsterHealth}`);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);

        // Message in logContainer
        logMessage("Player Heal: " + healValue);
        logMessage("Player Health: " + playerHealth);
        logMessage(`${currentMonster.name} Health: ${monsterHealth}`);
      }
  });
}

/**
 * Function for logging the message to the browser
 */
function logMessage(message) {
  
  const logDiv = document.createElement('div');
  logDiv.textContent = message;

  document.getElementById('logContainer').appendChild(logDiv);
}

/**
 * Function for clearing the log everytime new game is commenced
 */
function clearLog() {
  document.getElementById('logContainer').innerHTML = '';
}