#include "textEditor.h"
#include "consoleUtils.h"
#include "keyboardRead.h"
#include <cstring>
#include <fstream>
#include <iostream>

using namespace std;

void initEditor(EditorState &state, int initialSize) {
  state.buffer = new char[initialSize];
  state.bufferSize = initialSize;
  state.contentLength = 0;
}

void expandBuffer(EditorState &state) {
  int newSize = state.bufferSize * 2;
  char *newBuffer = new char[newSize];
  for (int i = 0; i < state.contentLength; i++) {
    newBuffer[i] = state.buffer[i];
  }
  delete[] state.buffer;
  state.buffer = newBuffer;
  state.bufferSize = newSize;
}

void displayEditor(EditorState &state) {
  clearScreen();
  print("===== Text Editor: " + state.fileName + " =====", 1, 1, GREEN);

  for (int i = 0; i < state.contentLength; i++) {
    cout << state.buffer[i];
  }
  cout.flush();
}

void handleKeyInput(EditorState &state) {
  displayEditor(state);
  while (true) {
    int key = getKey();

    bool isValidKey = ((key >= 32 && key <= 126) || key == ENTER);

    if (isValidKey) {
      state.buffer[state.contentLength] = (char)key;
      state.contentLength++;
      cout << char(key);
      cout.flush();
    } else if (key == BACKSPACE && state.contentLength > 0) {
      state.buffer[state.contentLength - 1] = '\0';
      state.contentLength--;
      cout << "\b \b";
      cout.flush();
    }
    if (key == ESC) {
      clearScreen();
      print("Save changes? (ENTER to save / ESC to discard)", 2, 2, YELLOW);

      key = getKey();
      while (!(key == ENTER || key == ESC)) {
        key = getKey();
      }
      if (key == ENTER) {
        saveFile(state);
      }
      if (key == ESC) {
        print("Discarded changes.", 4, 2, RED);
        delay(1500);
      }
      return;
    }
  }
}

void saveFile(const EditorState &state) {
  ofstream file(state.fileName);
  if (file.is_open()) {
    for (int i = 0; i < state.contentLength; i++) {
      file << state.buffer[i];
    }
    file.close();
    print("File saved successfully!", 4, 1, GREEN);
  } else {
    print("Error saving file!", 4, 1, RED);
  }
  delay(1500);
}

void editFile(EditorState &state, const string &fileName) {
  state.fileName = fileName;

  ifstream inFile(fileName);
  if (inFile.is_open()) {
    char ch;
    while (inFile.get(ch)) {
      if (state.contentLength == state.bufferSize - 1) {
        expandBuffer(state);
      }
      state.buffer[state.contentLength] = ch;
      state.contentLength++;
    }
    inFile.close();
  }
  // Editor loop
  handleKeyInput(state);
}

void cleanupEditor(EditorState &state) {
  delete[] state.buffer;
  state.buffer = nullptr;
  state.contentLength = 0;
}
