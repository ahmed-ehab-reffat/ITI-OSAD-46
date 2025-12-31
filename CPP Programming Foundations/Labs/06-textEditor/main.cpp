#include "consoleUtils.h"
#include "keyboardRead.h"
#include "textEditor.h"
#include <iostream>

using namespace std;

int main() {
  EditorState editor;
  initEditor(editor, 1024);

  while (true) {
    clearScreen();
    print("==== Simple Text Editor ====", 2, 5, GREEN);
    print("Enter file name to edit: ", 5, 2, BLUE);
    gotoRowCol(5, 27);

    string fileName = "";
    if (getName(fileName) == -1) {
      print("Exiting text editor...", 8, 2, RED);
      cleanupEditor(editor);
      return 0;
    }

    if (fileName.empty()) {
      print("File name cannot be empty!", 8, 2, RED);
      delay(1500);
      continue;
    }

    editFile(editor, fileName);
  }

  cleanupEditor(editor);
  return 0;
}
