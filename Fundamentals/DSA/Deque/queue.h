#ifndef QUEUE_H_INCLUDED
#define QUEUE_H_INCLUDED

class Queue {
  private:
  int *arr;
  int front;
  int rear;
  int size;
  int capacity;
  void resize();
  bool isFull();

  public:
  Queue();
  ~Queue();
  void enqueue(int item);
  int dequeue();
  void display();
  void insertFront(int data);
  int deleteRear();
  int getFront();
  int getRear();
  int getSize();
  bool isEmpty();
};

#endif // QUEUE_H_INCLUDED