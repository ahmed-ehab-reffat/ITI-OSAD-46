const { calculateDiscount } = require('./math');

describe('calculateDiscount', () => {
    it("should return the correct discount", () => {
        // setup
        const price = 100;
        const discountPercent = 10;
        const expectedResult = 90;

        // exercise
        const result = calculateDiscount(price, discountPercent);

        // verify
        expect(result).toEqual(expectedResult);
    })
    it("should throw an error if the price is negative", () => {
        // setup
        const price = -100;
        const discountPercent = 10;
        const expectedErrorMessage = "Price cannot be negative";
        // exercise
        const result = () => calculateDiscount(price, discountPercent);

        // verify
        expect(result).toThrow(expectedErrorMessage);
    })
    it("should throw an error if the discount percent is negative", () => {
        // setup
        const price = 100;
        const discountPercent = -10;
        const expectedErrorMessage = "Discount must be between 0 and 100";
        // exercise
        const result = () => calculateDiscount(price, discountPercent);
        // verify
        expect(result).toThrow(expectedErrorMessage);
    })
    it("should throw an error if the discount percent is greater than 100", () => {
        // setup
        const price = 100;
        const discountPercent = 110;
        const expectedErrorMessage = "Discount must be between 0 and 100";
        // exercise
        const result = () => calculateDiscount(price, discountPercent);
        // verify
        expect(result).toThrow(expectedErrorMessage);
    })
});