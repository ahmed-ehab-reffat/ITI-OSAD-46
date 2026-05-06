const { filterByCategory } = require('./shop');

const products = [
    { id: 1, name: 'Product 1', category: 'Category 1' },
    { id: 2, name: 'Product 2', category: 'Category 2' },
    { id: 3, name: 'Product 3', category: 'Category 1' },
];

describe('filterByCategory', () => {
    it('should return the correct products', () => {
        // setup
        const category = 'Category 1';
        const expectedResult = [
            { id: 1, name: 'Product 1', category: 'Category 1' },
            { id: 3, name: 'Product 3', category: 'Category 1' },
        ];
        const expectedLength = 2;
        // exercise
        const result = filterByCategory(products, category);
        // verify
        expect(result).toEqual(expectedResult);
        expect(result).toHaveLength(expectedLength);
        expect(result).not.toContain({ id: 2, name: 'Product 2', category: 'Category 2' });
    })
    it("should return empty array if the category is not found", () => {
        // setup
        const category = 'Category 3';
        const expectedResult = [];
        const expectedLength = 0;
        // exercise
        const result = filterByCategory(products, category);
        // verify
        expect(result).toEqual(expectedResult);
        expect(result).toHaveLength(expectedLength);
    })
    it("should throw an error if the products is not an array", () => {
        // setup
        const products = 'not an array';
        const category = 'Category 1';
        // exercise
        const result = () => filterByCategory(products, category);
        // verify
        expect(result).toThrow();
    })
})
