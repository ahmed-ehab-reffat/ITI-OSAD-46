#ifndef KEYBOARD_READ_H_INCLUDED
#define KEYBOARD_READ_H_INCLUDED

#include <string>

#ifdef _WIN32

#define UP 72
#define DOWN 80
#define RIGHT 77
#define LEFT 75
#define HOME 71
#define END 79
#define ENTER 13
#define ESC '\033'
#define BACKSPACE '\b'

#else

#define UP 'A'
#define DOWN 'B'
#define RIGHT 'C'
#define LEFT 'D'
#define HOME 'H'
#define END 'F'
#define ENTER '\n'
#define ESC '\033'
#define BACKSPACE 127

#endif //_WIN32

void enableRawMode();

void disableRawMode();

int kbhitBlock();

int kbhitNonblock();

int getKey();

int getInt();

int getName(std::string &str);

#endif // KEYBOARD_READ_H_INCLUDED
