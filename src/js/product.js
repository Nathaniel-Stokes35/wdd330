import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
  const cart = getLocalStorage('so-cart', product) || [];
  cart.push(product);
  setLocalStorage('so-cart', cart);
  alert(`One product has been added to your cart.`);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);

  // console.log('1. produto encontrado para adicionar:', product);
  addProductToCart(product);
}


document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
