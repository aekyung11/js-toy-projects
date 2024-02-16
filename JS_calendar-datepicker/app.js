import GenerateCalendar from "./calendar/index.js";

const $calendarGrids = [...document.querySelectorAll(".calendar-grid")];

$calendarGrids.forEach(($calendarGrid) => {
  GenerateCalendar($calendarGrid);
});
