#ifndef SHAPE_H_INCLUDED
#define SHAPE_H_INCLUDED

#include <SDL2/SDL.h>

class Shape {

  public:
  virtual ~Shape() = default;
  virtual void draw(SDL_Renderer *renderer) const = 0;
};

#endif // SHAPE_H_INCLUDED