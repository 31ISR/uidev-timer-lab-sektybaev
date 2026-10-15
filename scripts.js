// Текст внутри кругов
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Сами круги (SVG)
const hoursCircle = document.getElementById("hours-circle");
const minutesCircle = document.getElementById("minutes-circle");
const secondsCircle = document.getElementById("seconds-circle");

// Кнопки
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

// Список кругов
const lapsContainer = document.getElementById("lapsContainer");
const lapList = document.getElementById("lapList");

const circumference = 2 * Math.PI * 52;

let elapsedTime = 0;   // сколько секунд прошло
let timer = null;      // ID интервала (null — таймер не запущен)
let isRunning = false; // идёт ли отсчёт
let lapCount = 0;      // сколько кругов записано




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

    const currentTime = formatTime(elapsedTime);

    const li = document.createElement("li");
    li.textContent = currentTime;

    if (lapList) {
        lapList.prepend(li); 
        lapList.style.display = "block"; 
    }
}


function reset() {
    
    stop();
    elapsedTime = 0;
    updateDisplay();

    if (lapList) {
        lapList.innerHTML = "";
    }

    if (lapList) {
        lapList.style.display = "none";
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}


startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);


updateDisplay();
stopBtn.disabled = true;
lapBtn.disabled = true;
