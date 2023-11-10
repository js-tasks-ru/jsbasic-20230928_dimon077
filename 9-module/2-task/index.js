import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.filterNuts = document.querySelector('#nuts-checkbox');
    this.filterVegeterian = document.querySelector('#vegeterian-checkbox')
  }

  addCarousel = () => {
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);
  }

  addRibbonMenu = () => {
    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuHolder = document.querySelector('[data-ribbon-holder]');
    ribbonMenuHolder.append(this.ribbonMenu.elem);
  }

  addStepSlider = () => {
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let stepSliderHolder = document.querySelector('[data-slider-holder]');
    stepSliderHolder.append(this.stepSlider.elem);
  }

  addCartIcon = () => {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
  }

  addCart = () => {
    this.cart = new Cart(this.cartIcon);
  }

  addProductsGrid = (products) => {
    this.productsGrid = new ProductsGrid(products);
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(this.productsGrid.elem);
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  addListeners = () => {
    document.body.addEventListener('product-add', event => {
      this.cart.addProduct(this.products.find(item => item.id == event.detail));
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    this.filterNuts.onchange = () => { this.productsGrid.updateFilter({ noNuts: this.filterNuts.checked }); };

    this.filterVegeterian.onchange = () => { this.productsGrid.updateFilter({ vegeterianOnly: this.filterVegeterian.checked }); };
  }

  async render() {
    this.addCarousel();
    this.addRibbonMenu();
    this.addStepSlider();
    this.addCartIcon();
    this.addCart();

    let response = await fetch('products.json');
    this.products = await response.json();

    this.addProductsGrid(this.products);
    this.addListeners();
  }
}
