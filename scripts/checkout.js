import { updateCheckOutItems} from "./checkout/homeLink.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

const CHECK_OUT_GRID = document.querySelector('.checkout-grid');
const HOME_LINK = document.querySelector('.checkout-header-middle-section .return-to-home-link');
console.log(HOME_LINK);
const ORDER_SUMMARY = CHECK_OUT_GRID.querySelector('.order-summary');
const PAYMENT_SUMMARY = CHECK_OUT_GRID.querySelector('.payment-summary');
renderOrderSummary(ORDER_SUMMARY,HOME_LINK,updateCheckOutItems,PAYMENT_SUMMARY,renderPaymentSummary);
updateCheckOutItems(HOME_LINK);
renderPaymentSummary(PAYMENT_SUMMARY);

