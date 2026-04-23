/**
 * Concrete Decorator: Adds extra 10 days for borrowing.
 * This satisfies requirement #3 without modifying the Book entity.
 */
public class PremiumBookDecorator extends BookDecorator {
    public PremiumBookDecorator(BookInterface decoratedBook) {
        super(decoratedBook);
    }

    @Override
    public int getBorrowingDuration() {
        // Adding 10 extra days to the base duration
        return super.getBorrowingDuration() + 10;
    }
}
