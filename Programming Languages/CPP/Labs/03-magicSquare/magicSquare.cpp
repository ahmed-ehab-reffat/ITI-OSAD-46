#include "consoleUtils.h"
#include <cmath>

using namespace std;

void generateMagicSquare(int squareLength) {
  // Initial position: center of the top row
  int currentSquareRow = 0;
  int currentSquareCol = (squareLength / 2);

  int totalElements = squareLength * squareLength;
  int cellWidth = to_string(totalElements).length() + 4; // spacing width

  // Display offsets
  int startRow = 4;
  int startCol = 5;

  // Initial screen position
  int screenRow = startRow + currentSquareRow;
  int screenCol = startCol + currentSquareCol * cellWidth;

  // Magic Constant
  long long magicSum = (long long)squareLength * (squareLength * squareLength + 1) / 2;

  print("[ " + to_string(1) + " ]", screenRow, screenCol, BLUE);
  delay(200);

  for (int i = 2; i <= totalElements; i++) {
    // Move logic
    if ((i - 1) % squareLength == 0) {
      // Move down
      currentSquareRow = (currentSquareRow + 1) % squareLength; // Row = Row + 1
    } else {
      // Move up - right
      currentSquareRow = (currentSquareRow - 1 + squareLength) % squareLength; // Row = Row - 1
      currentSquareCol = (currentSquareCol + 1) % squareLength;                // Col = Col + 1
    }

    screenRow = startRow + currentSquareRow;
    screenCol = startCol + currentSquareCol * cellWidth;

    print("[ " + to_string(i) + " ]", screenRow, screenCol, BLUE);
    delay(200);
  }

  // Completion messages
  int result_row = startRow + squareLength + 1;
  print("Magic Square Generation Complete!", result_row, startCol, GREEN);
  print("Side length (N): " + to_string(squareLength), result_row + 1, startCol, GREEN);
  print("Sum of all rows/cols/diagonals: " + to_string(magicSum), result_row + 2, startCol, GREEN);
}
