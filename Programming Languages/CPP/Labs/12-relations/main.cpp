#include "circle.h"
#include "line.h"
#include "picture.h"
#include "rectangle.h"
#include <SDL2/SDL.h>

int main() {
  SDL_Init(SDL_INIT_VIDEO);

  SDL_Window *window = SDL_CreateWindow(
      "Ahmed Ehab Shapes",
      SDL_WINDOWPOS_CENTERED,
      SDL_WINDOWPOS_CENTERED,
      800, 600,
      SDL_WINDOW_SHOWN);

  SDL_Renderer *renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED);

  Picture picture;

  Line *line1 = new Line(Point(300, 200), Point(300, 300));
  Line *line2 = new Line(Point(200, 350), Point(400, 350));

  Circle *circle1 = new Circle(Point(250, 200), 40);
  Circle *circle2 = new Circle(Point(350, 200), 40);

  Rectangle *rect1 = new Rectangle(Point(100, 100), Point(500, 400));

  picture.addShape(line1);
  picture.addShape(line2);
  picture.addShape(circle1);
  picture.addShape(circle2);
  picture.addShape(rect1);

  // Draw frame
  SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
  SDL_RenderClear(renderer);

  SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
  picture.draw(renderer);
  SDL_RenderPresent(renderer);

  // Wait until the user closes the window
  bool running = true;
  SDL_Event event;

  while (running && SDL_WaitEvent(&event)) {
    if (event.type == SDL_QUIT) {
      running = false;
    }
  }

  delete line1;
  delete line2;
  delete circle1;
  delete circle2;
  delete rect1;

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);
  SDL_Quit();

  return 0;
}