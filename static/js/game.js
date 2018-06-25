"use strict";

/**
 * Toggles element between shown and hidden, based upon current display property
 * @param elementId {string}
 */
function toggleElementVisibility (elementId) {
  const element = document.getElementById(elementId);
  const display = element.style.display;
  if (display === "none") {
    element.style.display = "block";
  }
  else {
    element.style.display = "none";
  }
}

/**
 * Removes all child nodes of element
 * @param element {HTMLElement}
 */
function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Given a player's name, builds a div, attaches event listener to button, returns div.
 * @param playerName {string} name of player
 * @returns {HTMLDivElement}
 */
function drawPlayer(playerName) {
  const player = document.createElement("div");
  const scoreContainer = document.createElement("div");
  const name = document.createElement("span");
  const scoreNumber = document.createElement("span");
  const scoreInput = document.createElement("input");
  const btn = document.createElement("button");

  // Setup classes for elements
  player.classList.add("player");
  name.classList.add("player-title");
  scoreContainer.classList.add("current-score");
  scoreNumber.classList.add("score");
  btn.classList.add("btn");

  // Now for the text values for the elements
  name.innerHTML = playerName + ": ";
  scoreNumber.innerHTML = 0;
  btn.innerHTML = "Add";

  // Link the button's ID, which is how the increment score func accesses
  // the current score
  scoreNumber.id = playerName + "-score";
  scoreInput.id = playerName + "-input";
  btn.id = playerName + "-btn";

  // Specifies input type
  scoreInput.type = "number";

  // Build scoreContainer
  scoreContainer.appendChild(name);
  scoreContainer.appendChild(scoreNumber);

  // Combine all the individual elements
  player.appendChild(scoreContainer);
  player.appendChild(scoreInput);
  player.appendChild(btn);

  // Adding event listener
  btn.addEventListener("click", function() {incrementScore(playerName)});

  return player;
}

/**
 * Gets input box value and increments score by that value, then marks current winner(s)
 * @param playerName {string}
 */
function incrementScore(playerName) {
  const score =  document.getElementById(playerName + "-score");
  const currentScore = Number(score.innerHTML);
  const inputValue = document.getElementById(playerName + "-input");
  const inputScore = Number(inputValue.value);
  if (inputScore) {
    // change score's display value to currentScore + inputScore & clear out input box
    score.innerHTML = currentScore + inputScore;
    inputValue.value = '';
    markWinner();
  }
}

/**
 * Marks scores that are currently winner (Ties are allowed!)
 */
function markWinner() {
  const scores = document.getElementsByClassName("score");
  const highScore = getHighScore(scores);
  let i;
  let score;
  for (i=0;i<scores.length;i++) {
    score = Number(scores[i].innerHTML);
    if (score === highScore) {
      scores[i].classList.add("winner");
    } else {
      scores[i].classList.remove("winner");
    }
  }
}

/**
 * Returns current high score
 * @param scores {array} of {HTMLElement}s
 * @returns {number}
 */
function getHighScore(scores) {
  const scoreList = [];
  let i;

  for (i=0;i<scores.length;i++){
    scoreList.push(Number(scores[i].innerHTML));
  }
  return Math.max(...scoreList);
}

/**
 * Main function
 * Creates listeners for start and reset buttons, then links those buttons to
 * anonymous functions that setup game board or reset the board
 */
function start() {
  const game = document.getElementById("game-container");
  const resetButton = document.getElementById("reset-button");
  const startButton = document.getElementById("start-button");
  const selector = document.getElementById("number-selector");
  const players = [];
  let i;
  let name;

  startButton.onclick = function () {
    const numPlayers = Number(document.getElementById("number-selector").value);
    toggleElementVisibility("starter-container");
    for (i=0;i<numPlayers;i++) {
      name = prompt(`Enter Player ${i + 1}'s name: `);
      // If a player's name isn't input, un-hide starter-container, alert user
      if (!name) {
        alert("You must enter a name for each player");
        toggleElementVisibility("starter-container");
        return;
      } else {
        players.push(name);
      }
    }
    // Draw each player container
    for (i=0;i<players.length;i++) {
      game.appendChild(drawPlayer(players[i]));
    }
    // Un-hide the reset button.
    resetButton.style.display = "block";
    // Clear out player array to prevent old players from being added in subsequent games
    while (players[0]) {
      players.pop(0)
    }
  };

  resetButton.onclick = function () {
    selector.value = "2";
    removeChildren(game);
    resetButton.style.display = "none";
    toggleElementVisibility("starter-container")
  };
}

window.onload = function () {
  start();
};
