#include "complex.h"
#include <cmath>
#include <iostream>

Complex::Complex() : real(0), imag(0) {};
Complex::Complex(double r) : real(r), imag(0) {};
Complex::Complex(double r, double i) : real(r), imag(i) {};
Complex::Complex(const Complex &c) : real(c.real), imag(c.imag) {}

void Complex::setReal(double r) {
  real = r;
};
void Complex::setImag(double i) {
  imag = i;
};

double Complex::getReal() const {
  return real;
};
double Complex::getImag() const {
  return imag;
};

Complex Complex::operator+(const Complex &other) const {
  return Complex(real + other.real, imag + other.imag);
};
Complex Complex::operator-(const Complex &other) const {
  return Complex(real - other.real, imag - other.imag);
};

// (a + ib) (c + id) = ac + iad + ibc + i^2bd
// (a + ib) (c + id) = (ac - bd) + i(ad + bc) [Because i^2 = -1]
Complex Complex::operator*(const Complex &other) const {
  double r = real * other.real - imag * other.imag;
  double i = real * other.imag + imag * other.real;
  return Complex(r, i);
};

/*
z1/z2
=a+ib/c+id
=a+ib/c+id×c−id/c−id
=(a+ib)(c−id)/c^2−(id)^2
=ac−iad+ibc−i^2bd/c^2−(−1)d^2
=ac−iad+ibc+bd/c^2+d^2
=(ac+bd)+i(bc−ad)/c^2+d^2
=ac+bd/c^2+d^2+i(bc−ad/c^2+d^2)
*/
Complex Complex::operator/(const Complex &other) const {
  double r = (real * other.real + imag * other.imag) / (other.real * other.real + other.imag * other.imag);
  double i = (imag * other.real - real * other.imag) / (other.real * other.real + other.imag * other.imag);
  return Complex(r, i);
};

// Return reference to allow (a += b)
Complex &Complex::operator+=(const Complex &rhs) {
  this->real += rhs.real;
  this->imag += rhs.imag;
  return *this;
}

Complex &Complex::operator-=(const Complex &rhs) {
  this->real -= rhs.real;
  this->imag -= rhs.imag;
  return *this;
}

Complex &Complex::operator*=(const Complex &rhs) {
  double r = this->real;
  double i = this->imag;

  this->real = r * rhs.real - i * rhs.imag;
  this->imag = r * rhs.imag + i * rhs.real;

  return *this;
}

Complex &Complex::operator/=(const Complex &rhs) {
  double r = this->real;
  double i = this->imag;
  this->real = (r * rhs.real + i * rhs.imag) / (rhs.real * rhs.real + rhs.imag * rhs.imag);
  this->imag = (i * rhs.real - r * rhs.imag) / (rhs.real * rhs.real + rhs.imag * rhs.imag);
  return *this;
}

Complex Complex::operator-() const {
  return Complex(-real, -imag);
}

Complex &Complex::operator++() {
  ++real;
  return *this;
}

Complex &Complex::operator--() {
  --real;
  return *this;
}

Complex &Complex::operator=(const Complex &other) {
  if (this == &other) {
    return *this;
  }

  real = other.real;
  imag = other.imag;
  return *this;
}

bool Complex::operator==(const Complex &other) const {
  return real == other.real && imag == other.imag;
};
bool Complex::operator!=(const Complex &other) const {
  return real != other.real || imag != other.imag;
};

double &Complex::operator[](int index) {
  if (index == 0)
    return real;
  if (index == 1)
    return imag;
  throw std::out_of_range("Index must be 0 or 1");
}

double Complex::operator()() const {
  return std::sqrt(real * real + imag * imag);
}

void Complex::display() const {
  std::cout << real << " + " << imag << "i" << std::endl;
};

Complex Complex::add(int lhs, const Complex &rhs) {
  return Complex(lhs + rhs.real, rhs.imag);
}

std::ostream &operator<<(std::ostream &os, const Complex &c) {
  os << c.getReal() << " + " << c.getImag() << "i";
  return os;
}

Complex operator+(int lhs, const Complex &rhs) {
  return Complex(lhs + rhs.getReal(), rhs.getImag());
}