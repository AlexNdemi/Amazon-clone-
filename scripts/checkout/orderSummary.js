import { getProduct, products } from "../../data/products.js";
import { cart, assignCartVariable, removeCartItem, updateCartQuantity, updateItemsInCart, updateDeliveryOption } from "../../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions } from "../../data/deliveryOptions.js";
// Function to generate HTML for cart items
 function generateCartHTML() {
  assignCartVariable();
  let html = '';
  cart.forEach((cartItem) => {
    //let matchedItem = products.find(product => product.id === cartItem.id);
    const matchedItem = getProduct(cartItem.id,products);
    const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === cartItem.deliveryOptionId);
    const TODAYS_DATE = dayjs();
    const DELIVERYDATE = TODAYS_DATE.add(deliveryOption.durationInDays,'days');
    const DATE_STRING = DELIVERYDATE.format('dddd, MMMM D');
    html += `
      <div class="cart-item-container" data-id="${matchedItem.id}">
        <div class="delivery-date">${DATE_STRING}</div>
      <div class="cart-item-details-grid">
        <img class="product-image" src=${matchedItem.image}>
        <div class="cart-item-details">
          <div class="product-name">${matchedItem.name}</div>
          <div class="product-price">$${(matchedItem.priceCents / 100).toFixed(2)}</div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary" data-id=${matchedItem.id}>Update</span>
            <input class="quantity-input" type="text" pattern="[0-9]*" min="1" max="999" inputmode="numeric"/>
            <span class="save-quantity-link link-primary" data-id=${matchedItem.id}>Save</span>
            <span class="delete-quantity-link link-primary" data-id=${matchedItem.id}>Delete</span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          ${generateDeliveryOptionsHTML(matchedItem,cartItem)}
        </div>
      </div>
      </div>`;
  });
  return html;
}
function generateDeliveryOptionsHTML(matchedItem,cartItem){
  let html=''
  deliveryOptions.forEach((deliveryOption) => {
    const TODAYS_DATE = dayjs();
    const DELIVERYDATE = TODAYS_DATE.add(deliveryOption.durationInDays,'days');
    const PRICE_STRING = deliveryOption.priceCents === 0 ? 'Free' :`$${deliveryOption.priceCents}`;
    const DATE_STRING = DELIVERYDATE.format('dddd, MMMM D');
    const IS_CHECKED = deliveryOption.id === cartItem.deliveryOptionId ? 'checked': '';
    
    html +=`  <div 
                class="delivery-option"  
                data-id="${matchedItem.id}"
                data-delivery-option-id="${deliveryOption.id}">
              <input 
                type="radio" 
                ${IS_CHECKED} 
                class="delivery-option-input" 
                name="delivery-option-${matchedItem.id}">
              <div>
                <div class="delivery-option-date">${DATE_STRING}</div>
                <div class="delivery-option-price">${PRICE_STRING} Shipping</div>
              </div>
            </div>
    `
  });
  return html;
}
function isValidQuantity(quantity) {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 999;
}
// Function to update the number of items in the cart


// Function to remove a cart item from the DOM
function removeCartItemFromPage(id,ORDER_SUMMARY_EL) {
  const itemToRemove = ORDER_SUMMARY_EL.querySelector(`.cart-item-container[data-id="${id}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }
}
//function to update quantity span
function updateQuantitySpan(quantity, quantitySpan) {
  quantitySpan.innerHTML = `Quantity: <span class="quantity-label">${quantity}</span>`;
}
// Function to toggle the 'is-editing-quantity' class for quantity input
function toggleEditingQuantity(container,ORDER_SUMMARY_EL) {
  const editingContainer = ORDER_SUMMARY_EL.querySelector('.is-editing-quantity');
  if (editingContainer && editingContainer !== container) {
    editingContainer.classList.remove('is-editing-quantity');
  }

  container.classList.toggle('is-editing-quantity');
}  



export function renderOrderSummary(ORDER_SUMMARY_EL,HOME_LINK_EL,updateCheckOutItemsfunction,PAYMENT_SUMMARY_EL,renderPaymentSummaryFunction){
ORDER_SUMMARY_EL.innerHTML = generateCartHTML();
  // Event listener for quantity update, save, and delete
ORDER_SUMMARY_EL.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('update-quantity-link')) {
    const container = target.closest('.cart-item-container');
    toggleEditingQuantity(container,ORDER_SUMMARY_EL);
  } else if (target.classList.contains('save-quantity-link')) {
    const container = target.closest('.cart-item-container');
    const id = container.dataset.id;
    const quantityInput = container.querySelector('.quantity-input');
    const quantity = Number(quantityInput.value);
    const quantitySpan=quantityInput.parentElement.children[0];
    if (isValidQuantity(quantity)) {
      updateItemsInCart(id, quantity);
      updateCheckOutItemsfunction(HOME_LINK_EL,updateCartQuantity);
      toggleEditingQuantity(container,ORDER_SUMMARY_EL);
      // Update quantity span if needed
      updateQuantitySpan(quantity,quantitySpan);
      renderPaymentSummaryFunction(PAYMENT_SUMMARY_EL);
    } else {
      alert("Please enter a valid quantity between 1 and 999.");
    }
  }else if(target.closest('.delivery-option')){
      const deliveryOption = target.closest('.delivery-option');
      const {id,deliveryOptionId} = deliveryOption.dataset;
      updateDeliveryOption(id,deliveryOptionId);
      console.log('from delivery option');
      ORDER_SUMMARY_EL.innerHTML=generateCartHTML();
      renderPaymentSummaryFunction(PAYMENT_SUMMARY_EL);
      
  } else if (target.classList.contains('delete-quantity-link')) {
    const id = target.closest('.cart-item-container').dataset.id;
    removeCartItem(id);
    removeCartItemFromPage(id,ORDER_SUMMARY_EL);
    updateCheckOutItemsfunction(HOME_LINK_EL,updateCartQuantity);
    renderPaymentSummaryFunction(PAYMENT_SUMMARY_EL);
  }
});

}