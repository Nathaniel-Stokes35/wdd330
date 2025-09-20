import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
  
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
  
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });
  
  
  updateCartTotal();
}

function cartItemTemplate(item) {
  // Ensure item has a quantity property, default to 1 if not present
  item.quantity = item.quantity || 1;
  
  const newItem = `<li class='cart-card divider' data-id='${item.Id}'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <div class='cart-card__quantity-controls'>
    <button class='quantity-btn decrease-quantity' data-id='${item.Id}'>-</button>
    <p class='cart-card__quantity'>qty: <span class='item-quantity'>${item.quantity}</span></p>
    <button class='quantity-btn increase-quantity' data-id='${item.Id}'>+</button>
  </div>
  <p class='cart-card__price'>$${(item.FinalPrice * item.quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

function increaseQuantity(e) {
  const productId = e.target.dataset.id;
  const cartItems = getLocalStorage('so-cart') || [];
  
  
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  
  if (itemIndex !== -1) {
   
    cartItems[itemIndex].quantity = (cartItems[itemIndex].quantity || 1) + 1;
    
    
    setLocalStorage('so-cart', cartItems);
    renderCartContents();
  }
}

function decreaseQuantity(e) {
  const productId = e.target.dataset.id;
  const cartItems = getLocalStorage('so-cart') || [];
  
  
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = Math.max((cartItems[itemIndex].quantity || 1) - 1, 1);

    setLocalStorage('so-cart', cartItems);   
    renderCartContents();
  }
}


function updateCartTotal() {
  const cartItems = getLocalStorage('so-cart') || [];
  const total = cartItems.reduce(
  (sum, item) => sum + (item.FinalPrice * (item.quantity || 1)),
  0
);
  
  let cartFooter = document.querySelector('.cart-footer');
  
  if (!cartFooter && cartItems.length > 0) {
    const productList = document.querySelector('.product-list');
    cartFooter = document.createElement('div');
    cartFooter.className = 'cart-footer';
    productList.after(cartFooter);
  }
  
  
  if (cartFooter && cartItems.length > 0) {
    cartFooter.innerHTML = `
      <div class='cart-total'>
        <p>Total: $${total.toFixed(2)}</p>
      </div>
       <div class='cart-actions'>
        <button id='clear-cart-btn'>Clear Cart</button> 
      </div>
    `;
     document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
  } else if (cartFooter) {
    
    cartFooter.remove();
  }
}

function clearCart() {
  setLocalStorage('so-cart', []);
  renderCartContents();
}

renderCartContents();
