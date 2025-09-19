function cartItemTemplate(item) {
  console.log(item);
  const FinalPrice = Number(item.FinalPrice); // Simple number conversion
  const discountPrice = FinalPrice * 0.1; // 10% of FinalPrice
  const newItem = `<li class='cart-card divider'>
    <div>
      <a href='#' class='cart-card__image'>
          <img
          src='${item.Images.PrimaryMedium}'
          alt='${item.Name}'
          />
      </a>
    </div>
    <div>
      <a href='#'>
          <h2 class='card__name'>${item.Name}</h2>
      </a>
      <p class='cart-card__color'>${item.Colors?.[0]?.ColorName ?? ''}</p>
    </div>
    <div>
      <button class='cart-remove' data-id=${item.Id}>X</button>
      <p class='cart-card__quantity' data-id='${item.Id}'>qty: ${item.quantity}</p>
      <p class='cart-card__price'>$${FinalPrice.toFixed(2)}<br>Discount 10%: -$${discountPrice.toFixed(2)}</p>
    </div>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
    constructor(dataSource, listElement) {
      // You passed in this information to make the class as reusable as possible.
      // Being able to define these things when you use the class will make it very flexible
      this.dataSource = dataSource;
      this.listElement = typeof listElement === 'string'
      ? document.querySelector(listElement)
      : listElement;

    this.cart = [];
    }
  
    async init() {
        this.cart = this.dataSource;
        this.renderList(this.cart);
    }
    
  renderList(cart) {
    if (!Array.isArray(this.cart) || this.cart.length === 0) {
        this.listElement.innerHTML =
        '<p>Your cart is empty.</p>';
        return;
    }
    const htmlItems = cart.map((item) => cartItemTemplate(item));
    this.listElement.innerHTML = htmlItems.join('');
  }
}