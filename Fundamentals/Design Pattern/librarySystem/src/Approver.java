/**
 * Chain of Responsibility: Abstract handler for borrowing requests.
 */
public abstract class Approver {
    protected Approver nextApprover;

    public void setNextApprover(Approver nextApprover) {
        this.nextApprover = nextApprover;
    }

    public abstract void processRequest(int days);
}
