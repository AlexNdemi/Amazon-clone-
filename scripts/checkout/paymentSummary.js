import { cart,assignCartVariable, updateCartQuantity } from "../../data/cart.js"
import { getDeliveryOption,deliveryOptions} from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCentsToDollars } from "../../helpers/formartMoney.js";
function generatePaymentSummaryHTML(){
  assignCartVariable();
  console.log(cart);
  
  const TOTAL_NUMBER_OF_ITEMS = updateCartQuantity();
  
  const SUM_PRICE_ALL_ITEMS = cart.reduce((total,currentItem)=>{
    const currentItemPrice = getProduct(currentItem.id,products).priceCents;
    const currentItemCost =  currentItemPrice * currentItem.quantity;
    console.log(currentItemCost)
    return total + currentItemCost;
  },0);
  console.log(SUM_PRICE_ALL_ITEMS)
  const SUM_SHIPPING_AND_HANDLING = cart.reduce((total,currentItem) => {
    const currentItemShippingPrice = getDeliveryOption(currentItem.deliveryOptionId,deliveryOptions).priceCents;
     return total + currentItemShippingPrice;
  },0)
  console.log(SUM_SHIPPING_AND_HANDLING);
  const TOTAL_BEFORE_TAX = SUM_PRICE_ALL_ITEMS + SUM_SHIPPING_AND_HANDLING;
  const ESTIMATED_TAX = TOTAL_BEFORE_TAX * 0.1;
  
  const ORDER_TOTAL = TOTAL_BEFORE_TAX + ESTIMATED_TAX;
try{
  console.log("generatePaymentSummaryHTML was executed successfully.");
  let html=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${TOTAL_NUMBER_OF_ITEMS}):</div>
            <div class="payment-summary-money">$${formatCentsToDollars(SUM_PRICE_ALL_ITEMS)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCentsToDollars(SUM_SHIPPING_AND_HANDLING)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCentsToDollars(TOTAL_BEFORE_TAX)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCentsToDollars(ESTIMATED_TAX)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCentsToDollars(ORDER_TOTAL)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`
return html;
}catch(error){

}console.error("Error rendering payment summary:", error);
}
// export function renderPaymentSummary(paymentSummaryEl){
//    paymentSummaryEl.innerHTML = generatePaymentSummaryHTMl()         
// }
export function renderPaymentSummary(paymentSummaryEl) {
  if (!paymentSummaryEl) {
    console.error("Payment summary element not found!");
    return;
  }
  try {
    paymentSummaryEl.innerHTML = generatePaymentSummaryHTML();
    console.log(paymentSummaryEl,"Payment summary rendered successfully.");
  } catch (error) {
    console.error("Error rendering payment summary:", error);
  }
}