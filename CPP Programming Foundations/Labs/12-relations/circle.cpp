#include "circle.h"

Circle::Circle() : center(), radius(0) {}

Circle::Circle(int x, int y, int r) : center(x, y), radius(r) {}

Circle::Circle(const Point &center, int r) : center(center), radius(r) {}

void Circle::setCenter(int x, int y) {
  center.setPoint(x, y);
}

void Circle::setCenter(const Point &point) {
  center.setPoint(point);
}

void Circle::setRadius(int r) {
  radius = r;
}

void Circle::setCircle(int x, int y, int r) {
  setCenter(x, y);
  setRadius(r);
}

void Circle::setCircle(const Point &center, int r) {
  setCenter(center);
  setRadius(r);
}

Point Circle::getCenter() const {
  return center.getPoint();
}

int Circle::getRadius() const {
  return radius;
}

Circle Circle::getCircle() const {
  return Circle(center, radius);
}

void Circle::draw(SDL_Renderer *renderer) const {
  int x = radius;
  int y = 0;
  int d = 1 - radius;

  while (x >= y) {
    // 8-way symmetry
    SDL_RenderDrawPoint(renderer, center.getX() + x, center.getY() + y);
    SDL_RenderDrawPoint(renderer, center.getX() + y, center.getY() + x);
    SDL_RenderDrawPoint(renderer, center.getX() - y, center.getY() + x);
    SDL_RenderDrawPoint(renderer, center.getX() - x, center.getY() + y);
    SDL_RenderDrawPoint(renderer, center.getX() - x, center.getY() - y);
    SDL_RenderDrawPoint(renderer, center.getX() - y, center.getY() - x);
    SDL_RenderDrawPoint(renderer, center.getX() + y, center.getY() - x);
    SDL_RenderDrawPoint(renderer, center.getX() + x, center.getY() - y);

    y++;

    if (d <= 0) {
      d += 2 * y + 1;
    } else {
      x--;
      d += 2 * (y - x) + 1;
    }
  }
}