package models;

public class Magazine extends LibraryItem {
  private Integer episode;

  public Magazine(String title, Integer episode, Integer quantity) {
    super(title, quantity);

    this.episode = episode;
  }

  public Integer getEpisode() {
    return episode;
  }

  public void setEpisode(Integer episode) {
    this.episode = episode;
  }

  @Override
  public void getItemDetails() {
    System.out.println("=== Magazine Details ===");
    System.out.println("ID: " + getId());
    System.out.println("Title: " + getTitle());
    System.out.println("Episode: " + episode);
    System.out.println("Stock: " + getAvailableQuantity() + "/" + getTotalQuantity());
  }
}