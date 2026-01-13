#include "exception.h"
#include <string>

Exception::Exception(int code, std::string name) : name(name), code(code) {};