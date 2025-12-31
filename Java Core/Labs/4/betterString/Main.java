public class Main {
  public static void main(String[] args) {

    StringUtils stringUtils = new StringUtils();

    String s1 = "ahmed";
    String s2 = "ziad";

    String longer = stringUtils.betterString(s1, s2, (str1, str2) -> str1.length() > str2.length());
    String first = stringUtils.betterString(s1, s2, (str1, str2) -> false);

    System.out.println(longer);
    System.out.println(first);

  }

  // StringFunction print() {
  // return (str1, str2) -> true;
  // }

  // StringFunction prit() {
  // return (str1, str2) -> false;
  // }

}
