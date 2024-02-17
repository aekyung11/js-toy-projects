import Nav from "./components/Nav.js";
import NewsList from "./components/NewsList.js";

const $root = document.querySelector("#root");
const $nav = document.createElement("nav");
const $newsList = document.createElement("div");

$root.appendChild($nav);
new Nav($nav);
$root.appendChild($newsList);
new NewsList($newsList);
