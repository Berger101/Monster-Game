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

// Score tracker
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
  console.log("Player Health: " + playerHealth);
  console.log(`${currentMonster.name} Health: ${monsterHealth}`);
  console.log("Current Round: " + currentRound);
  console.log("Round Counter: " + roundCounter);

  // Message in logContainer
  clearLog();
  logMessage(`You fight: ${currentMonster.name}`);
  logMessage("Player Health: " + playerHealth, "blue");
  logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
}

/**
 * Arrow function that puts in a random value for damage or heal
 */
const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Arrow function for attacking the player each time an action is made
 */
const attackPlayer = (monsterObj, attackMin, attackMax) => {
  let attackValue = getRandomValue(attackMin, attackMax);
  playerHealth -= attackValue;

  console.log(`${monsterObj.name} Attacked: ${attackValue}`);

  logMessage(`${monsterObj.name} Attacked: ${attackValue}`, "red");
};

/**
 * Arrow function for healing vampire monster everytime monster attacks
 */
const healMonster = (monsterObj, healAmount) => {
  monsterHealth += healAmount;

  console.log(`${monsterObj.name} Heal: ${healAmount}`);

  logMessage(`${monsterObj.name} Heal: ${healAmount}`, "red");
};

// Creating monsters object
let monsters = {
  monster1: {
    name: 'Big Monster',
    image: 'assets/images/monster.png',
    attackMin: 8,
    attackMax: 15,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster2: {
    name: 'Fire Demon',
    image: 'assets/images/firedemon.png',
    attackMin: 11,
    attackMax: 17,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster3: {
    name: 'Ghost',
    image: 'assets/images/ghost.png',
    attackMin: 7,
    attackMax: 12,

    performAttack: function() {
      attackPlayer(this, this.attackMin, this.attackMax);
    }
  },

  monster4: {
    name: 'Vampire',
    image: 'assets/images/vampire.png',
    attackMin: 8,
    attackMax: 12,

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
  // try-catch block to handle errors
  try {
    const monsterKeys = Object.keys(monsters);
    const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
    currentMonster = monsters[randomMonsterKey];
  } catch (error) {
    console.error("An error occurred while selecting a random monster:", error);

    // Set currentMonster to null in case of an error
    currentMonster = null;
  }

  // Ternary operator for fire demon monsters health
  (currentMonster === monsters.monster2)
  ? (monsterHealth = 80, healthbarValueMonster.style.width = "80%")
  : null;
  
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
  logMessage("Player Health: " + playerHealth, "blue");
  logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
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

    // Loop through and disable all the buttons
    for (let i = 0; i < disable.length; i++) {
      disable[i].disabled = true;
    }

    console.log("It's a draw!");
    logMessage("It's a draw!");
  } 
  else if (playerHealth <= 0) {
    winner = "monster";
    playerHealth = 0;
    healthbarValuePlayer.style.width = "0%";

    // Loop through and disable all the buttons
    for (let i = 0; i < disable.length; i++) {
      disable[i].disabled = true;
    }

    console.log("Monster wins!");
    logMessage("Monster wins!", "red");
  }
  else if (monsterHealth <= 0) {
    winner = "player";
    monsterHealth = 0;
    healthbarValueMonster.style.width = "0%";

    // Loop through and disable all the buttons
    for (let i = 0; i < disable.length; i++) {
      disable[i].disabled = true;
    }

    console.log("Player wins!");
    logMessage("Player wins!", "blue");
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
 * Function for not letting health go under 0 in log message
 * and displaying health in log message.
 * To display winning message at the end of log message
 */
function checkWinMessage() {

  if (playerHealth <= 0 && monsterHealth <= 0) {
    playerHealth = 0;
    monsterHealth = 0;

    logMessage("Player Health: " + playerHealth, "blue");
    logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
  }
  else if (playerHealth <= 0) {
    playerHealth = 0;
    
    logMessage("Player Health: " + playerHealth, "blue");
    logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
  } 
  else if (monsterHealth <= 0) {
    monsterHealth = 0;

    logMessage("Player Health: " + playerHealth, "blue");
    logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
  }
  else {
    logMessage("Player Health: " + playerHealth, "blue");
    logMessage(`${currentMonster.name} Health: ${monsterHealth}`, "red");
  }
}

/**
 * Function for starting a new game
 */
function startNewGame() {
  try {
    // Loop through and enable all the buttons
    for (let i = 0; i < disable.length; i++) {
      disable[i].disabled = false;
    }

    resetGame();
  } catch (error) {
    console.error("An error occurred during the 'startNewGame' function:", error);
  }
}

/**
 * Function for surrender
 */
function surrender() {
  try {
    resetGame();
  } catch (error) {
    console.error("An error occurred during the 'surrender' function:", error);
  }
}

/**
 * Function for when player attacks
 */
function playerAttack() {
  try {
    let attackValue = getRandomValue(5, 12);
    monsterHealth -= attackValue;
    currentMonster.performAttack();
    healthbarValuePlayer.style.width = playerHealth + "%";
    healthbarValueMonster.style.width = monsterHealth + "%";
    currentRound++;
    roundCounter++;
    mayUseSpecialAttack();
    mayUseHealPlayer();

    // Console log message
    console.log("Player Attack: " + attackValue);
    console.log("Player Health: " + playerHealth);
    console.log(`${currentMonster.name} Health: ${monsterHealth}`);
    console.log("Current Round: " + currentRound);
    console.log("Round Counter: " + roundCounter);

    // Message in logContainer
    logMessage("Player Attack: " + attackValue, "blue");

    checkWinMessage();

    winGame();
  } catch (error) {
    console.error("An error occurred during the 'playerAttack' function:", error);
  }
}

/**
 * Function for when player use special attack
 */
function playerSpecialAttack() {

  try {
    let attackValue = getRandomValue(10, 25);
    monsterHealth -= attackValue;
    currentMonster.performAttack();
    healthbarValuePlayer.style.width = playerHealth + "%";
    healthbarValueMonster.style.width = monsterHealth + "%";
    currentRound = 0;
    roundCounter++;
    mayUseSpecialAttack();
    mayUseHealPlayer();

    // Console log message
    console.log("Player Special Attack: " + attackValue);
    console.log("Player Health: " + playerHealth);
    console.log(`${currentMonster.name} Health: ${monsterHealth}`);
    console.log("Current Round: " + currentRound);
    console.log("Round Counter: " + roundCounter);

    // Message in logContainer
    logMessage("Player Special Attack: " + attackValue, "purple");
    
    checkWinMessage();

    winGame();
  } catch (error) {
    console.error("An error occurred during the 'playerSpecialAttack' function:", error);
  }
}

/**
 * Function for when player heal
 */
function playerHeal() {

  try {
    let healValue = getRandomValue(8, 20);
    
    // Ternary operator, simpel function // arrow function
    playerHealth = (playerHealth + healValue >= 100)
    ? (healthbarValueMonster.style.width = "100%", 100)
    : (playerHealth + healValue);
    
    currentMonster.performAttack();
    healthbarValuePlayer.style.width = playerHealth + "%";
    healthbarValueMonster.style.width = monsterHealth + "%";
    currentRound++;
    roundCounter = 0;
    mayUseSpecialAttack();
    mayUseHealPlayer();

    // Console log message
    console.log("Player Heal: " + healValue);
    console.log("Player Health: " + playerHealth);
    console.log(`${currentMonster.name} Health: ${monsterHealth}`);
    console.log("Current Round: " + currentRound);
    console.log("Round Counter: " + roundCounter);

    // Message in logContainer
    logMessage("Player Heal: " + healValue, "green");
    
    checkWinMessage();

    winGame();
  } catch (error) {
    console.error("An error occurred during the 'playerHeal' function:", error);
  }
}

// Adding event listeners to all the buttons
for (let button of buttons) {
  button.addEventListener("click", function () {
    let playerChoice = this.getAttribute("data-choice");
    console.log(playerChoice);
    
    // Switch statement for calling on event listener and it's functions used
    switch (playerChoice) {
      case "startNewGame":
        startNewGame();
        break;
      case "surrender":
        surrender();
        break;
      case "attackMonster":
        playerAttack();
        break;
      case "specialAttack":
        playerSpecialAttack();
        break;
      case "healPlayer":
        playerHeal();
        break;
      default:
        console.warn("Unhandled playerChoice:", playerChoice);
    }
  });
}

/**
 * Function for logging the message to the browser
 */
function logMessage(message, color) {
  
  const logDiv = document.createElement('div');

  logDiv.textContent = message;
  logDiv.style.color = color || 'black';

  document.getElementById('logContainer').appendChild(logDiv);
}

/**
 * Function for clearing the log everytime new game is commenced
 */
function clearLog() {
  document.getElementById('logContainer').innerHTML = '';
}