#ifndef CIRCLE_H_INCLUDED
#define CIRCLE_H_INCLUDED

#include "point.h"
#include "shape.h"
#include <SDL2/SDL.h>

class Circle : public Shape {
  private:
  Point center;
  int radius;

  public:
  Circle();
  Circle(int x, int y, int r);
  Circle(const Point &center, int r);

  void setCenter(int x, int y);
  void setCenter(const Point &point);
  void setRadius(int r);
  void setCircle(int x, int y, int r);
  void setCircle(const Point &center, int r);

  Point getCenter() const;
  int getRadius() const;
  Circle getCircle() const;

  void draw(SDL_Renderer *renderer) const;
};

#endif // CIRCLE_H_INCLUDED