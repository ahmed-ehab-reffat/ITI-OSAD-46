package ui;

import utils.Validation;

public class DisplayMenu {
  public static int main() {
    Screen.clear();

    System.out.println("===== Main Menu =====");
    System.out.println("1. Library managment");
    System.out.println("2. Clients managment");
    System.out.println("3. Borrow Item");
    System.out.println("4. Return Item");
    System.out.println("0. Exit");
    System.out.print("Enter your choice: ");

    int choice = Validation.getInt();

    while (choice > 4) {
      System.out.println("Invalid input!");
      System.out.print("Try again: ");
      choice = Validation.getInt();
    }

    Screen.clear();

    return choice;
  }

  public static int library() {
    Screen.clear();

    System.out.println("===== Library System =====");
    System.out.println("1. Add Item");
    System.out.println("2. Update Item");
    System.out.println("3. Delete Item");
    System.out.println("4. View Item Details");
    System.out.println("5. View All Items Details");
    System.out.println("0. Back to Main Menu");
    System.out.print("Enter your choice: ");

    int choice = Validation.getInt();

    while (choice > 5) {
      System.out.println("Invalid input!");
      System.out.print("Try again: ");
      choice = Validation.getInt();
    }

    Screen.clear();

    return choice;
  }

  public static int clientsManager() {
    Screen.clear();

    System.out.println("===== Clients Manager =====");
    System.out.println("1. Add Client");
    System.out.println("2. Update Client");
    System.out.println("3. Delete Client");
    System.out.println("4. View Client Details");
    System.out.println("5. View All Clients Details");
    System.out.println("0. Back to Main Menu");
    System.out.print("Enter your choice: ");

    int choice = Validation.getInt();

    while (choice > 5) {
      System.out.println("Invalid input!");
      System.out.print("Try again: ");
      choice = Validation.getInt();
    }

    Screen.clear();

    return choice;
  }
}