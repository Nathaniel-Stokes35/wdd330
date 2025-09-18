import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { updateCartBadge, loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');
const mylist = new ProductList(category, dataSource, listElement);

mylist.init();

document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();
});
