function summariseOrders(orders) {
    if (!Array.isArray(orders)) throw new Error('Orders must be an array');
    if (orders.length === 0) throw new Error('Orders must not be empty');
    const sorted = [...orders].sort((a, b) => b.amount - a.amount);
    const total  = orders.reduce((sum, o) => sum + o.amount, 0);
    return { sorted: sorted, total: total };
  }
  
  module.exports = { summariseOrders };