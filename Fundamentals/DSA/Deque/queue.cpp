#include "queue.h"
#include "exception.h"
#include <iostream>

Queue::Queue() {
  capacity = 5;
  size = 0;
  front = -1;
  rear = -1;
  arr = new int[capacity];
};

Queue::~Queue() {
  delete[] arr;
};

void Queue::resize() {
  int oldCapacity = capacity;
  capacity *= 2;
  int *newArr = new int[capacity];

  int current = front;
  for (int i = 0; i < size; i++) {
    newArr[i] = arr[current];

    current = (current + 1) % oldCapacity;
  }

  delete[] arr;
  arr = newArr;
  front = 0;
  rear = size - 1;
};

bool Queue::isEmpty() {
  return front == -1;
};
bool Queue::isFull() {
  return size == capacity;
};

void Queue::enqueue(int item) {
  if (isFull()) {
    resize();
  }

  if (isEmpty()) {
    front = 0;
    rear = 0;
  } else if (rear == capacity - 1) {
    rear = 0;
  } else {
    rear++;
  }

  arr[rear] = item;
  size++;
};

int Queue::dequeue() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty");
  }

  int item = arr[front];

  if (front == rear) {
    front = -1;
    rear = -1;
  } else if (front == capacity - 1) {
    front = 0;
  } else {
    front++;
  }

  size--;

  return item;
};

void Queue::display() {
  if (isEmpty()) {
    std::cout << "Empty Queue" << std::endl;
    return;
  }

  for (int i = front; i != rear; i = (i + 1) % capacity) {
    std::cout << arr[i] << " ";
  }
  std::cout << arr[rear] << std::endl;
  return;
};

int Queue::getFront() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty");
  }

  return arr[front];
};

int Queue::getRear() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty");
  }

  return arr[rear];
};

int Queue::getSize() {
  return size;
}

void Queue::insertFront(int data) {
  if (isFull()) {
    resize();
  }

  if (isEmpty()) {
    front = 0;
    rear = 0;
  } else if (front == 0) {
    front = capacity - 1;
  } else {
    front--;
  }

  arr[front] = data;
  size++;
};

int Queue::deleteRear() {
  if (isEmpty()) {
    throw Exception(404, "Queue Is Empty");
  }

  int item = arr[rear];

  if (front == rear) {
    front = -1;
    rear = -1;
  } else if (rear == 0) {
    rear = capacity - 1;
  } else {
    rear--;
  }

  size--;
  return item;
};