
import { products } from "../data/products.js";
import { cart,assignCartVariable,removeCartItem, updateCartQuantity, updateItemsInCart} from "../data/cart.js";
assignCartVariable();
const ORDER_SUMMARY = document.querySelector('.order-summary');
const HOME_LINK = document.querySelector('.checkout-header-middle-section .return-to-home-link');
let checkoutHTML = '';
cart.forEach((cartItem) => {
 let matchedItem = products.filter(product => product.id === cartItem.id)[0];
 checkoutHTML += `<div class="cart-item-container-${matchedItem.id}">
 <div class="delivery-date">
   Delivery date: Tuesday, June 21
 </div>
 <div class="cart-item-details-grid">
   <img class="product-image"
     src=${matchedItem.image}>

   <div class="cart-item-details">
     <div class="product-name">
       ${matchedItem.name}
     </div>
     <div class="product-price">
       $${(matchedItem.priceCents /100).toFixed(2)}
     </div>
     <div class="product-quantity">
       <span>
         Quantity: <span class="quantity-label">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary" data-id=${matchedItem.id}>
         Update
       </span>
       <input class="quantity-input" type="text" pattern="[0-9]" min="1" max="999" inputmode="numeric"/>
       <span  class="save-quantity-link link-primary" data-id=${matchedItem.id}> Save </span>
       <span  class="delete-quantity-link link-primary" data-id=${matchedItem.id}>
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>
     <div class="delivery-option">
       <input type="radio" checked
         class="delivery-option-input"
         name="delivery-option-${matchedItem.id}">
       <div>
         <div class="delivery-option-date">
           Tuesday, June 21
         </div>
         <div class="delivery-option-price">
           FREE Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${matchedItem.id}">
       <div>
         <div class="delivery-option-date">
           Wednesday, June 15
         </div>
         <div class="delivery-option-price">
           $4.99 - Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio"
         class="delivery-option-input"
         name="delivery-option-${matchedItem.id}">
       <div>
         <div class="delivery-option-date">
           Monday, June 13
         </div>
         <div class="delivery-option-price">
           $9.99 - Shipping
         </div>
       </div>
     </div>
   </div>
 </div>
</div>`
}
)
function updateCheckOutItems(){
  HOME_LINK.textContent = updateCartQuantity() + ' items';
}
updateCheckOutItems()
ORDER_SUMMARY.innerHTML = checkoutHTML;

const DELETE_ITEM_SPANS = ORDER_SUMMARY.querySelectorAll('.delete-quantity-link');
DELETE_ITEM_SPANS.forEach((deleteSpan) =>
  deleteSpan.addEventListener('click',function(){
     let id = deleteSpan.dataset.id;
     removeCartItem(id);
     removeCartItemFromPage(id);
     updateCheckOutItems(); 
  }));
const UPDATE_ITEM_SPANS = ORDER_SUMMARY.querySelectorAll('.update-quantity-link');
UPDATE_ITEM_SPANS.forEach((updateSpan) =>
  updateSpan.addEventListener('click',function(){
     let id = updateSpan.dataset.id;
     makeQuantityInputAppear(id);
    
  }));
const SAVE_QUANTITY_SPANS = ORDER_SUMMARY.querySelectorAll('.save-quantity-link');
SAVE_QUANTITY_SPANS.forEach((saveSpan) =>
  saveSpan.addEventListener('click',function(){
     let id = saveSpan.dataset.id;
     console.log(saveSpan.previousElementSiblingElementSibling);
     let quantity = Number(saveSpan.previousElementSibling.value);
     let quantitySpan=saveSpan.parentElement.children[0];
     updateItemsInCart(id,quantity);
     updateCheckOutItems();
     updateQuantitySpan(quantity,quantitySpan);
     
  }));
  function removeCartItemFromPage(id){
    const REMOVED_CART_ITEM_HTML=ORDER_SUMMARY.querySelector(`div[class*="${id}"]`);
    REMOVED_CART_ITEM_HTML.remove();
  }
  ;
  
  function makeQuantityInputAppear(id){
    ORDER_SUMMARY.querySelectorAll('[class^="cart-item-container"]').forEach((cartItemContainer)=>{
      console.log('cart-item-container')
      cartItemContainer.classList.remove('is-editing-quantity')});
      ORDER_SUMMARY.querySelector(`.cart-item-container-${id}`).classList.add('is-editing-quantity');
  }
  function updateQuantitySpan(quantity,quantitySpan){
    quantitySpan.innerHTML = `Quantity: <span class="quantity-label">${quantity}</span>`
  }
  function validateInput(el) {
    el.addEventListener("beforeinput", function (e) {
      let beforeValue = el.value;
      e.target.addEventListener(
        "input",
        function () {
          if (el.validity.patternMismatch) {
            el.value = beforeValue;
          }
        },
        { once: true }
      );
    });
  }