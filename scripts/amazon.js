import { products } from "../data/products.js";
import { assignCartVariable, cart,addItemsToCart, updateCartQuantity} from "../data/cart.js";
assignCartVariable();
console.log(cart)
let productsHTML = '';
products.forEach((product)=>{
  productsHTML+=`
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select data-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `
});
const CART_QUANTITY_HTML=document.querySelector('.cart-quantity');
const PRODUCT_GRID = document.querySelector('.js-product-grid');
PRODUCT_GRID.innerHTML=productsHTML;
let addToCartButtons=PRODUCT_GRID.querySelectorAll('.js-add-to-cart-button');
let addToCartSelectElements=PRODUCT_GRID.querySelectorAll('.product-quantity-container>select');
addToCartSelectElements.forEach(selectEl =>{
  selectEl.addEventListener('change',function(){
    let id = selectEl.dataset.id;
    let quantity = selectEl.value;
    console.log(quantity);
    setSelectValueOnCartButton(id,quantity);
  })
})
function setSelectValueOnCartButton(id,quantity){
  addToCartButtons.forEach(button=>{
    if(button.dataset.productId === id){
       button.dataset.dropdownQuantity = quantity;
    }
  })
}
addToCartButtons.forEach(button =>{
  button.addEventListener("click",function(){
    let id = button.dataset.productId;
    let quantity = Number(button.dataset.dropdownQuantity) || 1;
    addItemsToCart(id,quantity);
    updateCartQuantityHtml();
  })
})

function updateCartQuantityHtml(){
  CART_QUANTITY_HTML.textContent = updateCartQuantity();
}
updateCartQuantityHtml();

