import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
  `);
    this.titleNode = this.elem.querySelector('.modal__title');
    this.bodyNode = this.elem.querySelector('.modal__body');
    this.closeBtn = this.elem.querySelector('.modal__close');

    this.closeBtn.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this.closeWithKey);
  }

  open = () => {
    let body = document.querySelector('body');
    body.append(this.elem);
    body.classList.add('is-modal-open');
  }

  setTitle = (title) => {
    this.titleNode.textContent = title;
  }

  setBody = (node) => {
    this.bodyNode.innerHTML = '';
    this.bodyNode.append(node);
  }

  close = () => {
    document.querySelector('body').classList.remove('is-modal-open');
    this.elem.remove();
    document.removeEventListener('keydown', this.closeWithKey);
  }

  closeWithKey = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}