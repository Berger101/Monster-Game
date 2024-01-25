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
  console.log(`${monsterObj.name} attacked! Player health reduced by: ${attackValue}`);
}

function healMonster(monsterObj, healAmount) {
  monsterHealth += healAmount;
  console.log(`${monsterObj.name} healed! Monster health increased by: ${healAmount}`);
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
        healMonster(this, 2); // Add 2 health points if it's the current monster (monster4)
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

  // Display details of the selected random monster
  console.log(`Randomly selected monster: ${currentMonster.name}`);
  console.log(`Monster Health: ${currentMonster.health}`);
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
        playerHealth = 100;
        monsterHealth = 100;
        currentRound = 0;
        roundCounter = 0;
        winner = null;
        healthbarValuePlayer.style.width = "100%";
        healthbarValueMonster.style.width = "100%";
        mayUseSpecialAttack();
        mayUseHealPlayer();
        displayRandomMonster();
        console.clear();
        console.log("New game started");
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
      }

      // Surrender
      if (playerChoice === "surrender") {
        playerHealth = 100;
        monsterHealth = 100;
        currentRound = 0;
        roundCounter = 0;
        winner = null;
        healthbarValuePlayer.style.width = "100%";
        healthbarValueMonster.style.width = "100%";
        mayUseSpecialAttack();
        mayUseHealPlayer();
        displayRandomMonster();
        console.clear();
        console.log("You surrendered!");
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
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
        console.log("player attack: " + attackValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
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
          console.log("player attack: " + attackValue);
          console.log("player health: " + playerHealth);
          console.log("monster health: " + monsterHealth);
          console.log("current round: " + currentRound);
          console.log("round counter: " + roundCounter);
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
        console.log("player heal: " + healValue);
        console.log("player health: " + playerHealth);
        console.log("monster health: " + monsterHealth);
        console.log("current round: " + currentRound);
        console.log("round counter: " + roundCounter);
      }
  });
}