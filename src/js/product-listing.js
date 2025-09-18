import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { updateCartBadge } from './product.js';
import { loadHeaderFooter, getParam } from './utils.mjs';
 
const category = getParam('category');
const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');
const mylist = new ProductList(category, dataSource, listElement);
 
mylist.init();

document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();
});

loadHeaderFooter();
 