/**
 * Adapter Pattern: Converts external book data format into our Book entity.
 * Requirement #7: JSON format -> Book entity.
 */
public class ExternalBookAdapter {
    // For simplicity, we assume the data is passed as separate strings
    // or we could parse a JSON string here.
    public static BookInterface convertToBook(String bookTitle, boolean isBorrowable) {
        Book book = new Book(bookTitle);
        book.setAvailable(isBorrowable);
        return book;
    }
}
