import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.stepInPercents = (100 / (this.steps - 1)).toFixed(1);
    this.leftPercents = this.stepInPercents * this.value;
    this.activeStep = null;

    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: ${this.leftPercents}%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.leftPercents}%;"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    </div>
    `);

    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.stepsNodes = this.elem.querySelectorAll('.slider__steps span');
    this.addClassActive(this.value);

    this.elem.addEventListener('click', event => {
      let clickInPercents = Math.round((event.clientX - this.elem.offsetLeft) / (this.elem.clientWidth / 100));
      let step = Math.floor((clickInPercents + this.stepInPercents / 2) / this.stepInPercents);
      this.addClassActive(step);
    })
  }

  addClassActive = (value) => {
    if (!this.activeStep) {
      this.activeStep = this.stepsNodes[value];
      this.activeStep.classList.add('slider__step-active');
      return;
    }

    if (this.stepsNodes[value] == this.activeStep) return;

    this.activeStep.classList.remove('slider__step-active');
    this.activeStep = this.stepsNodes[value];
    this.activeStep.classList.add('slider__step-active');
    this.value = value;
    this.changeSlider();
    this.addEvent();
  }

  changeSlider = () => {
    this.leftPercents = this.stepInPercents * this.value;
    this.sliderThumb.style.left = this.leftPercents + '%';
    this.sliderProgress.style.width = this.leftPercents + '%';
    this.sliderValue.textContent = this.value;
  }

  addEvent = () => {
    let event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }
}
