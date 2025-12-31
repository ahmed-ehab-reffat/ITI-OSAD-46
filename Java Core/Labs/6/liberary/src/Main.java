import java.util.Scanner;
import ui.DisplayMenu;
import ui.Screen;
import utils.ItemNotFoundException;
import core.ClientsManager;
import core.LibraryManager;
import models.Client;
import models.LibraryItem;
import interfaces.CRUD;

public class Main {

  static CRUD<LibraryItem> libraryManager = new LibraryManager();
  static CRUD<Client> clientsManager = new ClientsManager();

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    while (true) {
      int choice = DisplayMenu.main();

      switch (choice) {
        case 1:
          libraryManager.run();
          break;
        case 2:
          clientsManager.run();
          break;
        case 3:
          BorrowItem();
          break;
        case 4:
          returnItem();
          break;
        case 0:
          System.out.println("Good Bye!");
          scanner.close();
          return;
        default:
          break;
      }
    }
  }

  public static void BorrowItem() {
    try {
      Client client = clientsManager.retrieve();
      LibraryItem item = libraryManager.retrieve();

      if (item.borrowItem() == false) {
        System.out.println("Item is out of stock!");
        Screen.goBack();
        return;
      }

      if (client.borrowItem(item) == false) {
        System.out.println("Item is already borrowed!");
        item.returnItem();
        Screen.goBack();
        return;
      }

      System.out.println("Item borrowed successfully!");
      Screen.goBack();

    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
      Screen.goBack();
    }
  }

  public static void returnItem() {
    try {
      Client client = clientsManager.retrieve();
      LibraryItem item = libraryManager.retrieve();

      if (item.returnItem() == false) {
        System.out.println("Item has not been borrowed!");
        Screen.goBack();
        return;
      }

      if (client.returnItem(item) == false) {
        System.out.println("Client didn't borrow this item!");
        item.returnItem();
        Screen.goBack();
        return;
      }

      System.out.println("Item returned successfully!");
      Screen.goBack();

    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
      Screen.goBack();
    }
  }

}