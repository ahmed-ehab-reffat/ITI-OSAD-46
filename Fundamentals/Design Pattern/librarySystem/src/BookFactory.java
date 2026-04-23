/**
 * Factory Pattern: Encapsulates the logic of creating different types of books.
 * This separates the creation logic from the rest of the code.
 */
public class BookFactory {
    public static BookInterface createBook(String type, String title) {
        if (type.equalsIgnoreCase("Physical")) {
            return new PhysicalBook(title);
        } else if (type.equalsIgnoreCase("EBook")) {
            return new EBook(title);
        } else if (type.equalsIgnoreCase("Historical")) {
            return new HistoricalBook(title);
        }
        return new Book(title); // Default book
    }
}
