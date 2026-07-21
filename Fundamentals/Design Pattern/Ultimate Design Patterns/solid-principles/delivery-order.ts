import { Order } from './Order';
import { ShippingCostCalculator } from './shipping-cost-calculator';

export class DeliveryOrder extends Order implements ShippingCostCalculator {
  calculateShippingCost(): number {
    return this.getPrice() + this.SHIPPING_COST;
  }
}
