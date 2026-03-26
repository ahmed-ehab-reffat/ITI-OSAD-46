package utils;

import java.util.Scanner;
import java.util.regex.Pattern;

public class Validation {

  public static boolean isValidName(String name) {
    Pattern namePattern = Pattern.compile("^[a-zA-Z ]+$");
    return namePattern.matcher(name).matches();
  }

  public static String getName() {
    Scanner scanner = new Scanner(System.in);
    String name;

    while (true) {

      name = scanner.nextLine().trim();

      if (isValidName(name)) {
        return name;
      }

      System.out.println("Invalid input!");
      System.out.print("Try again: ");
    }
  }

  public static boolean isValidEmail(String email) {
    Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
    return emailPattern.matcher(email).matches();
  }

  public static String getEmail() {
    Scanner scanner = new Scanner(System.in);
    String email;

    while (true) {

      email = scanner.nextLine().trim();

      if (isValidEmail(email)) {
        return email;
      }

      System.out.println("Invalid input!");
      System.out.print("Try again: ");
    }
  }

  public static int getInt() {
    Scanner scanner = new Scanner(System.in);
    int value;

    while (true) {
      try {
        value = Integer.parseInt(scanner.nextLine().trim());

        if (value < 0) {
          throw new NumberFormatException();
        }

        return value;
      } catch (NumberFormatException ignored) {
      }

      System.out.println("Invalid input!");
      System.out.print("Try again: ");
    }
  }
}
