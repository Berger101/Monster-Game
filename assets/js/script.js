/**
 * Declare constants for DOM elements
 * and possible choices
 */
let buttons = document.getElementsByTagName("button");

/**
 * Add event listener to all the buttons
 */
for (let button of buttons) {
  button.addEventListener("click", function () {
    let playerChoice = this.getAttribute("data-choice");
    console.log(playerChoice);
    //playGame(playerChoice);
  });
}