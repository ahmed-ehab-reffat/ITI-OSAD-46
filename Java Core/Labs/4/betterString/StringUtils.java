public class StringUtils {
  public String betterString(String str1, String str2, StringFunction f) {
    boolean better = f.apply(str1, str2);

    if (better) {
      return str1;
    }

    return str2;
  }
}
