#include "myStack.h"
#include <iostream>
#include <stdexcept>

// Helper method
bool MyStack::isFull() const {
  return top == size - 1;
}

void MyStack::resize() {
  int newsize = size * 2;
  int *temp = new int[newsize];
  for (int i = 0; i <= top; i++) {
    temp[i] = data[i];
  }
  delete[] data;
  data = temp;
  size = newsize;
}

// Constructors and Destructors
MyStack::MyStack() : size(5), top(-1) {
  data = new int[size];
}

MyStack::MyStack(int size) : size(size > 0 ? size : 1), top(-1) {
  data = new int[this->size];
}

MyStack::MyStack(const MyStack &other) : size(other.size), top(other.top) {
  data = new int[size];
  for (int i = 0; i <= top; i++) {
    data[i] = other.data[i];
  }
}

MyStack::~MyStack() {
  delete[] data;
}

// Operator overloading
MyStack &MyStack::operator=(const MyStack &other) {
  if (this == &other) {
    return *this;
  }
  int *newData = new int[other.size];
  for (int i = 0; i <= other.top; i++) {
    newData[i] = other.data[i];
  }
  delete[] data;
  data = newData;
  size = other.size;
  top = other.top;
  return *this;
}

// Methods
void MyStack::push(int value) {
  if (isFull()) {
    resize();
  }
  data[++top] = value;
}

int MyStack::pop() {
  if (isEmpty()) {
    throw std::underflow_error("Stack is empty");
  }
  return data[top--];
}

bool MyStack::isEmpty() const {
  return top == -1;
}

int MyStack::peek() const {
  if (isEmpty()) {
    throw std::underflow_error("Stack is empty");
  }
  return data[top];
}

// Friend methods
std::ostream &operator<<(std::ostream &os, const MyStack &stack) {
  for (int i = stack.top; i >= 0; i--) {
    os << stack.data[i];
    if (i > 0) {
      os << ", ";
    }
  }
  return os;
}