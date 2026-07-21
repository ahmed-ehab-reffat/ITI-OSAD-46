import { CardType } from './card-type';
import { InternationalPaymentMethodFactory } from './international-payment-method-factory';
import { PaymentProcessor } from './payment-processor';

const paymentProcessor: PaymentProcessor = new PaymentProcessor(
  new InternationalPaymentMethodFactory()
);

const cardType: CardType = CardType.VISA;
const amount: number = 100.0;
const cardHolder: string = 'John Doe';
const cardNumber: string = '1234567890123456';
const cvv: string = '123';
const expiryDate: string = '12/24';

paymentProcessor.processPayment(
  cardType,
  amount,
  cardHolder,
  cardNumber,
  cvv,
  expiryDate
);
