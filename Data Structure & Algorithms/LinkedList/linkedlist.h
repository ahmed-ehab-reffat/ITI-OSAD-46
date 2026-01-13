#ifndef LINKEDLIST_H_INCLUDED
#define LINKEDLIST_H_INCLUDED

#include "node.h"

class LinkedList {
  Node *head;

  public:
  LinkedList();
  ~LinkedList();

  void add(int data);

  int pop();

  void display();

  void InsertAfter(int data, int afterData);

  void InsertBefore(int data, int beforeData);

  int GetCount();

  int GetDataByIndex(int index);

  void RemoveALL(int data);
};

#endif // LINKEDLIST_H_INCLUDED