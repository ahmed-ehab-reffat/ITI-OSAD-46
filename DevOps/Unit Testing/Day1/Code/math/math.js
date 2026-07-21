function calculateDiscount(price, discountPercent) {
    if (price < 0) throw new Error('Price cannot be negative');
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    return price * ( 1 - discountPercent / 100);
  }
  
  module.exports = { calculateDiscount };