#include "complex.h"
#include <iostream>

using namespace std;

// Use the public accessor methods (getReal(), getImag())
// instead of directly accessing the private members (real, imag).
// because you will need to make it a friend function
// ostream &operator<<(ostream &os, const Complex &c) {
//   os << c.getReal() << " + " << c.getImag() << "i";
//   return os;
// }

// Complex operator+(int lhs, const Complex &rhs) {
//   return Complex(lhs + rhs.getReal(), rhs.getImag());
// }

// int main() {

//   return 0;
// }

// Helper function to print a test result
void print_test_result(const string &description, const Complex &result) {
  cout << "  [Result] " << description << ": " << result << endl;
}

int main() {
  cout << "--- Complex Number Class Test Suite ---" << endl;

  // 1. Initialization and operator<< test
  Complex a(3.0, 4.0);
  Complex b(1.5, -2.5);
  Complex c; // Default constructor (0 + 0i)

  cout << "\n1. Initialization and Display (using operator<<):" << endl;
  cout << "  Complex a: " << a << endl;
  cout << "  Complex b: " << b << endl;
  cout << "  Complex c (default): " << c << endl;

  // 2. Binary Arithmetic Tests
  cout << "\n2. Binary Arithmetic Tests:" << endl;
  Complex sum = a + b;
  print_test_result("a + b (Addition)", sum); // Expected: (3+1.5) + (4-2.5)i = 4.5 + 1.5i

  Complex diff = a - b;
  print_test_result("a - b (Subtraction)", diff); // Expected: (3-1.5) + (4-(-2.5))i = 1.5 + 6.5i

  Complex prod = a * b;
  print_test_result("a * b (Multiplication)", prod); // Expected: (3*1.5 - 4*-2.5) + i(3*-2.5 + 4*1.5) = (4.5 + 10) + i(-7.5 + 6) = 14.5 - 1.5i

  Complex quot = a / b;
  print_test_result("a / b (Division)", quot); // Expected: ~-0.615 + 1.346i

  // 3. Unary and Increment Tests
  cout << "\n3. Unary and Increment/Decrement Tests:" << endl;
  Complex neg_a = -a;
  print_test_result("-a (Negation)", neg_a); // Expected: -3 - 4i

  Complex inc_a = ++a;                             // Pre-increment (acts on real part)
  print_test_result("++a (Pre-increment)", inc_a); // Expected: 4 + 4i

  Complex dec_a = --a;
  print_test_result("--a (Pre-decrement)", dec_a); // Expected: 3 + 4i (back to original)

  // 4. Compound Assignment Tests
  cout << "\n4. Compound Assignment Tests (a starts at 3 + 4i):" << endl;
  Complex d = Complex(2.0, 1.0);
  Complex e = Complex(1.0, 1.0);

  a += d;
  print_test_result("a += d", a); // Expected: (3+2) + (4+1)i = 5 + 5i

  a -= d;
  print_test_result("a -= d", a); // Expected: (5-2) + (5-1)i = 3 + 4i (back to original)

  a *= e;                         // (3+4i)(1+1i) = (3-4) + i(3+4) = -1 + 7i
  print_test_result("a *= e", a); // Expected: -1 + 7i

  a /= e;                         // (-1+7i)/(1+1i) = 3 + 4i
  print_test_result("a /= e", a); // Expected: 3 + 4i (back to original)

  // 5. Comparison Tests
  cout << "\n5. Comparison Tests:" << endl;
  Complex f(3.0, 4.0);
  Complex g(3.0, 5.0);

  cout << "  Is a == f? " << (a == f ? "True" : "False") << endl; // Expected: True
  cout << "  Is a != g? " << (a != g ? "True" : "False") << endl; // Expected: True

  // 6. Chaining operator<<
  cout << "\n6. Operator Chaining Test:" << endl;
  cout << "  Chained Output: " << f << " " << g << " " << d << endl;

  // 7. Make object act like Array or Function
  cout << "\n7. () [] test" << endl;
  Complex c1(3, 4);

  // Modify real part using []
  c1[0] = 100;
  print_test_result("Modified c1 using []", c1); // Expected 100 + 4i:

  // Using () as a function to calculate magnitude
  cout << "  Magnitude of c1 (using functor): " << c1() << endl; // Expected 5:

  // 8. 5 + a
  cout << "\n8. int + Complex Test:" << endl;
  Complex z = 5 + a;
  print_test_result("5 + a", z); // Expected: 8 + 4i

  return 0;
}
