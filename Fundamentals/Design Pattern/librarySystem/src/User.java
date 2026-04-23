/**
 * The User class now implements Observer to receive notifications.
 */
public class User implements Observer {
    private String name;

    public User(String name, boolean isPremium) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public void update(String message) {
        System.out.println("Notification for " + name + ": " + message);
    }
}
