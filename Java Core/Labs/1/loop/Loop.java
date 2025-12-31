public class Loop {
  public static void main(String[] args) {
    if (args.length > 1) {
      int number = Integer.parseInt(args[0]);
      String text = args[1];

      for (int i = 0; i < number; i++) {
        System.out.println(text);
      }
    } else {
      System.out.println("Error: Noy enough inputs provided.");
    }
  }
}
