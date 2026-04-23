/**
 * This interface defines the contract for all Book types.
 * Using an interface allows us to use the Decorator pattern later.
 */
public interface BookInterface {
    String getTitle();
    boolean isAvailable();
    void setAvailable(boolean available);
    int getBorrowingDuration(); // Returns number of days
}
