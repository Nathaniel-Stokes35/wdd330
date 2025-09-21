import { renderListWithTemplate, getParam } from './utils.mjs';

function productCardTemplate(product) {
    // matches the structure in /index.html
    const category = getParam('category')
    const id = product?.Id ?? '';
    const href = `../product_pages/index.html?category=${category}&id=${encodeURIComponent(id)}`;
    const img = product?.Images.PrimaryMedium ?? '';
    const brand = product?.Brand?.Name ?? '';
    const name = product?.NameWithoutBrand ?? product?.Name ?? 'Product';
    const price =
      typeof product?.FinalPrice === 'number'
        ? `$${product.FinalPrice.toFixed(2)}`
        : `$${product?.FinalPrice ?? '0.00'}`;
  
    return `<li class="product-card">
      <a href="${href}">
        <img 
          src="${product.Images.PrimaryMedium}" 
          srcset="
            ${product.Images.PrimarySmall} 80w,
            ${product.Images.PrimaryMedium} 160w
          "
          sizes="(max-width: 600px) 50vw, 160px"
          alt="Image of ${name}">
        <h2 class="card__brand">${brand}</h2>
        <h3 class="card__name">${name}</h3>
        <p class="product-card__price">${price}</p>
      </a>
    </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement, query) {
      // You passed in this information to make the class as reusable as possible.
      // Being able to define these things when you use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = typeof listElement === 'string'
      ? document.querySelector(listElement)
      : listElement;
      this.query = query;
    }
  
    async init() {
      let list = await this.dataSource.getData(this.category);
      if (this.query) {
        document.title = `Sleep Outside | ${this.query} Search Results`;
        list = list.filter(item =>
          item.Name?.toLowerCase().includes(this.query.toLowerCase())
        );
      }

      this.renderList(list);
    }
    
  renderList(list) {
    if (!this.listElement) return;
    renderListWithTemplate(
      productCardTemplate, // your top-level template function
      this.listElement,    // where to render
      list,            // data
      'afterbegin',        // position (default is fine)
      true                 // clear existing content (replaces innerHTML approach)
    );
  }
}