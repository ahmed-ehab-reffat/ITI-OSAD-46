public class Main {
    public static void main(String[] args) {
        // 1. Facade Pattern: Simple interface to the system
        LibraryFacade libraryFacade = new LibraryFacade();

        // 2. Observer Pattern: Register users to get notifications
        User john = new User("John", false);
        libraryFacade.registerUser(john);

        // 3. Factory Pattern (via Facade): Create different types of books
        System.out.println("--- Adding Books ---");
        libraryFacade.addBook("Physical", "Clean Code");
        libraryFacade.addBook("EBook", "Design Patterns");

        // 4. Decorator Pattern: Add premium features to a book
        BookInterface basicBook = new Book("Head First Design Patterns");
        BookInterface premiumBook = new PremiumBookDecorator(basicBook);
        System.out.println("\n--- Decorator Pattern ---");
        System.out.println("Basic Book Duration: " + basicBook.getBorrowingDuration() + " days");
        System.out.println("Premium Book Duration: " + premiumBook.getBorrowingDuration() + " days");

        // 5. Chain of Responsibility: Borrowing requests
        System.out.println("\n--- Chain of Responsibility ---");
        libraryFacade.borrowBook("Clean Code", 5);   // Handled by Librarian
        libraryFacade.borrowBook("Clean Code", 10);  // Handled by Manager
        libraryFacade.borrowBook("Clean Code", 20);  // Handled by Director

        // 6. Adapter Pattern: Converting external data
        System.out.println("\n--- Adapter Pattern ---");
        BookInterface externalBook = ExternalBookAdapter.convertToBook("Refactoring", true);
        System.out.println("Converted External Book: " + externalBook.getTitle());
    }
}
