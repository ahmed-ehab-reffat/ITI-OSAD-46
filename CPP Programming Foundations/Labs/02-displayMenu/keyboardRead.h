#ifndef KEYBOARD_READ_H_INCLUDED
#define KEYBOARD_READ_H_INCLUDED

#ifdef _WIN32

#define UP 72
#define DOWN 80
#define RIGHT 77
#define LEFT 75
#define HOME 71
#define END 79
#define ENTER 13
#define ESC 27

#else

#define UP 'A'
#define DOWN 'B'
#define RIGHT 'C'
#define LEFT 'D'
#define HOME 'H'
#define END 'F'
#define ENTER '\n'
#define ESC '\033'

#endif

void enableRawMode();

void disableRawMode();

int kbhitBlock();

int kbhitNonblock();

int getKey();

#endif // KEYBOARD_READ_H_INCLUDED
