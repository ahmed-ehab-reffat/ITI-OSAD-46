#ifndef COMPLEX_H_INCLUDED
#define COMPLEX_H_INCLUDED

#include <iostream>

class Complex {
  private:
  double real;
  double imag;

  public:
  Complex();
  Complex(double r);
  Complex(double r, double i);
  Complex(const Complex &c);

  void setReal(double r);
  void setImag(double i);

  double getReal() const;
  double getImag() const;

  Complex operator+(const Complex &other) const;
  Complex operator-(const Complex &other) const;
  Complex operator*(const Complex &other) const;
  Complex operator/(const Complex &other) const;

  Complex &operator+=(const Complex &rhs);
  Complex &operator-=(const Complex &rhs);
  Complex &operator*=(const Complex &rhs);
  Complex &operator/=(const Complex &rhs);

  Complex operator-() const;
  Complex &operator++();
  Complex &operator--();

  Complex &operator=(const Complex &other);

  bool operator==(const Complex &other) const;
  bool operator!=(const Complex &other) const;

  double &operator[](int index);

  double operator()() const;

  void display() const;

  static Complex add(int lhs, const Complex &rhs);

  friend std::ostream &operator<<(std::ostream &os, const Complex &c);

  friend Complex operator+(int lhs, const Complex &rhs);
};

#endif // COMPLEX_H_INCLUDED