import { getLocalStorage } from './utils.mjs';

/* document.getElementById('cart-count').classList.add('hide'); */

const totalPrice = getLocalStorage('total-price');
const numItems = getLocalStorage('num-items');

const subValue = document.getElementById('sub-value');
const taxValue = document.getElementById('tax-value');
const shipValue = document.getElementById('ship-value');
const finValue = document.getElementById('fin-value');

document.addEventListener('DOMContentLoaded', () => {
  let tax = totalPrice * 0.06;
  let ship = numItems * 2 + 8;

  subValue.textContent = totalPrice;
  taxValue.textContent = tax.toFixed(2);
  shipValue.textContent = ship.toFixed(2);
  finValue.textContent = (tax + ship + totalPrice).toFixed(2);
});
