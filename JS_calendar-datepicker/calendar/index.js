function toIsoDate(d) {
  return `${String(d.getFullYear()).padStart(4, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

class Calendar {
  constructor($container) {
    $container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="calendar-nav">
        <i class="bx bxs-left-arrow"></i>
        <div class="current-month-year">
          <span class="current-month">February</span>
          <span class="current-year">2024</span>
        </div>
        <i class="bx bxs-right-arrow"></i>
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

    $container.classList.add("calendar-container");
    const $calendarGrid = $container.querySelector(".calendar-grid");

    const today = new Date();
    const initialDate = new Date(today);

    const firstDayOfMonth = new Date(new Date(initialDate).setDate(1));
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
    while (toIsoDate(currentDate) <= endDayIsoDate) {
      const day = document.createElement("span");
      day.dataset.isoDate = toIsoDate(currentDate);
      day.classList.add("day");
      if (currentDate.getDay() === 0) {
        day.classList.add("sunday");
      }
      if (currentDate.getMonth() !== firstDayOfMonth.getMonth()) {
        day.classList.add("prev-next-month-day");
      }
      if (toIsoDate(currentDate) === toIsoDate(today)) {
        day.classList.add("today");
      }
      day.textContent = currentDate.getDate();
      $calendarGrid.appendChild(day);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}

function GenerateCalendar($container) {
  return new Calendar($container);
}

export default GenerateCalendar;
