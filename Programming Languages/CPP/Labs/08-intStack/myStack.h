#ifndef MYSTACK_H_INCLUDED
#define MYSTACK_H_INCLUDED

#include <iostream>

class MyStack {
  int *data;
  int size;
  int top;
  void resize();
  bool isFull() const;

  public:
  MyStack();
  MyStack(int size);
  MyStack(const MyStack &other);
  ~MyStack();

  void push(int value);
  int pop();
  int peek() const;
  bool isEmpty() const;

  MyStack &operator=(const MyStack &other);

  friend std::ostream &operator<<(std::ostream &os, const MyStack &stack);
};

#endif // MYSTACK_H_INCLUDED