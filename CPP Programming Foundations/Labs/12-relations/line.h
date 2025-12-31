#ifndef LINE_H_INCLUDED
#define LINE_H_INCLUDED

#include "point.h"
#include "shape.h"
#include <SDL2/SDL.h>

class Line : public Shape {
  Point start;
  Point end;

  public:
  Line();
  Line(const Point &start, const Point &end);
  Line(int x1, int y1, int x2, int y2);

  void setStart(const Point &point);
  void setStart(int x, int y);
  void setEnd(const Point &point);
  void setEnd(int x, int y);
  void setLine(const Point &start, const Point &end);
  void setLine(int x1, int y1, int x2, int y2);

  Point getStart() const;
  Point getEnd() const;
  Line getLine() const;

  void draw(SDL_Renderer *renderer) const;
};

#endif // LINE_H_INCLUDED