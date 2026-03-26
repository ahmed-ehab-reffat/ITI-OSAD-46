let clockInterval;
const display = document.getElementById("clock");
const startBtn = document.getElementById("btn");

function updateClock() {
  const now = new Date();
  display.innerText = now.toLocaleTimeString();
}

startBtn.addEventListener("click", () => {
  if (!clockInterval) {
    alert("Clock Started");
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.altKey && event.key.toLowerCase() === "w") {
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
      alert("Clock Stopped");
    }
  }
});
