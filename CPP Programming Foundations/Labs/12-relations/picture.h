#ifndef PICTURE_H_INCLUDED
#define PICTURE_H_INCLUDED

#include "shape.h"
#include <SDL2/SDL.h>

class Picture {
  private:
  Shape **shapes;
  int shapeCount;
  int shapeCapacity;

  public:
  Picture();
  ~Picture();

  void addShape(Shape *shape);

  void draw(SDL_Renderer *renderer) const;

  void clear();

  int getShapeCount() const;
};

#endif // PICTURE_H_INCLUDED
