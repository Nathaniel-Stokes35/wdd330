import { getLocalStorage, loadHeaderFooter, updateCartBadge } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const datasource = getLocalStorage('so-cart');
const element = document.querySelector('.product-list');
const shopCart = new ShoppingCart(datasource, element);
shopCart.init();

function updateCartFooter(cart) {
  const footerEl = document.getElementById('cart-footer');
  const totalEl = document.getElementById('cart-total');
  const discountEl = document.getElementById('cart-discount');
  const finalEl = document.getElementById('cart-final');

  // If the footer HTML doesn't exist yet, do nothing (keeps this file safe to include anywhere)
  if (!footerEl || !totalEl || !discountEl || !finalEl) return;

  if (!Array.isArray(cart) || cart.length === 0) {
    footerEl.classList.add('hide');
    totalEl.textContent = '$0.00';
    discountEl.textContent = '$0.00';
    finalEl.textContent = '$0.00';
    return;
  }

  const total = getCartTotal(cart);
  const discountTotal = getCartDiscount(cart); // sum of per-item discounts (10%)
  const finalTotal = Math.max(total - discountTotal, 0);

  totalEl.textContent = formatCurrency(total);
  discountEl.textContent = formatCurrency(discountTotal);
  finalEl.textContent = formatCurrency(finalTotal);

  footerEl.classList.remove('hide');
}

function getCartTotal(cart) {
  return cart.reduce((sum, item) => {
    const qty = Number(item?.quantity ?? 1);
    const price = coercePrice(
      item?.FinalPrice ?? item?.price ?? item?.Price ?? item?.ListPrice,
    );
    return sum + price * (Number.isFinite(qty) ? qty : 1);
  }, 0);
}

function getCartDiscount(cart) {
  return cart.reduce((sum, item) => {
    const qty = Number(item?.quantity ?? 1);
    const price = coercePrice(
      item?.FinalPrice ?? item?.price ?? item?.Price ?? item?.ListPrice,
    );
    return sum + price * 0.1 * (Number.isFinite(qty) ? qty : 1);
  }, 0);
}

function coercePrice(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : 0;
  }
  return 0;
}

function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

updateCartFooter(datasource);

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge(); // ensure correct on initial load
});
