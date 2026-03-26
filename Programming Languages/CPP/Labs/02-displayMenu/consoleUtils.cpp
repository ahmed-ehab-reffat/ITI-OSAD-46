#include <chrono>
#include <iostream>
#include <thread>

using namespace std;

// \033 is the escape character (ESC)
// [y;xH is the command to set cursor position

void gotoRowCol(int row, int col) {
  cout << "\033[" << row << ";" << col << "H";
  cout.flush();
}

void setColor(int color) {
  cout << "\033[" << color << "m";
  cout.flush();
}

void resetColor() {
  setColor(0);
}

void print(string text, int row, int col, int color = 0) {
  gotoRowCol(row, col);
  setColor(color);
  cout << text << endl;
  resetColor();
}

void clearScreen() {
  cout << "\033[2J";
  gotoRowCol(0, 0);
}

void delay(int milliseconds) {
  this_thread::sleep_for(chrono::milliseconds(milliseconds));
}
