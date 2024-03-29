class NewsList {
  constructor($container, globalState, subscribeToGlobalState) {
    this.$container = $container;
    this.$container.classList.add("news-list-container");
    this.$container.insertAdjacentHTML(
      "beforeend",
      `
        <article class="news-list">
        </article>
        <div class="scroll-observer">
          <img src="img/ball-triangle.svg" alt="Loading..." />
        </div>
      `
    );

    subscribeToGlobalState((key, value) => {
      if (key === "category") {
        this.onCategoryChange(value);
      }
    });

    this.$newsList = this.$container.querySelector("article");
    this.page = 1;
    this.pageSize = 5;
    this.apiKey = "96c1586bba6741f3a0d5a7e100e004a2";
    this.onCategoryChange(globalState.category);

    this.target = this.$container.querySelector(".scroll-observer");

    const observeIntersection = (target, callback) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      });
      observer.observe(target);
    };

    observeIntersection(this.target, this.addPage);
  }

  onCategoryChange = (category) => {
    this.category = category;
    this.page = 1;
    const articles = this.$container.getElementsByClassName("news-item");
    while (articles.length > 0) {
      articles[0].parentNode.removeChild(articles[0]);
    }
  };

  addPage = async () => {
    // pageSize에 5를 지정하면 5개의 뉴스를 취득한다.
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      this.category === "all" ? "" : this.category
    }&page=${this.page}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`;

    const response = await axios.get(url);
    console.log(response);

    for (let i = 0; i < response.data.articles.length; i++) {
      const article = response.data.articles[i];
      this.$newsList.insertAdjacentHTML(
        "beforeend",
        `
          <section class="news-item">
            <div class="thumbnail">
              <a href="${
                article.url
              }" target="_blank" rel="noopener noreferrer">
                <img
                  src="${
                    article.urlToImage ||
                    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                  }"
                  alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href="${
                  article.url
                }" target="_blank" rel="noopener noreferrer">
                  ​${article.title}
                </a>
              </h2>
              <p>
                ${article.description || ""}
              </p>
            </div>
          </section>
        `
      );
    }
    this.page++;
  };
}

export default NewsList;
