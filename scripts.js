const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapsContainer = document.getElementById("lapsContainer");
const lapList = document.getElementById("lapList");

const circumference = 2 * Math.PI * 52;

let elapsedTime = 0;
let timer = null;
let isRunning = false;
let lapCount = 0;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function updateCircleProgress(circle, value, max) {
    if (!circle) return;
    const percent = value / max;
    const dash = circumference * percent;
    circle.setAttribute("stroke-dasharray", `${dash} ${circumference}`);
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

    updateCircleProgress(hoursCircle, hours, 24);
    updateCircleProgress(minutesCircle, minutes, 60);
    updateCircleProgress(secondsCircle, seconds, 60);
}

function start() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);

    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function stop() {
    clearInterval(timer);
    isRunning = false;
    timer = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

function recordLap() {
    if (!isRunning) return;

    lapCount++;
    const currentTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCount}: ${currentTime}`;

    if (lapList) {
        lapList.prepend(li);
    }

    if (lapsContainer) {
        lapsContainer.style.display = "block";
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();

    if (lapList) {
        lapList.innerHTML = "";
    }

    if (lapsContainer) {
        lapsContainer.style.display = "none";
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}

if (startBtn) startBtn.addEventListener("click", start);
if (stopBtn) stopBtn.addEventListener("click", stop);
if (lapBtn) lapBtn.addEventListener("click", recordLap);
if (resetBtn) resetBtn.addEventListener("click", reset);

updateDisplay();
stopBtn.disabled = true;
lapBtn.disabled = true;