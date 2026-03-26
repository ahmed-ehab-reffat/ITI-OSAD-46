#ifndef MYSTRING_H_INCLUDED
#define MYSTRING_H_INCLUDED

#include <iostream>

class MyString {
  private:
  char *str;
  static int length(const char *val);

  public:
  MyString();
  MyString(const char *val);
  MyString(const MyString &str2);
  ~MyString();

  void setString(const char *val);
  const char *getString() const;

  int length() const;
  void toLower();
  void toUpper();
  bool compare(const char *str2) const;
  bool compare(const MyString &str2) const;
  void concat(const char *str2);
  void concat(const MyString &str2);
  void copy(const char *str2);
  void copy(const MyString &str2);

  MyString &operator=(const char *str2);
  MyString &operator=(const MyString &str2);
  MyString operator+(const char *str2) const;
  MyString operator+(const MyString &str2) const;
  MyString &operator+=(const char *str2);
  MyString &operator+=(const MyString &str2);
  bool operator==(const char *str2) const;
  bool operator==(const MyString &str2) const;
  char &operator[](int index);
  const char &operator[](int index) const;
};

std::ostream &operator<<(std::ostream &os, const MyString &str2);
std::istream &operator>>(std::istream &is, MyString &str2);

#endif // MYSTRING_H_INCLUDED