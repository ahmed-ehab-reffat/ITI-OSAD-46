#include "myString.h"

#include <iostream>
#include <stdexcept>
using namespace std;

// Helper Functions
int MyString::length(const char *val) {
  if (val == nullptr) return 0;
  int length = 0;
  while (val[length] != '\0') {
    length++;
  }
  return length;
}

void MyString::copy(const char *val) {
  if (str != nullptr) {
    delete[] str;
    str = nullptr;
  }

  if (val == nullptr) {
    str = nullptr;
    return;
  }

  int len = length(val);

  str = new char[len + 1];

  for (int i = 0; i <= len; i++) {
    str[i] = val[i];
  }
}

// Constructors and Destructors
MyString::MyString() : str(nullptr) {
}

MyString::MyString(const char *val) : str(nullptr) {
  copy(val);
}

MyString::MyString(const MyString &str2) : str(nullptr) {
  copy(str2);
}

MyString::~MyString() {
  delete[] str;
}

// Setter and Getter
void MyString::setString(const char *val) {
  copy(val);
};

const char *MyString::getString() const {
  return str;
};

// Methods
int MyString::length() const {
  return length(str);
};

void MyString::copy(const MyString &str2) {
  copy(str2.str);
}

void MyString::toLower() {
  if (str == nullptr) {
    return;
  }
  for (int i = 0; str[i] != '\0'; i++) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      str[i] = str[i] + 32;
    }
  }
}

void MyString::toUpper() {
  if (str == nullptr) {
    return;
  }
  for (int i = 0; str[i] != '\0'; i++) {
    if (str[i] >= 'a' && str[i] <= 'z') {
      str[i] = str[i] - 32;
    }
  }
}

bool MyString::compare(const char *str2) const {
  if (str == nullptr && str2 == nullptr)
    return true;
  if (str == nullptr || str2 == nullptr)
    return false;

  int length1 = length(str);
  int length2 = length(str2);
  if (length1 != length2) {
    return false;
  }

  for (int i = 0; str[i] != '\0'; i++) {
    if (str[i] != str2[i]) {
      return false;
    }
  }
  return true;
}

bool MyString::compare(const MyString &str2) const {
  return compare(str2.str);
}

void MyString::concat(const char *str2) {
  if (str2 == nullptr || *str2 == '\0') {
    return;
  }

  int currentLen = length(str);
  int appendLen = length(str2);
  int newLen = currentLen + appendLen;

  char *newStr = new char[newLen + 1];

  if (str != nullptr) {
    for (int i = 0; i < currentLen; i++) {
      newStr[i] = str[i];
    }
  }

  for (int i = 0; i <= appendLen; i++) {
    newStr[currentLen + i] = str2[i];
  }

  if (str != nullptr) {
    delete[] str;
  }
  str = newStr;

  return;
}

void MyString::concat(const MyString &str2) {
  return concat(str2.str);
}

// Operator overloading
MyString &MyString::operator=(const char *str2) {
  copy(str2);
  return *this;
}

MyString &MyString::operator=(const MyString &str2) {
  if (this == &str2) {
    return *this;
  }

  if (str != nullptr) {
    delete[] str;
    str = nullptr;
  }

  copy(str2);

  return *this;
}

MyString MyString::operator+(const char *str2) const {
  MyString temp = *this;

  temp.concat(str2);

  return temp;
}

MyString MyString::operator+(const MyString &str2) const {
  MyString temp = *this;

  temp.concat(str2);

  return temp;
}

MyString &MyString::operator+=(const char *str2) {
  this->concat(str2);
  return *this;
}

MyString &MyString::operator+=(const MyString &str2) {
  this->concat(str2);
  return *this;
}

bool MyString::operator==(const char *str2) const {
  return this->compare(str2);
}

bool MyString::operator==(const MyString &str2) const {
  return this->compare(str2);
}

char &MyString::operator[](int index) {
  if (index < 0 || index >= length(str)) {
    throw std::out_of_range("MyString index out of bounds for write access.");
  }
  return str[index];
}

const char &MyString::operator[](int index) const {
  if (index < 0 || index >= length(str)) {
    throw std::out_of_range("MyString index out of bounds for read access.");
  }
  return str[index];
}

ostream &operator<<(ostream &os, const MyString &str2) {
  const char *s = str2.getString();
  if (s == nullptr)
    os << "";
  else
    os << s;
  return os;
}

istream &operator>>(istream &is, MyString &str2) {
  const int BUFFER_SIZE = 1024;
  char buffer[BUFFER_SIZE];
  is >> buffer;
  str2.setString(buffer);
  return is;
}