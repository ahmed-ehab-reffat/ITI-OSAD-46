#include "consoleUtils.h"
#include "keyboardRead.h"

#include <string>

void displayMenu(int selected) {
  clearScreen();
  print("==== Main Menu ====", 2, 6, GREEN);

  if (selected == 1) {
    print("New", 4, 14, BLUE);
  } else {
    print("New", 4, 14);
  }
  if (selected == 2) {
    print("Display", 6, 12, BLUE);
  } else {
    print("Display", 6, 12);
  }
  if (selected == 3) {
    print("Exit", 8, 13, BLUE);
  } else {
    print("Exit", 8, 13);
  }
}

int changeSelected(int selected) {
  if (selected > 3) {
    return 1;
  } else if (selected < 1) {
    return 3;
  }
  return selected;
}
