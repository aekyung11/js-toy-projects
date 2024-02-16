import Calendar from "../calendar/index.js";

document.head.insertAdjacentHTML(
  "beforeend",
  '<link rel="stylesheet" href="/JS_calendar-datepicker/date-picker/theme.css" />'
);

class DatePicker {
  constructor($container) {
    this.$container = $container;
    this.$container.classList.add("date-picker-container", "calendar-hidden");

    this.$container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="modal-bg"></div>
      <input
        class="date-picker-input"
        value=""
        readonly
        placeholder="Select date"
      />
      <div class="date-picker-calendar"></div>
      `
    );

    this.$calendar = this.$container.querySelector(".date-picker-calendar");

    this.calendar = new Calendar(this.$calendar);

    this.$input = this.$container.querySelector("input");
    this.$input.onclick = this.toggleCalendar;

    this.$calendar.addEventListener("selected-day-change", (e) => {
      const isoDate = e.detail;
      this.$input.value = isoDate;
      this.hideCalendar();
    });

    this.overlay = this.$container.querySelector(".modal-bg");
    this.overlay.onclick = this.hideCalendar;
  }

  // showCalendar = () => {
  //   this.$calendar.classList.remove("hidden");
  // };

  hideCalendar = () => {
    this.$container.classList.add("calendar-hidden");
  };

  toggleCalendar = () => {
    this.$container.classList.toggle("calendar-hidden");
    if (
      this.$container.classList.contains("calendar-hidden") &&
      this.$input.value
    ) {
      this.calendar.showDate(this.$input.value);
    }
  };
}

export default DatePicker;
