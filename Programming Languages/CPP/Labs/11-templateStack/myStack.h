#ifndef MYSTACK_H_INCLUDED
#define MYSTACK_H_INCLUDED

#include <iostream>
#include <stdexcept>

// Template class definition
template <typename T>
class MyStack {
  private:
  T *data;
  int size;
  int top;
  void resize();
  bool isFull() const;

  public:
  // Constructors and Destructors
  MyStack();
  MyStack(int size);
  MyStack(const MyStack &other);
  ~MyStack();

  // Core Stack Methods
  void push(const T &value);
  T pop();

  // Helper/Accessor Methods (Defined inline for simplicity)
  T peek() const {
    if (isEmpty()) {
      throw std::underflow_error("Stack is empty");
    }
    return data[top];
  }

  bool isEmpty() const {
    return top == -1;
  }

  // Operator overloading
  MyStack &operator=(const MyStack &other);

  // Friend function declaration must also use the template syntax
  friend std::ostream &operator<<(std::ostream &os, const MyStack<T> &stack) {
    for (int i = stack.top; i >= 0; i--) {
      os << stack.data[i];
      if (i > 0) {
        os << ", ";
      }
    }
    return os;
  }
};

// Helper method
template <typename T>
bool MyStack<T>::isFull() const {
  return top == size - 1;
}

template <typename T>
void MyStack<T>::resize() {
  int newsize = size * 2;
  T *temp = new T[newsize];
  for (int i = 0; i <= top; i++) {
    temp[i] = data[i];
  }
  delete[] data;
  data = temp;
  size = newsize;
}

// Constructors and Destructors
template <typename T>
MyStack<T>::MyStack() : size(5), top(-1) {
  data = new T[size];
}

template <typename T>
MyStack<T>::MyStack(int size) : size(size > 0 ? size : 1), top(-1) {
  data = new T[this->size];
}

// Copy Constructor
template <typename T>
MyStack<T>::MyStack(const MyStack<T> &other) : size(other.size), top(other.top) {
  data = new T[size];
  for (int i = 0; i <= top; i++) {
    data[i] = other.data[i];
  }
}

template <typename T>
MyStack<T>::~MyStack() {
  delete[] data;
}

// Operator overloading
template <typename T>
MyStack<T> &MyStack<T>::operator=(const MyStack<T> &other) {
  if (this == &other) {
    return *this;
  }
  // Use T instead of int
  T *newData = new T[other.size];
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
template <typename T>
void MyStack<T>::push(const T &value) {
  if (isFull()) {
    resize();
  }
  data[++top] = value;
}

template <typename T>
T MyStack<T>::pop() {
  if (isEmpty()) {
    throw std::underflow_error("Stack is empty");
  }
  return data[top--];
}

#endif // MYSTACK_H_INCLUDED
