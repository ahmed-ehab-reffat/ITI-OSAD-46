#ifndef SQUARE_H_INCLUDED
#define SQUARE_H_INCLUDED

#include "rectangle.h"

class Square : private Rectangle {
  public:
  Square();
  Square(double side);

  void setSide(double side);
  double getSide() const;

  double area() const;
};

#endif // SQUARE_H_INCLUDED