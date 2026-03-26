#include "queue.h"
#include "exception.h"
#include "node.h"
#include <iostream>

Queue::Queue() {
  front = nullptr;
  rear = nullptr;
  size = 0;
};

Queue::Queue(const Queue &other) {
  front = nullptr;
  rear = nullptr;
  size = 0;

  Node *current = other.front;
  while (current != nullptr) {
    enqueue(current->data);
    current = current->next;
  }
}

Queue &Queue::operator=(const Queue &other) {
  if (this == &other) {
    return *this;
  }

  clear();

  Node *current = other.front;
  while (current != nullptr) {
    enqueue(current->data);
    current = current->next;
  }

  return *this;
}

Queue::~Queue() {
  clear();
};

void Queue::enqueue(int data) {
  Node *newNode = new Node(data);

  if (isEmpty()) {
    front = newNode;
    rear = newNode;
  } else {
    rear->next = newNode;
    rear = newNode;
  }

  size++;
};

int Queue::dequeue() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty!");
  }

  int data = front->data;
  Node *temp = front;
  front = front->next;

  delete temp;
  size--;

  if (front == nullptr) {
    rear = nullptr;
  }

  return data;
};

void Queue::display() {
  if (isEmpty()) {
    std::cout << "Queue is Empty!" << std::endl;
    return;
  }

  Node *current = front;
  while (current != nullptr) {
    std::cout << current->data << " ";
    current = current->next;
  }
  std::cout << std::endl;
};

int Queue::getFront() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty!");
  }

  return front->data;
};

int Queue::getRear() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty!");
  }

  return rear->data;
};

bool Queue::isEmpty() {
  return size == 0;
};

void Queue::clear() {
  while (!isEmpty()) {
    dequeue();
  }
}

/*
One Final Recommendation
  If you ever plan on using this in a high-performance environment,
  you could optimize the Assignment Operator.
  Currently, you call enqueue() for every element,
  which involves a new allocation for every node.
  This is perfectly fine for now, but in the future,
  you could reuse existing nodes to reduce the number of delete and new calls.

What's next?
  1-Add insertFront and deleteRear to make it a Deque
  This will require changing to a Doubly Linked List to keep deleteRear efficient.

  2-Make the Queue Template-based
*/