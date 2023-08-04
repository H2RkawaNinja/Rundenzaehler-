let runners = [];
let totalRounds = 10;
let stopwatchEnabled = false;
let startTime = null;
let raceStarted = false;

function toggleStopwatch(event) {
  stopwatchEnabled = event.target.checked;
  if (!stopwatchEnabled) {
    startTime = null;
    runners.forEach((runner) => {
      runner.startTime = null;
      runner.time = 0;
    });
    updateRunnersList();
  }
}

function addRunner(event) {
  event.preventDefault();
  const runnerName = document.getElementById("runnerName").value;
  if (runnerName.trim() === "") return;

  const runner = {
    name: runnerName,
    rounds: 0,
    time: 0,
    startTime: null,
  };
  runners.push(runner);
  document.getElementById("runnerForm").reset();
  updateRunnersList();
  updateLiveBoard();
}

function startRace() {
  if (!raceStarted) {
    raceStarted = true;
    startTime = new Date().getTime();
    updateTimer();
  }
}

function resetRace() {
  raceStarted = false;
  startTime = null;
  runners.forEach((runner) => {
    runner.rounds = 0;
    runner.time = 0;
    runner.startTime = null;
  });
  updateRunnersList();
  updateLiveBoard();
  updateTimer();
}

function countRound(runnerIndex) {
  if (raceStarted) {
    const currentTime = new Date().getTime();
    if (stopwatchEnabled) {
      const prevRoundTime = runners[runnerIndex].startTime || currentTime;
      const roundDuration = currentTime - prevRoundTime;
      runners[runnerIndex].startTime = currentTime;
      runners[runnerIndex].time = roundDuration;
    }
    runners[runnerIndex].rounds++;
    updateRunnersList();
    updateLiveBoard();
  }
}

function reduceRound(runnerIndex) {
  if (raceStarted && runners[runnerIndex].rounds > 0) {
    const currentTime = new Date().getTime();
    if (stopwatchEnabled) {
      const prevRoundTime = runners[runnerIndex].startTime || currentTime;
      const roundDuration = currentTime - prevRoundTime;
      runners[runnerIndex].startTime = currentTime;
      runners[runnerIndex].time = roundDuration;
    }
    runners[runnerIndex].rounds--;
    updateRunnersList();
    updateLiveBoard();
  }
}



function updateRunnersList() {
  const runnersList = document.getElementById("runnersList");
  runnersList.innerHTML = "";

  runners.forEach((runner, index) => {
    const listItem = document.createElement("li");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => deleteRunner(index));
    listItem.appendChild(deleteButton);

    const runnerInfo = document.createElement("span");
    runnerInfo.textContent = `${runner.name}: ${runner.rounds} Runden`;
    if (runner.rounds >= totalRounds) {
      runnerInfo.classList.add("completed");
    }
    listItem.appendChild(runnerInfo);

    const timeInfo = document.createElement("span");
    const formattedTime = formatTime(runner.time);
    timeInfo.textContent = `Zeit: ${formattedTime}`;
    listItem.appendChild(timeInfo);

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

function sortRunnersForLiveBoard() {
  return runners.slice().sort((a, b) => {
    if (a.rounds === b.rounds) {
      return a.time - b.time;
    }
    return b.rounds - a.rounds;
  });
}

function updateLiveBoard() {
  const sortedRunners = sortRunnersForLiveBoard();
  const liveBoardContent = document.getElementById("liveBoardContent");
  liveBoardContent.innerHTML = "";

  sortedRunners.forEach((runner, index) => {
    const runnerInfo = document.createElement("p");
    const formattedTime = formatTime(runner.time);
    runnerInfo.textContent = `${index + 1}. ${runner.name}: ${runner.rounds} von ${totalRounds} Runden (${formattedTime})`;
    if (runner.rounds >= totalRounds) {
      runnerInfo.classList.add("completed");
    }
    liveBoardContent.appendChild(runnerInfo);
  });
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  if (stopwatchEnabled && raceStarted) {
    const currentTime = new Date().getTime();
    totalTime = currentTime - startTime;
    const formattedTime = formatTime(totalTime);
    timerElement.textContent = `Zeit wird gestoppt `;
  } else {
    timerElement.textContent = "";
  }
}

function setTotalRounds(event) {
  totalRounds = parseInt(event.target.value, 10);
  updateLiveBoard();
}

function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsRemaining = milliseconds % 1000;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millisecondsRemaining.toString().padStart(3, "0")}`;
}

document.getElementById("runnerForm").addEventListener("submit", addRunner);
document.getElementById("totalRounds").addEventListener("change", setTotalRounds);
document.getElementById("stopwatch").addEventListener("change", toggleStopwatch);
document.getElementById("startRaceButton").addEventListener("click", startRace);
document.getElementById("resetRaceButton").addEventListener("click", resetRace);

function deleteRunner(runnerIndex) {
  runners.splice(runnerIndex, 1);
  updateRunnersList();
  updateLiveBoard();
}