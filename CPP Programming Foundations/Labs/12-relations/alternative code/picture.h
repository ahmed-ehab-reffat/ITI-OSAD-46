#ifndef PICTURE_H_INCLUDED
#define PICTURE_H_INCLUDED

#include "circle.h"
#include "line.h"
#include "rectangle.h"
#include <SDL2/SDL.h>

class Picture {
  private:
  int circlesCount;
  int rectanglesCount;
  int linesCount;
  Circle *cptr;
  Rectangle *rptr;
  Line *lptr;

  void copyShapes(const Picture &other);
  void clearShapes();

  public:
  Picture();
  Picture(int cC, int rC, int lC, Circle *cptr, Rectangle *rptr, Line *lptr);
  Picture(const Picture &other);

  ~Picture();

  Picture &operator=(const Picture &other);

  void setCircles(int circlesCount, Circle *cptr);
  void setRectangles(int rectanglesCount, Rectangle *rptr);
  void setLines(int linesCount, Line *lptr);

  int getCirclesCount() const;
  Circle *getCircles() const;
  int getRectanglesCount() const;
  Rectangle *getRectangles() const;
  int getLinesCount() const;
  Line *getLines() const;

  void draw(SDL_Renderer *renderer);
};

#endif // PICTURE_H_INCLUDED