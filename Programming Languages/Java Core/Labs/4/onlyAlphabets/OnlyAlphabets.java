import java.util.Scanner;
import java.lang.Character;

public class OnlyAlphabets {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.println("Enter a word to check if it contains only alphabets");
    String word = scanner.nextLine();

    boolean onlyAlphabets = true;
    for (int i = 0; i < word.length() && onlyAlphabets; i++) {
      onlyAlphabets = Character.isLetter(word.charAt(i));
    }

    if (onlyAlphabets) {
      System.out.println("The input " + word + " contains alphabets only");
    } else {
      System.out.println("The input " + word + " doesn't contain alphabets only");
    }

    scanner.close();
  }
}