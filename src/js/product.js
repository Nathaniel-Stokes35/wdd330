import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { updateCartBadge, getParam } from './utils.mjs';

const category = getParam('category');
const dataSource = new ProductData(category);

const productId = getParam('id');
const productDetails = new ProductDetails(productId, dataSource);

// console.log(dataSource);
productDetails.init();

// console.log(dataSource.findProductById(productId));

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
