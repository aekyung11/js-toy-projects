document.head.insertAdjacentHTML(
  "beforeend",
  '<link href="star-rating/theme.css" rel="stylesheet" />'
);

class StarRating {
  constructor($container) {
    this.currentRating = 0;
    this.currentHover = 0;
    this.stars = [];
    this.$container = $container;

    $container.classList.add("star-rating-container");
    const starCount = parseInt($container.dataset.maxRating);

    $container.onmouseover = this.onMouseOver;

    $container.onmouseout = this.onMouseOut;

    $container.onclick = this.onClick;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("i");
      star.classList.add("bx", "bxs-star");
      star.dataset.starValue = i + 1;
      $container.appendChild(star);
      this.stars.push(star);
    }

    this.updateStarsForHover();
    this.updateStarsForRating();
  }

  onMouseOver = (e) => {
    if (e.target.dataset.starValue !== undefined) {
      this.currentHover = parseInt(e.target.dataset.starValue);
      this.updateStarsForHover();
    }
  };

  onMouseOut = (e) => {
    if (e.target.dataset.starValue !== undefined) {
      this.currentHover = 0;
      this.updateStarsForHover();
    }
  };

  onClick = (e) => {
    if (e.target.dataset.starValue !== undefined) {
      this.currentRating = parseInt(e.target.dataset.starValue);
      this.updateStarsForRating();
      this.$container.dispatchEvent(
        new CustomEvent("rating-change", {
          detail: this.currentRating,
        })
      );
    }
  };

  updateStarsForHover() {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < this.currentHover) {
        this.stars[i].classList.add("hovered");
      } else {
        this.stars[i].classList.remove("hovered");
      }
    }
  }

  updateStarsForRating() {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < this.currentRating) {
        this.stars[i].classList.add("selected");
      } else {
        this.stars[i].classList.remove("selected");
      }
    }
  }
}

function StarRatingFn($container) {
  return new StarRating($container);
}

export default StarRatingFn;
