public class CheckInput {
  public static void main(String[] args) {
    String name = "Ahmed";

    if (args.length > 0) {
      if (name.equals(args[0])) {
        System.out.println("Correct!");
      } else {
        System.out.println("Wrong!");
      }
      System.out.println(args[0]);
    } else {
      System.out.println("Error: No input provided.");
    }
  }
}
