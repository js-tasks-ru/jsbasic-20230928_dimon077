import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
    this.productsInner = this.elem.querySelector('.products-grid__inner');

    this.productsCards = this.products.map(product => Object.assign((new ProductCard(product)), { spiciness: product.spiciness, nuts: product.nuts, vegeterian: product.vegeterian }));

    this.addCards(this.productsCards);
  }

  addCards = (cards) => {
    for (let card of cards) {
      this.productsInner.append(card.elem);
    }
  }

  updateFilter = (newFilter) => {
    Object.assign(this.filters, newFilter);
    let { noNuts = false, vegeterianOnly = false, maxSpiciness = 4, category = '' } = this.filters;
    let filteredCards = this.productsCards.filter(e => e.spiciness <= maxSpiciness);

    if (noNuts) {
      filteredCards = filteredCards.filter(e => !e.nuts);
    }
    if (vegeterianOnly) {
      filteredCards = filteredCards.filter(e => e.vegeterian);
    }
    if (category) {
      filteredCards = filteredCards.filter(e => e.category == category);
    }

    this.productsInner.innerHTML = '';
    this.addCards(filteredCards);
  }
}