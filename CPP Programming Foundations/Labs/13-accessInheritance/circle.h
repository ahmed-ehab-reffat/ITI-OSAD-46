#ifndef CIRCLE_H_INCLUDED
#define CIRCLE_H_INCLUDED

#include "geoShape.h"

class Circle : private GeoShape {
  public:
  Circle();
  Circle(double radius);

  void setRadius(double radius);
  double getRadius() const;

  double area() const override;
};

#endif // CIRCLE_H_INCLUDED