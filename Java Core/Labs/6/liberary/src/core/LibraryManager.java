package core;

import java.util.ArrayList;
import java.util.Scanner;

import interfaces.CRUD;
import models.*;
import ui.*;
import utils.*;

public class LibraryManager implements CRUD<LibraryItem> {
  private static ArrayList<LibraryItem> items = new ArrayList<>();

  public void run() {

    while (true) {
      int choice = DisplayMenu.library();

      switch (choice) {
        case 1:
          add();
          break;
        case 2:
          update();
          break;
        case 3:
          delete();
          break;
        case 4:
          display();
          break;
        case 5:
          displayAll();
          break;
        case 0:
          return;
        default:
          break;
      }
      Screen.goBack();
    }
  }

  public void add() {
    Scanner scanner = new Scanner(System.in);

    System.out.print("Type (Book / Magazine): ");
    String type = scanner.nextLine().trim();

    while (!type.equalsIgnoreCase("Book") && !type.equalsIgnoreCase("Magazine")) {
      System.out.println("Invalid input!");
      System.out.print("Type (Book / Magazine): ");
      type = scanner.nextLine().trim();
    }

    System.out.print("Title: ");
    String title = scanner.nextLine().trim();

    System.out.print("Quantity : ");
    int quantity = Validation.getInt();

    if (type.equalsIgnoreCase("Book")) {
      System.out.print("Author : ");
      String author = scanner.nextLine().trim();

      LibraryItem item = new Book(title, author, quantity);
      items.add(item);
    }

    if (type.equalsIgnoreCase("Magazine")) {
      System.out.print("Episode : ");
      int episode = Validation.getInt();

      LibraryItem item = new Magazine(title, episode, quantity);
      items.add(item);
    }

    System.out.println("\nItem has been added successfuly!");
    items.get(items.size() - 1).getItemDetails();
  }

  public LibraryItem retrieve() throws ItemNotFoundException {
    System.out.print("Enter item ID: ");
    int id = Validation.getInt();

    return items.stream()
        .filter(item -> item.getId() == id)
        .findFirst()
        .orElseThrow(() -> new ItemNotFoundException());
  }

  public void display() {
    if (items.size() == 0) {
      System.out.println("Library is empty!");
      return;
    }

    try {
      retrieve().getItemDetails();
    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }

  public void displayAll() {
    if (items.size() == 0) {
      System.out.println("Library is empty!");
      return;
    }

    items.forEach(item -> item.getItemDetails());

  }

  public void update() {
    if (items.size() == 0) {
      System.out.println("Library is empty!");
      return;
    }

    Scanner scanner = new Scanner(System.in);

    try {
      LibraryItem item = retrieve();

      item.getItemDetails();

      System.out.print("\nEnter the new data\n");

      System.out.print("Title: ");
      String title = scanner.nextLine().trim();
      item.setTitle(title);

      System.out.print("Quantity: ");
      Integer quantity = Validation.getInt();
      item.setTotalQuantity(quantity);

      if (item instanceof Book) {
        System.out.print("Author : ");
        String author = scanner.nextLine().trim();
        ((Book) item).setAuthor(author);
      }

      if (item instanceof Magazine) {
        System.out.print("Episode : ");
        int episode = Validation.getInt();
        ((Magazine) item).setEpisode(episode);
      }

      System.out.println("\nItem has been updated successfuly!");
      item.getItemDetails();

    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }

  public void delete() {
    if (items.size() == 0) {
      System.out.println("Library is empty!");
      return;
    }

    try {
      LibraryItem item = retrieve();

      if (item.getTotalQuantity() != item.getAvailableQuantity()) {
        System.out.println("\nItem can't be deleted!");
        System.out.println("Not all copies have been returned!");
        return;
      }

      items.remove(item);
      System.out.println("\nItem has been deleted successfuly!");
    } catch (ItemNotFoundException e) {
      System.out.println(e.getMessage());
    }
  }
}