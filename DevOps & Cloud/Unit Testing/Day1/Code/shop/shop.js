function filterByCategory(products, category) {
    if (!Array.isArray(products)) throw new Error('products must be an array');
    return products.filter(p => p.category === category);
  }
// const products = [
//     { id: 1, name: 'Product 1', category: 'Category 1' },
//     { id: 2, name: 'Product 2', category: 'Category 2' },
//     { id: 3, name: 'Product 3', category: 'Category 1' },
// ];
//   console.log(filterByCategory(products, 'Category 1'));
  
  module.exports = { filterByCategory };