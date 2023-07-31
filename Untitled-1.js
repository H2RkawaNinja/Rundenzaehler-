const runners = [];
let totalRounds = 10;

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

function countRound(runnerIndex) {
  runners[runnerIndex].rounds++;
  updateRunnersList();
  updateLiveBoard();
}

function reduceRound(runnerIndex) {
  if (runners[runnerIndex].rounds > 0) {
    runners[runnerIndex].rounds--;
    updateRunnersList();
    updateLiveBoard();
  }
}

function sortRunnersForLiveBoard() {
  const sortedRunners = runners.slice();
  sortedRunners.sort((a, b) => b.rounds - a.rounds);
  return sortedRunners;
}

function updateRunnersList() {
  const runnersList = document.getElementById("runnersList");
  runnersList.innerHTML = "";

  runners.forEach((runner, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${runner.name}: ${runner.rounds} Runden`;

    const countButton = document.createElement("button");
    countButton.textContent = "Runde zählen";
    countButton.classList.add("countButton");
    countButton.addEventListener("click", () => countRound(index));
    listItem.appendChild(countButton);

    const reduceButton = document.createElement("button");
    reduceButton.textContent = "-";
    reduceButton.classList.add("reduceButton");
    reduceButton.addEventListener("click", () => reduceRound(index));
    listItem.appendChild(reduceButton);

    runnersList.appendChild(listItem);
  });
}

function updateLiveBoard() {
  const sortedRunners = sortRunnersForLiveBoard();

  const liveBoardContent = document.getElementById("liveBoardContent");
  liveBoardContent.innerHTML = "";

  sortedRunners.forEach((runner, index) => {
    const runnerInfo = document.createElement("p");
    runnerInfo.textContent = `${index + 1}. ${runner.name}: ${runner.rounds} von ${totalRounds} Runden`;
    if (runner.rounds >= totalRounds) {
      runnerInfo.classList.add("completed");
    }
    liveBoardContent.appendChild(runnerInfo);
  });
}

function setTotalRounds(event) {
  totalRounds = parseInt(event.target.value, 10);
  updateLiveBoard();
}

document.getElementById("runnerForm").addEventListener("submit", addRunner);
document.getElementById("totalRounds").addEventListener("change", setTotalRounds);
