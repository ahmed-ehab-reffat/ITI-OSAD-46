#ifndef TRIANGLE_H_INCLUDED
#define TRIANGLE_H_INCLUDED

#include "geoShape.h"

class Triangle : public GeoShape {
  public:
  Triangle();
  Triangle(double base, double height);

  void setBase(double base);
  void setHeight(double height);
  double getBase() const;
  double getHeight() const;

  double area() const override;
};

#endif // TRIANGLE_H_INCLUDED