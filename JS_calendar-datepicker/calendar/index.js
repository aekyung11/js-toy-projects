function toIsoDate(d) {
  return `${String(d.getFullYear()).padStart(4, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

class Calendar {
  constructor($container) {
    $container = $container;
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
      $container.appendChild(day);

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}

function GenerateCalendar($container) {
  return new Calendar($container);
}

export default GenerateCalendar;