import { updateCartQuantity } from "../../data/cart.js";
export function updateCheckOutItems(HOME_LINK_EL,updateCartQuantityFunction) {
  HOME_LINK_EL.textContent = `${updateCartQuantity()} items`;
}