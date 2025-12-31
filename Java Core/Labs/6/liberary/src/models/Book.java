package models;

public class Book extends LibraryItem {
  private String author;

  public Book(String title, String author, Integer quantity) {
    super(title, quantity);

    this.author = author;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  @Override
  public void getItemDetails() {
    System.out.println("=== Book Details ===");
    System.out.println("ID: " + getId());
    System.out.println("Title: " + getTitle());
    System.out.println("Author: " + author);
    System.out.println("Stock: " + getAvailableQuantity() + "/" + getTotalQuantity());
  }
}