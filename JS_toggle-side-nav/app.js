function toggleNav() {
  const navElement = document.querySelector("nav");
  navElement.classList.toggle("active");
  localStorage.setItem("showNav", String(navElement.classList.contains("active")));

  // transition css가 별도의 클래스로 구성되고, 그 클래스가 여기에 추가되는 것이 preload를 remove하는 것보다 나을듯..
  const bodyPreloadElement = document.querySelector("body.preload");
  if (bodyPreloadElement) {
    bodyPreloadElement.classList.remove("preload");
  }
}

function onLoad() {
  const navElement = document.querySelector("nav");
  const showNav = localStorage.getItem("showNav");
  if (showNav === "true") {
    navElement.classList.add("active");
  }
  /* else -> 그냥 내버려두기.. 어차피 default state는 active 클래스가 없는 상태 */

  const bodyElement = document.querySelector("body");
  bodyElement.style.visibility = "visible";
  const toggleElement = document.querySelector("i.toggle");
  toggleElement.addEventListener("click", toggleNav);
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", onLoad);
} else {
  // `DOMContentLoaded` has already fired
  onLoad();
}
