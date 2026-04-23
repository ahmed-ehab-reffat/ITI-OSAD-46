public class Librarian extends Approver {
    @Override
    public void processRequest(int days) {
        if (days <= 7) {
            System.out.println("Librarian: Approved borrowing for " + days + " days.");
        } else if (nextApprover != null) {
            nextApprover.processRequest(days);
        }
    }
}
