document.addEventListener("DOMContentLoaded", () => {
  const playersContainer = document.getElementById("players");
  const playerCountSelect = document.getElementById("playerCount");
  const rollButton = document.getElementById("btn");

  const diceImgs = [
    "dice1.png", "dice2.png", "dice3.png",
    "dice4.png", "dice5.png", "dice6.png"
  ];

  function renderPlayers(count) {
    playersContainer.innerHTML = "";
    for (let i = 1; i <= count; i++) {
      playersContainer.innerHTML += `
        <div class="dice">
          <p>Player ${i}</p>
          <img class="img${i}" src="images/dice6.png" />
        </div>
      `;
    }
  }

  renderPlayers(2);

  playerCountSelect.addEventListener("change", () => {
    renderPlayers(parseInt(playerCountSelect.value));
  });

  rollButton.addEventListener("click", () => {
    const count = parseInt(playerCountSelect.value);
    let rolls = [];

    for (let i = 1; i <= count; i++) {
      const diceImg = document.querySelector(`.img${i}`);
      
      diceImg.classList.add("roll-animation");

      setTimeout(() => {
        diceImg.classList.remove("roll-animation");

        let roll = Math.floor(Math.random() * 6);
        diceImg.src = "images/" + diceImgs[roll];
        rolls[i - 1] = roll;

        if (i === count) {
          let maxRoll = Math.max(...rolls);
          let winners = rolls
            .map((r, idx) => (r === maxRoll ? idx + 1 : null))
            .filter(x => x);

          if (winners.length === 1) {
            document.querySelector("h1").innerText = `✌️ Player ${winners[0]} Wins!`;
          } else {
            document.querySelector("h1").innerText = `🤝 Draw between Players ${winners.join(", ")}`;
          }
        }
      }, 500); 
    }
  });
});
