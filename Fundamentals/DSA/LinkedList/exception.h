#ifndef EXCEPTION_H_INCLUDED
#define EXCEPTION_H_INCLUDED

class Exception {
  public:
  int code;
  char *name;

  Exception(int code, char *name);
};

#endif // EXCEPTION_H_INCLUDED