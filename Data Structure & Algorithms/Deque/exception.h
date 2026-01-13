#ifndef EXCEPTION_H_INCLUDED
#define EXCEPTION_H_INCLUDED

#include <string>

class Exception {
  public:
  int code;
  std::string name;

  Exception(int code, std::string name);
};

#endif // EXCEPTION_H_INCLUDED