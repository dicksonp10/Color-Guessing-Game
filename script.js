const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#581845",
  "#1A5276",
  "#1E8449",
];

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptionsContainer = document.querySelector(".color-options");
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

let targetColor;
let score = 0;

function initGame() {
  gameStatus.textContent = "";

  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  const options = shuffleArray([...colors]).slice(0, 6);
  if (!options.includes(targetColor)) {
    options[Math.floor(Math.random() * 6)] = targetColor;
  }

  colorOptionsContainer.innerHTML = options
    .map(
      (color) =>
        `<button style="background-color: ${color};" data-color="${color}"></button>`
    )
    .join("");

  colorOptionsContainer.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handleGuess);
  });
}

function handleGuess(event) {
  const guessedColor = event.target.dataset.color;
  if (guessedColor === targetColor) {
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "#28a745";
    score++;
    scoreElement.textContent = score;
    setTimeout(() => {
      initGame();
    }, 1000);
  } else {
    gameStatus.textContent = "Wrong! Try again. 😢";
    gameStatus.style.color = "#dc3545";
    event.target.style.opacity = "0.5";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

newGameButton.addEventListener("click", () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

initGame();

// CSS Styles
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    .toggle-button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 10px;
      font-size: 14px;
      background: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .toggle-button:hover {
      background: #333;
    }
    .dark-mode {
      background: #333;
      color: white;
    }
    @media (max-width: 480px) {
      .toggle-button {
        font-size: 12px;
        padding: 8px;
      }
    }
  </style>
  `
);
