#include "consoleUtils.h"
#include "displayMenu.h"
#include "keyboardRead.h"
#include <iostream>

using namespace std;

int main() {
  int selected = 1;
  bool inMenu = true;

  while (true) {
    if (inMenu) {
      displayMenu(selected);

      int key = getKey();

      switch (key) {
      case DOWN:
      case RIGHT:
        selected = changeSelected(selected + 1);
        break;

      case UP:
      case LEFT:
        selected = changeSelected(selected - 1);
        break;

      case HOME:
        selected = 1;
        break;

      case END:
        selected = 3;
        break;

      case ENTER:
        if (selected == 1) {
          inMenu = false;
          showScreen("New");
        } else if (selected == 2) {
          inMenu = false;
          showScreen("Display");
        } else if (selected == 3) {
          return 0; // or make an exit flag // Exit program
        }
        break;
      }

    } else {
      int key = getKey();
      if (key == ESC) {
        inMenu = true;
      }
    }

    delay(50);
  }

  return 0;
}
