public class TestException {
  public static void main(String[] args) {
    String valid = "ahmed";
    // String inValid = "Ahmed";

    Greetings greeting = new Greetings();

    try {
      System.out.println(greeting.hello(valid));
    } catch (UpperCaseException e) {
      e.printStackTrace();
    } finally {
      System.out.println("Finally");
    }
  }
}
