public class Greetings {
  public String hello(String name) throws UpperCaseException {
    String temp = name.toLowerCase();
    if (name != temp) {
      throw new UpperCaseException();
    }
    return "Hello " + name + "!";
  }

  public String goodEvening(String name) throws UpperCaseException {
    String temp = name.toLowerCase();
    if (name != temp) {
      throw new UpperCaseException();
    }
    return "Hello " + name + "!";
  }

  public String wellDone(String name) throws UpperCaseException {
    String temp = name.toLowerCase();
    if (name != temp) {
      throw new UpperCaseException();
    }
    return "Hello " + name + "!";
  }
}
