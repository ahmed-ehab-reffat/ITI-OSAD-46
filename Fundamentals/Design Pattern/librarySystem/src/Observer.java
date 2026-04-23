/**
 * Part of the Observer Pattern.
 * Any class that wants to be notified of library updates must implement this.
 */
public interface Observer {
    void update(String message);
}
