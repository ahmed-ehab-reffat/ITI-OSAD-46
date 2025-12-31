public class Complex<T extends Number> {
  private T real;
  private T imaginary;

  public Complex(T real, T imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  public T getReal() {
    return real;
  }

  public T getImaginary() {
    return imaginary;
  }

  public void print() {
    System.out.println(real + " + " + imaginary + "i");
  }

  public Complex<Double> add(Complex<T> other) {
    double newReal = real.doubleValue() + other.getReal().doubleValue();
    double newImaginary = imaginary.doubleValue() + other.getImaginary().doubleValue();
    return new Complex<>(newReal, newImaginary);
  }

  public Complex<Double> subtract(Complex<T> other) {
    double newReal = real.doubleValue() - other.getReal().doubleValue();
    double newImaginary = imaginary.doubleValue() - other.getImaginary().doubleValue();
    return new Complex<>(newReal, newImaginary);
  }
}
