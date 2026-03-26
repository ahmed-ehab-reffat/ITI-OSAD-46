#ifndef RECTANGLE_H_INCLUDED
#define RECTANGLE_H_INCLUDED

#include "line.h"
#include "point.h"
#include "shape.h"
#include <SDL2/SDL.h>

class Rectangle : public Shape {
  Point upLeft;
  Point downRight;

  public:
  Rectangle();
  Rectangle(int x1, int y1, int x2, int y2);
  Rectangle(const Point &upLeft, const Point &downRight);

  void setUpLeft(int x, int y);
  void setUpLeft(const Point &point);
  void setDownRight(int x, int y);
  void setDownRight(const Point &point);
  void setRectangle(int x1, int y1, int x2, int y2);
  void setRectangle(const Point &start, const Point &end);

  Point getUpLeft() const;
  Point getDownRight() const;
  Rectangle getRectangle() const;

  void draw(SDL_Renderer *renderer) const;
};

#endif // RECTANGLE_H_INCLUDED