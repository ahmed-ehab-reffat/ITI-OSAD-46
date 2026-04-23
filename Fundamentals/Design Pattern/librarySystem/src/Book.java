/**
 * Base implementation of a Book.
 * Following SOLID: This class has one responsibility: representing a book.
 */
public class Book implements BookInterface {
    private String title;
    private boolean isAvailable;
    private int baseDuration = 14; // Default borrowing duration: 14 days

    public Book(String title) {
        this.title = title;
        this.isAvailable = true;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public boolean isAvailable() {
        return isAvailable;
    }

    @Override
    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }

    @Override
    public int getBorrowingDuration() {
        return baseDuration;
    }
}
