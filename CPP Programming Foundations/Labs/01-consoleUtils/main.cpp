#include "consoleUtils.h"
#include <iostream>

using namespace std;

int main() {
  clearScreen();
  gotoRowCol(4, 6);
  setColor(RED);
  cout << "Hello, World!";

  gotoRowCol(6, 4);
  setColor(GREEN);
  cout << "Another text here!" << endl;

  resetColor();
  cout << "Normal text." << endl;

  delay(3000);
  clearScreen();

  print("Hello,", 2, 2, RED);
  print("World!", 3, 3, GREEN);

  return 0;
}
