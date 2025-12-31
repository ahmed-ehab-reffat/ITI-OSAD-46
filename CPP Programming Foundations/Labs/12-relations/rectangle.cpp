#include "rectangle.h"
#include <SDL2/SDL.h>

Rectangle::Rectangle() : upLeft(0, 0), downRight(1, 1) {}

Rectangle::Rectangle(int x1, int y1, int x2, int y2) : upLeft(x1, y1), downRight(x2, y2) {}

Rectangle::Rectangle(const Point &upLeft, const Point &downRight) : upLeft(upLeft), downRight(downRight) {}

void Rectangle::setUpLeft(int x, int y) {
  upLeft.setPoint(x, y);
}
void Rectangle::setUpLeft(const Point &point) {
  upLeft.setPoint(point);
}
void Rectangle::setDownRight(int x, int y) {
  downRight.setPoint(x, y);
}
void Rectangle::setDownRight(const Point &point) {
  downRight.setPoint(point);
}
void Rectangle::setRectangle(int x1, int y1, int x2, int y2) {
  upLeft.setPoint(x1, y1);
  downRight.setPoint(x2, y2);
}
void Rectangle::setRectangle(const Point &start, const Point &end) {
  upLeft.setPoint(start);
  downRight.setPoint(end);
}

Point Rectangle::getUpLeft() const {
  return upLeft.getPoint();
}
Point Rectangle::getDownRight() const {
  return downRight.getPoint();
}
Rectangle Rectangle::getRectangle() const {
  return Rectangle(upLeft, downRight);
}

void Rectangle::draw(SDL_Renderer *rendererPtr) const {
  SDL_Rect r;

  r.x = upLeft.getX();
  r.y = upLeft.getY();
  r.w = downRight.getX() - upLeft.getX();
  r.h = downRight.getY() - upLeft.getY();

  SDL_RenderDrawRect(rendererPtr, &r);
}