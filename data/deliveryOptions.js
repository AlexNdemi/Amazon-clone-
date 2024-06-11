export function getDeliveryOption(id,deliveryOptions){
  const deliveryOption = deliveryOptions.find(deliveryOption => deliveryOption.id === id);
  return deliveryOption;
}
export const deliveryOptions = [{
  id:'1',
  durationInDays:7,
  priceCents:0
},{
  id:'2',
  durationInDays:3,
  priceCents:499
},{
  id:'3',
  durationInDays:1,
  priceCents:999
}
]