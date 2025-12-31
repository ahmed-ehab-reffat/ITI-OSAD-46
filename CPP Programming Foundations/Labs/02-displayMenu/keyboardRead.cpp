#include "keyboardRead.h"
#include "consoleUtils.h"

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

  return 0;
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
  return 0;
}

#endif //_WIN32
