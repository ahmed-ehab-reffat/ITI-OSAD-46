#include "geoShape.h"

GeoShape::GeoShape() : dim1(0), dim2(0) {}
GeoShape::GeoShape(double dim1, double dim2) : dim1(dim1), dim2(dim2) {}

void GeoShape::setDimension1(double d1) {
  dim1 = d1;
}
void GeoShape::setDimension2(double d2) {
  dim2 = d2;
}
double GeoShape::getDimension1() const {
  return dim1;
}
double GeoShape::getDimension2() const {
  return dim2;
}