export let cart = [];
export function assignCartVariable(){
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
  },{
    id:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }]
}
export function removeCartItem(id){
  cart = cart.filter(cartItem => cartItem.id !== id);
  saveCartToLOcalStorage();
}
export function addItemsToCart(id,quantityToAdd){
  const product=cart.find(product => product.id === id);
  if(product){
    product.quantity += quantityToAdd;
  }else{
    cart.push({
         id,
        quantity:quantityToAdd
        })
  }
  saveCartToLOcalStorage();
}
export function updateItemsInCart(id,newQuantity){
  const product=cart.find(product => product.id === id);
  if(product){
    product.quantity = newQuantity;
  }
  saveCartToLOcalStorage();
}
export function saveCartToLOcalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function updateCartQuantity(){
   const TOTAL_CART_QUANTITY = cart.reduce((total,product) => total + product.quantity,0);
   return TOTAL_CART_QUANTITY;
}
