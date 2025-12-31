#include "line.h"
#include <SDL2/SDL.h>

Line::Line() : start(), end() {}
Line::Line(const Point &start, const Point &end) : start(start), end(end) {}
Line::Line(int x1, int y1, int x2, int y2) : start(x1, y1), end(x2, y2) {}

void Line::setStart(int x, int y) {
  start.setPoint(x, y);
};
void Line::setStart(const Point &point) {
  start.setPoint(point);
};

void Line::setEnd(int x, int y) {
  end.setPoint(x, y);
};
void Line::setEnd(const Point &point) {
  end.setPoint(point);
};

void Line::setLine(int x1, int y1, int x2, int y2) {
  start.setPoint(x1, y1);
  end.setPoint(x2, y2);
};

void Line::setLine(const Point &start, const Point &end) {
  this->start.setPoint(start);
  this->end.setPoint(end);
};

Point Line::getStart() const {
  return start.getPoint();
};
Point Line::getEnd() const {
  return end.getPoint();
};
Line Line::getLine() const {
  Line line(start, end);
  return line;
};

void Line::draw(SDL_Renderer *rendererPtr) const {
  SDL_Renderer *renderer = static_cast<SDL_Renderer *>(rendererPtr);

  int x1 = start.getX();
  int y1 = start.getY();
  int x2 = end.getX();
  int y2 = end.getY();

  // Bresenham's line algorithm
  int dx = std::abs(x2 - x1), sx = x1 < x2 ? 1 : -1;
  int dy = -std::abs(y2 - y1), sy = y1 < y2 ? 1 : -1;
  int err = dx + dy;

  while (true) {
    SDL_RenderDrawPoint(renderer, x1, y1);
    if (x1 == x2 && y1 == y2)
      break;
    int e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x1 += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y1 += sy;
    }
  }
}
