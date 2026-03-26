#ifndef POINT_H_INCLUDED
#define POINT_H_INCLUDED

#include <SDL2/SDL.h>

class Point {
  private:
  int x;
  int y;

  public:
  Point();
  Point(int x, int y);

  void setX(int x);
  void setY(int y);
  void setPoint(int x, int y);
  void setPoint(const Point &point);

  int getX() const;
  int getY() const;
  Point getPoint() const;

  void draw(SDL_Renderer *renderer) const;
};

#endif // POINT_H_INCLUDED