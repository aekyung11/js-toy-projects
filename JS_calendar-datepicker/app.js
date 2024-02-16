import Calendar from "./calendar/index.js";
import DatePicker from "./date-picker/index.js";

const $calendars = [...document.querySelectorAll(".calendar")];

$calendars.forEach(($calendar) => {
  new Calendar($calendar);
});

const $datePickers = [...document.querySelectorAll(".date-picker")];

$datePickers.forEach(($datePicker) => {
  new DatePicker($datePicker);
});
