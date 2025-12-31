#include "point.h"
#include <SDL2/SDL.h>

Point::Point() : x(0), y(0) {};
Point::Point(int x, int y) : x(x), y(y) {};

void Point::setX(int x) {
  this->x = x;
};
void Point::setY(int y) {
  this->y = y;
};

void Point::setPoint(int x, int y) {
  setX(x);
  setY(x);
};

void Point::setPoint(const Point &point) {
  setX(point.getX());
  setY(point.getY());
};

int Point::getX() const {
  return x;
};

int Point::getY() const {
  return y;
};

Point Point::getPoint() const {
  Point point(x, y);
  return point;
};

void Point::draw(SDL_Renderer *rendererPtr) const {
  SDL_Renderer *renderer = static_cast<SDL_Renderer *>(rendererPtr);
  SDL_RenderDrawPoint(renderer, x, y);
}