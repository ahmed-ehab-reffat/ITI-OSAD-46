#ifndef QUEUE_H_INCLUDED
#define QUEUE_H_INCLUDED

#include "node.h"

class Queue {
  private:
  Node *front;
  Node *rear;
  int size;

  public:
  Queue();
  Queue(const Queue &other);
  ~Queue();
  void enqueue(int data);
  int dequeue();
  void display();
  int getFront();
  int getRear();
  bool isEmpty();
  void clear();
  Queue &operator=(const Queue &other);
};

#endif // QUEUE_H_INCLUDED