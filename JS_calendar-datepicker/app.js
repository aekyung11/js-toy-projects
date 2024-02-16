import GenerateCalendar from "./calendar/index.js";

const $containers = [...document.querySelectorAll(".calendar")];
// const $calendarGrids = [...document.querySelectorAll(".calendar-grid")];

$containers.forEach(($container) => {
  GenerateCalendar($container);
});
