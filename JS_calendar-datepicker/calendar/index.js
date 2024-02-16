function generateMonthNames() {
  const monthNames = [];
  const monthDate = new Date(2024, 0, 1);

  for (let i = 0; i < 12; i++) {
    monthDate.setMonth(i);
    monthNames.push(monthDate.toLocaleString("en-US", { month: "long" }));
  }

  return monthNames;
}

const monthNames = generateMonthNames();

function toIsoDate(d) {
  return `${String(d.getFullYear()).padStart(4, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

class Calendar {
  constructor($container) {
    this.$container = $container;
    this.today = new Date();
    this.todayIsoDate = toIsoDate(this.today);
    this.calendarDate = new Date(this.today);
    this.$container.classList.add("calendar-container");
    this.selectedIsoDate = null;

    this.$container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="calendar-nav">
        <i class="bx bxs-left-arrow pagination"></i>
        <div class="current-month-year">
          <span class="current-month"></span>
          <span class="current-year"></span>
        </div>
        <i class="bx bxs-right-arrow pagination"></i>
      </div>
      <div class="calendar-grid">
        <span class="day-of-week">SUN</span>
        <span class="day-of-week">MON</span>
        <span class="day-of-week">TUE</span>
        <span class="day-of-week">WED</span>
        <span class="day-of-week">THU</span>
        <span class="day-of-week">FRI</span>
        <span class="day-of-week">SAT</span>
      </div>
      `
    );

    const previousButton = this.$container.querySelector(".bxs-left-arrow");
    const nextButton = this.$container.querySelector(".bxs-right-arrow");

    previousButton.onclick = this.onPreviousMonth;
    nextButton.onclick = this.onNextMonth;
    this.updateCalendar();

    this.grid = this.$container.querySelector(".calendar-grid");
    $container.onclick = this.onClick;
    $container.onmouseover = this.onMouseOver;
    $container.onmouseout = this.onMouseOut;
  }

  onMouseOver = (e) => {
    if (e.target.dataset.isoDate !== undefined) {
      e.target.classList.add("hovered");
    }
  };

  onMouseOut = (e) => {
    if (e.target.dataset.isoDate !== undefined) {
      e.target.classList.remove("hovered");
    }
  };

  onClick = (e) => {
    if (e.target.dataset.isoDate !== undefined) {
      if (this.selectedIsoDate) {
        const $selectedDay = this.$container.querySelector(
          `[data-iso-date='${this.selectedIsoDate}']`
        );
        if ($selectedDay) {
          $selectedDay.classList.remove("selected");
        }
      }
      this.selectedIsoDate = e.target.dataset.isoDate;
      e.target.classList.add("selected");
      console.log(e.target.dataset.isoDate);
    }
  };

  onPreviousMonth = () => {
    this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
    this.updateCalendar();
  };

  onNextMonth = () => {
    this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
    this.updateCalendar();
  };

  updateCalendar() {
    const days = this.$container.getElementsByClassName("day");
    while (days.length > 0) {
      days[0].parentNode.removeChild(days[0]);
    }

    const year = this.calendarDate.getFullYear();
    const month = monthNames[this.calendarDate.getMonth()];

    this.$container.querySelector(".current-year").textContent = year;
    this.$container.querySelector(".current-month").textContent = month;

    const $calendarGrid = this.$container.querySelector(".calendar-grid");

    const firstDayOfMonth = new Date(new Date(this.calendarDate).setDate(1));
    const startDay = new Date(
      new Date(firstDayOfMonth).setDate(1 - firstDayOfMonth.getDay())
    );
    const firstDayOfNextMonth = new Date(
      new Date(firstDayOfMonth).setMonth(firstDayOfMonth.getMonth() + 1)
    );
    const lastDayOfMonth = new Date(
      new Date(firstDayOfNextMonth).setDate(firstDayOfNextMonth.getDate() - 1)
    );
    const endDay = new Date(
      new Date(lastDayOfMonth).setDate(
        6 - lastDayOfMonth.getDay() + lastDayOfMonth.getDate()
      )
    );

    const endDayIsoDate = toIsoDate(endDay);
    const currentDate = new Date(startDay);
    let currentDateIsoDate = toIsoDate(currentDate);

    while (currentDateIsoDate <= endDayIsoDate) {
      const day = document.createElement("span");
      day.dataset.isoDate = toIsoDate(currentDate);
      day.classList.add("day");
      if (currentDate.getDay() === 0) {
        day.classList.add("sunday");
      }
      if (currentDate.getMonth() !== firstDayOfMonth.getMonth()) {
        day.classList.add("prev-next-month-day");
      }
      if (currentDateIsoDate === this.todayIsoDate) {
        day.classList.add("today");
      }
      if (this.selectedIsoDate === currentDateIsoDate) {
        day.classList.add("selected");
      }
      day.textContent = currentDate.getDate();
      $calendarGrid.appendChild(day);

      currentDate.setDate(currentDate.getDate() + 1);
      currentDateIsoDate = toIsoDate(currentDate);
    }
  }
}

function GenerateCalendar($container) {
  return new Calendar($container);
}

export default GenerateCalendar;
