class Nav {
  constructor($container, globalState) {
    this.$container = $container;
    this.$container.classList.add("category-list");
    this.$container.insertAdjacentHTML(
      "beforeend",
      `
        <ul>
          <li id="all" class="category-item">전체보기</li>
          <li id="business" class="category-item">비즈니스</li>
          <li id="entertainment" class="category-item">엔터테인먼트</li>
          <li id="health" class="category-item">건강</li>
          <li id="science" class="category-item">과학</li>
          <li id="sports" class="category-item">스포츠</li>
          <li id="technology" class="category-item">기술</li>
        </ul>
      `
    );
    this.globalState = globalState;
    if (this.globalState.category) {
      const $categoryItem = this.$container.querySelector(
        `#${this.globalState.category}`
      );
      $categoryItem.classList.add("active");
    }
    this.$container.onclick = this.onClick;
  }

  onClick = (e) => {
    if (e.target.classList.contains("category-item")) {
      if (this.globalState.category) {
        const $categoryItem = this.$container.querySelector(
          `#${this.globalState.category}`
        );
        $categoryItem.classList.remove("active");
      }
      this.globalState.category = e.target.id;
      e.target.classList.add("active");
    }
  };
}

export default Nav;
