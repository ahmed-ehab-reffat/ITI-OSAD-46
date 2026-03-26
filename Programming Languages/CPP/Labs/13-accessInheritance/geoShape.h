#ifndef GEOSHAPE_H_INCLUDED
#define GEOSHAPE_H_INCLUDED

class GeoShape {
  protected:
  double dim1, dim2;

  public:
  GeoShape();
  GeoShape(double dim1, double dim2);
  virtual ~GeoShape() = default;

  void setDimension1(double d1);
  void setDimension2(double d2);
  double getDimension1() const;
  double getDimension2() const;

  virtual double area() const = 0;
};

#endif // GEOSHAPE_H_INCLUDED