function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let carouselInner = carousel.querySelector('.carousel__inner');
  let leftArrow = carousel.querySelector('.carousel__arrow_left');
  let rightArrow = carousel.querySelector('.carousel__arrow_right');
  let position = 0;
  let slideWidth = carouselInner.offsetWidth;
  let currentSlide = 1;
  let lastSlide = carouselInner.querySelectorAll('.carousel__slide').length;

  leftArrow.style.display = 'none';

  carousel.addEventListener('click', event => {
    if (!event.target.closest('.carousel__arrow')) return;

    if (event.target.closest('.carousel__arrow_right')) {
      console.log('right');
      currentSlide++;
      position -= slideWidth;
      carouselInner.style.transform = `translateX(${position}px)`;
    } else if (event.target.closest('.carousel__arrow_left')) {
      currentSlide--;
      position += slideWidth;
      carouselInner.style.transform = `translateX(${position}px)`;
    }

    currentSlide == 1 ? leftArrow.style.display = 'none' : leftArrow.style.display = '';
    currentSlide == lastSlide ? rightArrow.style.display = 'none' : rightArrow.style.display = '';
  });
}