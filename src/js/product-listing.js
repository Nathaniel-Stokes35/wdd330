import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { updateCartBadge, getParam } from './utils.mjs';

const category = getParam('category');
const query = getParam('query');
const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');
const mylist = new ProductList(category, dataSource, listElement, query);

mylist.init();

document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();
});
