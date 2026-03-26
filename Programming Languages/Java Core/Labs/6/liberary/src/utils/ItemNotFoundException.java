package utils;

public class ItemNotFoundException extends IndexOutOfBoundsException {
  public ItemNotFoundException() {
    super("Item not found!");
  }
}
