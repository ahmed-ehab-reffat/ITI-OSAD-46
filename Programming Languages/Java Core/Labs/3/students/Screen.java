import java.util.Scanner;

public class Screen {
  private Scanner scanner = new Scanner(System.in);

  public void clear() {
    System.out.print("\033[2J");
    System.out.print("\033[0;0H");
    System.out.flush();
  }

  public void goBack() {
    System.out.println("Press Enter to continue!");
    scanner.nextLine();
  }
}
