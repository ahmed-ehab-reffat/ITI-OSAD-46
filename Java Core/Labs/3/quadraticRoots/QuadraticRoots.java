import java.util.function.Function;

public class QuadraticRoots {

  public static void main(String[] args) {

    Function<Coefficients, Roots> calculateRoots = coeffs -> {

      Roots roots = new Roots();
      double a = coeffs.getA();
      double b = coeffs.getB();
      double c = coeffs.getC();
      double discriminant = b * b - 4 * a * c;

      if (discriminant > 0) {
        double root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        double root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        roots.setRoot1(root1);
        roots.setRoot2(root2);
      } else if (discriminant == 0) {
        double root = -b / (2 * a);
        roots.setRoot1(root);
        roots.setRoot2(root);
      } else {
        double real = -b / (2 * a);
        double imaginary = Math.sqrt(-discriminant) / (2 * a);

        roots.setRoot1(real);
        roots.setRoot2(imaginary);
        roots.setIsImeginary(true);
      }

      return roots;
    };

    Coefficients eq1 = new Coefficients(1, -3, 2); // Roots: 1.0, 2.0
    Roots roots1 = calculateRoots.apply(eq1);
    System.out.println("Roots for (1, -3, 2): " + roots1.getRoots());

    Coefficients eq2 = new Coefficients(1, 4, 4); // Root: -2.0
    Roots roots2 = calculateRoots.apply(eq2);
    System.out.println("Roots for (1, 4, 4): " + roots2.getRoots());

    Coefficients eq3 = new Coefficients(1, 1, 1); // No real roots
    Roots roots3 = calculateRoots.apply(eq3);
    System.out.println("Roots for (1, 1, 1): " + roots3.getRoots());
  }
}
