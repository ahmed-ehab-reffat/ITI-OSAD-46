package models;

public abstract class LibraryItem {
  private Integer id;
  private String title;
  private Integer totalQuantity;
  private Integer availableQuantity;
  private static int counter = 0;

  public LibraryItem(String title, Integer totalQuantity) {
    this.id = ++counter;
    this.title = title;
    this.totalQuantity = totalQuantity;
    this.availableQuantity = totalQuantity;
  }

  public Integer getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public Integer getTotalQuantity() {
    return totalQuantity;
  }

  public Integer getAvailableQuantity() {
    return availableQuantity;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Boolean setTotalQuantity(Integer totalQuantity) {
    Integer borrowed = this.totalQuantity - this.availableQuantity;

    if (totalQuantity < borrowed) {
      return false;
    }

    this.totalQuantity = totalQuantity;
    this.availableQuantity = totalQuantity - borrowed;
    return true;
  }

  public Boolean borrowItem() {
    if (availableQuantity == 0) {
      return false;
    }
    availableQuantity--;
    return true;
  }

  public Boolean returnItem() {
    if (availableQuantity == totalQuantity) {
      return false;
    }
    availableQuantity++;
    return true;
  }

  public abstract void getItemDetails();
}
