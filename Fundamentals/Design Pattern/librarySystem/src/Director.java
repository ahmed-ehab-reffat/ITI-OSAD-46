public class Director extends Approver {
    @Override
    public void processRequest(int days) {
        System.out.println("Director: Approved borrowing for " + days + " days.");
    }
}
