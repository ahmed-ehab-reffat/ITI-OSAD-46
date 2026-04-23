public class Manager extends Approver {
    @Override
    public void processRequest(int days) {
        if (days <= 14) {
            System.out.println("Manager: Approved borrowing for " + days + " days.");
        } else if (nextApprover != null) {
            nextApprover.processRequest(days);
        }
    }
}
