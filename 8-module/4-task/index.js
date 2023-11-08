import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || product === null) return;

    for (let item of this.cartItems) {
      if (item.product == product) {
        item.count++;
        this.onProductUpdate(item);
        return;
      }
    }

    this.cartItems.push({ product, count: 1 });
    this.onProductUpdate(this.cartItems.at(-1));
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id == productId) {
        item.count += amount;
        if (item.count == 0) {
          this.cartItems.splice(index, 1);
        }
        this.onProductUpdate(item);
      }
    });
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += (item.product.price * item.count)
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  addModalBodyListener = (modalBody) => {
    modalBody.addEventListener('click', (event) => {
      if (event.target.closest('.cart-counter__button')) {
        let productId = event.target.closest('.cart-product').dataset.productId;

        if (event.target.closest('.cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        } else if (event.target.closest('.cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }
      }
    });

    modalBody.querySelector('.cart-form').addEventListener('submit', e => {
      this.onSubmit(e);
    });
  }

  createModalBody = () => {
    let modalBody = document.createElement('div');

    for (let p of this.cartItems) {
      modalBody.append(this.renderProduct(p.product, p.count));
    }

    modalBody.append(this.renderOrderForm());

    this.addModalBodyListener(modalBody);

    return modalBody;
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(this.createModalBody());
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.querySelector('body').classList.contains('is-modal-open')) {
      if (this.isEmpty()) {
        this.modal.close();
        return;
      }

      let infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count == 0) {
        this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`).remove();
        return;
      }

      let productCount = this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = this.modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.modal.elem.querySelector('button').classList.add('is-loading');
    let form = this.modal.elem.querySelector('.cart-form');

    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form)
    });

    if (response.ok) {
      this.modal.setTitle('Success!');
      this.cartItems.length = 0;
      this.cartIcon.update(this);
      this.modal.setBody(this.createModalBodyOnSubmit());
    }
  };

  createModalBodyOnSubmit = () => {
    return createElement(`
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}