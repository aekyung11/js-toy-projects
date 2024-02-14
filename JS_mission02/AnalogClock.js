function updateClock(hourHand, minuteHand, secondHand) {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourDeg = ((hour * 180 / 6) + (minute * 180 / (6 * 60)) + (second * 180 / ( 6 * 60 * 60)));
  const minuteDeg = ((minute * 180 / 30) + (second * 180 / (30 * 60)));
  const secondDeg = ((second / 60) * 360);

  hourHand.style.setProperty('--deg', String(hourDeg));
  minuteHand.style.setProperty('--deg', String(minuteDeg));
  secondHand.style.setProperty('--deg', String(secondDeg));
}
const AnalogClock = $container => {
  const hourHand = document.createElement("div");
  hourHand.classList.add("hand", "hour");
  const minuteHand = document.createElement("div");
  minuteHand.classList.add("hand", "minute");
  const secondHand = document.createElement("div");
  secondHand.classList.add("hand", "second");
  $container.append(hourHand, minuteHand, secondHand);

  for (let i = 0; i < 12; i++) {
    const time = document.createElement("div");
    time.textContent = "|";
    time.classList.add("time");
    if (i !== 0) {
      time.classList.add(`time${i}`);
    }
    $container.appendChild(time);
  }

  setInterval(updateClock, 1000, hourHand, minuteHand, secondHand);
};

export default AnalogClock;
