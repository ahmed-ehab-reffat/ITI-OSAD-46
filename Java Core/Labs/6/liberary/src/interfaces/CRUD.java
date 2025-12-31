package interfaces;

public interface CRUD<T> {
  void run();

  void add();

  T retrieve();

  void display();

  void displayAll();

  void update();

  void delete();
}
