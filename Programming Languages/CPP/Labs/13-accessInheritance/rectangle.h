#ifndef RECTANGLE_H_INCLUDED
#define RECTANGLE_H_INCLUDED

#include "geoShape.h"

class Rectangle : public GeoShape {
  public:
  Rectangle();
  Rectangle(double width, double height);

  void setWidth(double width);
  void setHeight(double height);
  double getWidth() const;
  double getHeight() const;

  double area() const override;
};

#endif // RECTANGLE_H_INCLUDED