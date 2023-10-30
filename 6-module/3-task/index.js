import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner"></div>
    </div>
    `);

    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.leftArrow = this.elem.querySelector('.carousel__arrow_left');
    this.rightArrow = this.elem.querySelector('.carousel__arrow_right');

    this.carouselInner.append(...(this.slides.map(slide => createElement(`
    <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `))
    ));

    this.position = 0;
    this.currentSlide = 1;
    this.lastSlide = this.carouselInner.querySelectorAll('.carousel__slide').length;
    this.leftArrow.style.display = 'none';

    this.elem.addEventListener('click', (event) => {
      this.slideWidth = this.carouselInner.offsetWidth;
      this.initCarousel(event);
      this.addOnClick(event);
    });
  }

  initCarousel = (event) => {
    if (!event.target.closest('.carousel__arrow')) return;

    if (event.target.closest('.carousel__arrow_right')) {
      this.currentSlide++;
      this.position -= this.slideWidth;
      this.carouselInner.style.transform = `translateX(${this.position}px)`;
    } else if (event.target.closest('.carousel__arrow_left')) {
      this.currentSlide--;
      this.position += this.slideWidth;
      this.carouselInner.style.transform = `translateX(${this.position}px)`;
    }

    this.currentSlide == 1 ? this.leftArrow.style.display = 'none' : this.leftArrow.style.display = '';
    this.currentSlide == this.lastSlide ? this.rightArrow.style.display = 'none' : this.rightArrow.style.display = '';
  }

  addOnClick = (event) => {
    let btn = event.target.closest('.carousel__button');

    if (btn) {
      let addEvent = new CustomEvent('product-add', {
        detail: btn.closest('.carousel__slide').dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(addEvent);
    }
  }
}