/**
 * Facade Pattern: Provides a simple interface to complex library operations.
 * Requirement #6: Simplify library operations handling Book Borrowing Requests.
 */
public class LibraryFacade {
    private LibraryService library;
    private Approver approvalChain;

    public LibraryFacade() {
        this.library = LibraryService.getInstance();
        
        // Initialize Chain of Responsibility
        Approver librarian = new Librarian();
        Approver manager = new Manager();
        Approver director = new Director();
        
        librarian.setNextApprover(manager);
        manager.setNextApprover(director);
        
        this.approvalChain = librarian;
    }

    public void addBook(String type, String title) {
        BookInterface book = BookFactory.createBook(type, title);
        library.addBook(book);
    }

    public void borrowBook(String title, int days) {
        System.out.println("Requesting to borrow: " + title);
        approvalChain.processRequest(days);
    }
    
    public void registerUser(User user) {
        library.registerObserver(user);
    }
}
