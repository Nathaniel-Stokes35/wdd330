import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getLocalStorage, loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData(category);

const productId = getParam('product');
const productDetails = new ProductDetails(productId, dataSource);

// console.log(dataSource);
productDetails.init();

// console.log(dataSource.findProductById(productId));

export function updateCartBadge() {
  const cart = getLocalStorage('so-cart') || [];
  const badge = document.querySelector('.cart-count');
  //if (!badge) return;
  badge.textContent = cart.length;
  // hide when empty, show when > 0
  if (cart.length > 0) badge.classList.remove('hide');
  else badge.classList.add('hide');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
