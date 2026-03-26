#include "consoleUtils.h"
#include "magicSquare.h"
#include <iostream>
#include <string>

using namespace std;

int main() {
  int squareLength = 0;
  clearScreen();

  print("Enter the magic square side length (N). N must be an ODD number (e.g., 3, 5, 7):", 1, 1, GREEN);
  cin >> squareLength;

  while (cin.fail() || squareLength <= 2 || squareLength % 2 == 0) {
    cin.clear();
    cin.ignore(10000, '\n');
    clearScreen();
    print("Invalid input. Please enter a positive ODD integer (e.g., 3, 5, 7).", 1, 1, RED);
    cin >> squareLength;
  }

  generateMagicSquare(squareLength);

  return 0;
}