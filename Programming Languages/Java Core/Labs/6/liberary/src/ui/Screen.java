package ui;

import java.util.Scanner;

public class Screen {
  public static void clear() {
    System.out.print("\033[2J");
    System.out.print("\033[0;0H");
    System.out.flush();
  }

  public static void goBack() {
    Scanner scanner = new Scanner(System.in);
    System.out.println("\nPress Enter to continue!");
    scanner.nextLine();
  }
}
