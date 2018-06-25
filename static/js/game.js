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
  const title = document.createElement("p");
  const scoreContainer = document.createElement("div");
  const scoreText = document.createElement("span");
  const scoreNumber = document.createElement("span");
  const scoreInput = document.createElement("input");
  const btn = document.createElement("button");

  // Setup classes for elements
  player.classList.add("player");
  title.classList.add("playerTitle");
  scoreContainer.classList.add("currentScore");
  btn.classList.add("btn");

  // Now for the text values for the elements
  title.innerHTML = playerName;
  scoreText.innerHTML = "Score: ";
  scoreNumber.innerHTML = 0;
  btn.innerHTML = "Submit";

  // Link the button's ID, which is how the increment score func accesses
  // the current score
  scoreNumber.id = playerName + "-score";
  scoreInput.id = playerName + "-input";
  btn.id = playerName + "-btn";

  // Specifies input type
  scoreInput.type = "number";

  // Build scoreContainer
  scoreContainer.appendChild(scoreText);
  scoreContainer.appendChild(scoreNumber);

  // Combine all the individual elements
  player.appendChild(title);
  player.appendChild(scoreContainer);
  player.appendChild(scoreInput);
  player.appendChild(btn);

  // Adding event listener
  btn.addEventListener("click", function() {incrementScore(playerName)});

  return player;
}

/**
 * Increments player score.
 * @param playerName {string}
 */
function incrementScore(playerName) {
  const score =  document.getElementById(playerName + "-score");
  const inputValue = document.getElementById(playerName + "-input");
  if (Number(inputValue.value)) {
    score.innerHTML = Number(score.innerHTML) + Number(inputValue.value);
    inputValue.value = '';
  }
}

/**
 * Builds the game-board upon pressing the start button.
 */
function start() {
  const playerContainer = document.getElementById("game-container");
  const resetButton = document.getElementById("resetButton");
  const startButton = document.getElementById("start-button");
  const players = [];
  let i;
  let name;

  startButton.onclick = function () {
    const numPlayers = Number(document.getElementById("numberSelector").value);
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
      playerContainer.appendChild(drawPlayer(players[i]));
    }

    // Un-hide the reset button.
    resetButton.style.display = "block";
    // Clear out player list to prevent old players from being added in subsequent games
    while (players[0]) {
      players.pop(0)
    }
  };

  resetButton.onclick = function () {
    const game = document.getElementById("game-container");
    const selector = document.getElementById("numberSelector");
    selector.value = "2";
    removeChildren(game);
    resetButton.style.display = "none";
    toggleElementVisibility("starter-container")
  };
}

window.onload = function () {
  start();
};
