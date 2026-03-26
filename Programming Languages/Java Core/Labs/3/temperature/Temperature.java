import java.util.function.Function;

public class Temperature {

  public static boolean isValidDouble(String str) {
    if (str == null || str.isEmpty()) {
      return false;
    }
    return str.matches("[-+]?\\d*\\.?\\d+([eE][-+]?\\d+)?");
  }

  public static void main(String[] args) {

    Function<Double, Double> converter = degree -> (degree * 9 / 5) + 32;

    if (args.length > 0) {
      if (!isValidDouble(args[0])) {
        System.out.println("Invalid input!");
        return;
      }
    }

    double centigrade;
    centigrade = Double.parseDouble(args[0]);
    double fahrenheit = converter.apply(centigrade);

    System.out.println(fahrenheit);
  }
}
