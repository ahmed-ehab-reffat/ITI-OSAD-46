package models;

import java.util.ArrayList;

public class Client {
  private Integer id;
  private String name;
  private String email;
  private ArrayList<LibraryItem> borrowedItems;

  private static int counter = 0;

  public Client(String name, String email) {
    id = ++counter;
    this.name = name;
    this.email = email;
    this.borrowedItems = new ArrayList<>();
  }

  public void getClientDetails() {
    System.out.println("=== Client Details ====");
    System.out.println("ID: " + id);
    System.out.println("Name: " + name);
    System.out.println("Email: " + email);
    System.out.print("Borrowed Items: [");
    borrowedItems.forEach(item -> {
      System.out.print(" ID: ");
      System.out.print(item.getId());
      System.out.print(" - Title: ");
      System.out.print(item.getTitle());
    });
    System.out.println(" ]");
  }

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Boolean borrowItem(LibraryItem item) {
    if (borrowedItems.contains(item)) {
      return false;
    }
    borrowedItems.add(item);
    return true;
  }

  public Boolean returnItem(LibraryItem item) {
    return borrowedItems.remove(item);
  }

  public Boolean hasItem() {
    return borrowedItems.size() > 0;
  }
}
