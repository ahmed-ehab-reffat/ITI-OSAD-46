/**
 * Decorator Pattern: Base decorator class.
 * It implements BookInterface and wraps a BookInterface object.
 */
public abstract class BookDecorator implements BookInterface {
    protected BookInterface decoratedBook;

    public BookDecorator(BookInterface decoratedBook) {
        this.decoratedBook = decoratedBook;
    }

    @Override
    public String getTitle() {
        return decoratedBook.getTitle();
    }

    @Override
    public boolean isAvailable() {
        return decoratedBook.isAvailable();
    }

    @Override
    public void setAvailable(boolean available) {
        decoratedBook.setAvailable(available);
    }

    @Override
    public int getBorrowingDuration() {
        return decoratedBook.getBorrowingDuration();
    }
}
