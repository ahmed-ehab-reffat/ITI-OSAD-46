import java.util.ArrayList;
import java.util.List;

/**
 * Singleton Pattern: Ensures only one instance of LibraryService exists.
 * Observer Pattern (Subject): Manages a list of observers and notifies them.
 */
public class LibraryService {
    private static LibraryService instance; // Static instance for Singleton
    private List<BookInterface> books = new ArrayList<>();
    private List<Observer> observers = new ArrayList<>(); // List of Observers

    // Private constructor so no one else can create an instance
    private LibraryService() {}

    // Method to get the single instance
    public static LibraryService getInstance() {
        if (instance == null) {
            instance = new LibraryService();
        }
        return instance;
    }

    public void addBook(BookInterface book) {
        books.add(book);
        notifyObservers("New book added: " + book.getTitle());
    }

    public List<BookInterface> getBooks() {
        return books;
    }

    // Observer methods
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}
