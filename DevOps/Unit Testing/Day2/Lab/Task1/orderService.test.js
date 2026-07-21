const {placeOrder} = require('./orderService');
const paymentService = require('./paymentService');
const emailService = require('./emailService');

jest.mock('./paymentService');
jest.mock('./emailService');

describe('orderService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('placeOrder validation', () => {
    it('should return orderId and transactionId for a valid order', async () => {
      // setup
      const userId = 1;
      const email = 'test@example.com';
      const amount = 100;
      const transactionId = 'txn_123';
      paymentService.charge.mockResolvedValue({success: true, transactionId});
      emailService.sendOrderConfirmation.mockResolvedValue({sent: true});

      // exercise
      const result = await placeOrder(userId, email, amount);

      // verify
      expect(result).toHaveProperty('orderId');
      expect(result.transactionId).toBe(transactionId);
      expect(emailService.sendOrderConfirmation).toHaveBeenCalledWith(
        email,
        transactionId
      );
    });

    it('should throw error if amount is less than or equal to 0', async () => {
      // setup
      const userId = 1;
      const email = 'test@example.com';
      const amount = 0;

      // exercise & verify
      await expect(placeOrder(userId, email, amount)).rejects.toThrow(
        'Invalid amount'
      );
      expect(paymentService.charge).not.toHaveBeenCalled();
    });

    it('should throw error if payment fails', async () => {
      // setup
      const userId = 1;
      const email = 'test@example.com';
      const amount = 100;
      paymentService.charge.mockResolvedValue({success: false});

      // exercise & verify
      await expect(placeOrder(userId, email, amount)).rejects.toThrow(
        'Payment failed'
      );
      expect(emailService.sendOrderConfirmation).not.toHaveBeenCalled();
    });
  });
});
