#include "picture.h"
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

  // SCALE + START factor to make small coordinates visible
  const int SCALE = 100;
  const int START = 0;

  Line lines[2] = {
      Line(3 * SCALE + START, 2 * SCALE + START, 3 * SCALE + START, 3 * SCALE + START),
      Line(2 * SCALE + START, 3.5 * SCALE + START, 4 * SCALE + START, 3.5 * SCALE + START)};

  Rectangle rectangles[1] = {Rectangle(1 * SCALE + START, 1 * SCALE + START, 5 * SCALE + START, 4 * SCALE + START)};

  Circle circles[2] = {Circle(2.5 * SCALE + START, 2 * SCALE + START, 4 * SCALE),
                       Circle(3.5 * SCALE + START, 2 * SCALE + START, 4 * SCALE)};

  Picture pic(1, 1, 2, circles, rectangles, lines);

  bool running = true;
  SDL_Event event;

  while (running) {
    // Event loop
    while (SDL_PollEvent(&event)) {
      if (event.type == SDL_QUIT)
        running = false;
    }

    // Clear screen (black)
    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);
    SDL_RenderClear(renderer);

    // Draw shapes (white)
    SDL_SetRenderDrawColor(renderer, 255, 255, 255, 255);
    pic.draw(renderer);

    // Show everything
    SDL_RenderPresent(renderer);
  }

  SDL_DestroyRenderer(renderer);
  SDL_DestroyWindow(window);
  SDL_Quit();
  return 0;
}