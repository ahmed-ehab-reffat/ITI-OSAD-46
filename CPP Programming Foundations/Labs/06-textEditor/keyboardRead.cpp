#include "keyboardRead.h"
#include "consoleUtils.h"
#include <iostream>

#ifdef _WIN32

#include <conio.h>
#include <windows.h>

// No-op on Windows; _getch reads keys without requiring Enter.
int kbhitBlock() {
  int ch = _getch();
  return ch;
}

int kbhitNonblock() {
  if (_kbhit())
    return _getch();
  return 0;
}

int getKey() {
  int c = kbhitBlock();

  if (c == ENTER) {
    return ENTER;
  }

  if (c == ESC) {
    return ESC;
  }

  // Extended keys: returned as 0 or 224, followed by code
  if (c == 0 || c == 224) {
    return kbhitNonblock();
  }

  return c;
}

#else

#include <fcntl.h>
#include <termios.h>
#include <unistd.h>

void enableRawMode() {
  termios term;
  tcgetattr(STDIN_FILENO, &term);
  term.c_lflag &= ~(ICANON | ECHO); // disable canonical mode & echo
  tcsetattr(STDIN_FILENO, TCSANOW, &term);
}

// (optional cleanup)
void disableRawMode() {
  termios term;
  tcgetattr(STDIN_FILENO, &term);
  term.c_lflag |= ICANON | ECHO;
  tcsetattr(STDIN_FILENO, TCSANOW, &term);
}

// blocking getchar function
int kbhitBlock() {
  unsigned char ch = 0;
  int nread = read(STDIN_FILENO, &ch, 1);

  if (nread == 1)
    return ch;
  return 0;
}
// Non-blocking getchar function
int kbhitNonblock() {
  int old_flags = fcntl(STDIN_FILENO, F_GETFL);
  fcntl(STDIN_FILENO, F_SETFL, old_flags | O_NONBLOCK);

  unsigned char ch = 0;
  int nread = read(STDIN_FILENO, &ch, 1);

  fcntl(STDIN_FILENO, F_SETFL, old_flags);
  if (nread == 1)
    return ch;
  return 0;
}

int getKey() {
  enableRawMode();
  int c = kbhitBlock();

  if (c == ENTER) {
    disableRawMode();
    return ENTER;
  }

  if (c == ESC) {
    delay(1);

    c = kbhitNonblock();
    if (c == '[') {
      delay(1);

      c = kbhitNonblock();
      disableRawMode();
      return c;

    } else if (c == 0) {
      disableRawMode();
      return ESC;
    }
  }

  disableRawMode();
  return c;
}

#endif

int getInt() {
  int number = 0;
  while (true) {
    int key = getKey();

    if (key >= '0' and key <= '9') {
      number = number * 10 + (key - '0');
      std::cout << (key - '0');
      std::cout.flush();
    } else if (key == BACKSPACE && number > 0) {
      number = number / 10;
      std::cout << "\b \b";
      std::cout.flush();

    } else if (key == ENTER) {
      return number;
    } else if (key == ESC) {
      return -1;
    }
  }
};

int getName(std::string &str) {
  while (true) {
    int key = getKey();

    bool isValidNameKey = ((key >= 'A' and key <= 'Z') ||
                           (key >= 'a' and key <= 'z') ||
                           (key >= '0' and key <= '9') ||
                           key == '_' || key == '-' || key == '.');

    if (isValidNameKey) {
      str += key;
      std::cout << char(key);
      std::cout.flush();
    } else if (key == BACKSPACE && !str.empty()) {
      str.pop_back();
      std::cout << "\b \b";
      std::cout.flush();
    } else if (key == ENTER) {
      return 0;
    } else if (key == ESC) {
      return -1;
    }
  }
};