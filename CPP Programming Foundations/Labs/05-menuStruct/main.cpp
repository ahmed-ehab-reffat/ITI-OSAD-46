#include "consoleUtils.h"
#include "displayMenu.h"
#include "employeeData.h"
#include "keyboardRead.h"
#include <iostream>

using namespace std;

int main() {
  int selected = 1;

  while (true) {
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
        createEmployee();
      } else if (selected == 2) {
        displayEmployees();
      } else if (selected == 3) {
        clearScreen();
        return 0;
      }
      break;
    }
  }

  return 0;
}
