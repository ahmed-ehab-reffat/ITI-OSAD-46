const { summariseOrders } = require('./orders');

const orders = [
    { id: 1, amount: 700 },
    { id: 2, amount: 200 },
    { id: 3, amount: 100 },
    { id: 4, amount: 500 },
];

describe('summariseOrders', () => {
    it('should return the correct summary', () => {
        // setup
        const expectedResult = { sorted: [
            { id: 1, amount: 700 },
            { id: 4, amount: 500 },
            { id: 2, amount: 200 },
            { id: 3, amount: 100 },
        ], total: 1500 };
        // exercise
        const result = summariseOrders(orders);
        // verify
        expect(result.sorted).toHaveLength(4);
        expect(result.sorted).toEqual(expectedResult.sorted);
        expect(result.total).toEqual(expectedResult.total);
    })

    it('should throw an error if the orders is not an array', () => {
        // setup
        const orders = 'not an array';
        // exercise
        const result = () => summariseOrders(orders);
        // verify
        expect(result).toThrow('Orders must be an array');
    })
    it('should throw an error if the orders is empty', () => {
        // setup
        const orders = [];
        // exercise
        const result = () => summariseOrders(orders);
        // verify
        expect(result).toThrow('Orders must not be empty');
    })
})