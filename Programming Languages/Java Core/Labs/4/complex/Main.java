public class Main {
  public static void main(String[] args) {
    Complex<Double> numDouble = new Complex<>(2.0, 3.0);

    Complex<Integer> numInt1 = new Complex<>(2, 3);
    Complex<Integer> numInt2 = new Complex<>(8, 4);

    numDouble.print();
    numInt1.print();

    Complex<Double> sumInt = numInt1.add(numInt2);

    sumInt.print();
  }
}
