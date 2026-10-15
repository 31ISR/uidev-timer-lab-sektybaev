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



function formatTime(totalSeconds) {
    const parts = getTimeParts(totalSeconds);

    const formattedHours = parts.hours.toString().padStart(2, '0');
    const formattedMinutes = parts.minutes.toString().padStart(2, '0');
    const formattedSeconds = parts.seconds.toString().padStart(2, '0');
}
