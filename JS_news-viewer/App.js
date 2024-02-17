import Nav from "./components/Nav.js";
import NewsList from "./components/NewsList.js";

const $root = document.querySelector("#root");

class App {
  constructor($container) {
    this.category = "all";
    this.$nav = document.createElement("nav");
    this.$newsList = document.createElement("div");

    $container.appendChild(this.$nav);
    new Nav(this.$nav, this.category);
    $container.appendChild(this.$newsList);

    this.newsList = new NewsList(this.$newsList, this.category);

    this.$nav.addEventListener("category-change", (e) => {
      const category = e.detail;
      this.category = category;
      this.newsList.onCategoryChange(category);
    });
  }
}

new App($root);
