const runners = []; // Array, um die Läufer zu speichern
let totalRounds = 10; // Standardwert für die Anzahl der Runden

// Funktion zum Hinzufügen eines Läufers
function addRunner(event) {
  event.preventDefault();
  const runnerName = document.getElementById("runnerName").value;
  if (runnerName.trim() === "") return;

  const runner = {
    name: runnerName,
    rounds: 0,
  };
  runners.push(runner);
  document.getElementById("runnerForm").reset();
  updateRunnersList();
  updateLiveBoard();
}

// Funktion zum Zählen der Runden
function countRound(runnerIndex) {
  runners[runnerIndex].rounds++;
  updateRunnersList();
  updateLiveBoard();
}

// Funktion zum Sortieren der Läufer für das Live-Rundenboard
function sortRunnersForLiveBoard() {
  // Erstelle eine Kopie der runners-Liste, um die ursprüngliche Reihenfolge nicht zu ändern
  const sortedRunners = runners.slice();
  
  // Sortiere die Kopie der Läufer nach ihren Runden in absteigender Reihenfolge
  sortedRunners.sort((a, b) => b.rounds - a.rounds);

  return sortedRunners;
}

// Funktion zum Aktualisieren der Liste der Läufer
function updateRunnersList() {
  const runnersList = document.getElementById("runnersList");
  runnersList.innerHTML = "";

  runners.forEach((runner, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${runner.name}: ${runner.rounds} Runden`;

    const countButton = document.createElement("button");
    countButton.textContent = "Runde zählen";
    countButton.addEventListener("click", () => countRound(index));
    listItem.appendChild(countButton);

    runnersList.appendChild(listItem);
  });
}

// Funktion zum Aktualisieren des Live-Rundenboards
function updateLiveBoard() {
  const sortedRunners = sortRunnersForLiveBoard();

  const liveBoard = document.getElementById("liveBoard");
  liveBoard.innerHTML = "";

  sortedRunners.forEach((runner, index) => {
    const runnerInfo = document.createElement("p");
    runnerInfo.textContent = `${index + 1}. ${runner.name}: ${runner.rounds} von ${totalRounds} Runden`;
    liveBoard.appendChild(runnerInfo);
  });
}

// Funktion zum Einstellen der Anzahl der Runden
function setTotalRounds(event) {
  totalRounds = parseInt(event.target.value, 10);
  updateLiveBoard();
}

document.getElementById("runnerForm").addEventListener("submit", addRunner);
document.getElementById("totalRounds").addEventListener("change", setTotalRounds);
// ...

// Funktion zum Aktualisieren des Live-Rundenboards
function updateLiveBoard() {
  const sortedRunners = sortRunnersForLiveBoard();

  const liveBoard = document.getElementById("liveBoard");
  liveBoard.innerHTML = "";

  sortedRunners.forEach((runner, index) => {
    const runnerInfo = document.createElement("p");
    runnerInfo.textContent = `${index + 1}. ${runner.name}: ${runner.rounds} von ${totalRounds} Runden`;
    if (runner.rounds >= totalRounds) {
      runnerInfo.classList.add("completed");
    }
    liveBoard.appendChild(runnerInfo);
  });
}

// ...
