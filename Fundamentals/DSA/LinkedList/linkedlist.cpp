#include "linkedlist.h"
#include "exception.h"
#include <iostream>

using namespace std;

LinkedList::LinkedList() {
  head = nullptr;
}

LinkedList::~LinkedList() {
  while (head != nullptr) {
    Node *next = head->next;
    delete head;
    head = next;
  }
}

void LinkedList::add(int data) {
  Node *newNode = new Node(data);
  if (head == nullptr) {
    head = newNode;
    return;
  }

  Node *last = head;
  while (last->next != nullptr) {
    last = last->next;
  }

  last->next = newNode;
}

int LinkedList::pop() {
  if (head == nullptr) {
    throw Exception(404, "Linked List Is Empty");
  }

  Node *last = head;
  if (head->next == nullptr) {
    head = head->next;
    int data = last->data;
    delete last;
    return data;
  }

  while (last->next->next != nullptr) {
    last = last->next;
  }
  int data = last->next->data;
  delete last->next;
  last->next = nullptr;
  return data;
}

void LinkedList::display() {
  Node *current = head;
  while (current != nullptr) {
    cout << current->data << " -> ";
    current = current->next;
  }
  cout << endl;
}

void LinkedList::InsertBefore(int data, int afterData) {
  if (head == nullptr) {
    throw Exception(404, "Linked List Is Empty");
  }

  if (head->data == afterData) {
    Node *newNode = new Node(data);
    newNode->next = head;
    head = newNode;
    return;
  }

  Node *current = head;
  while (current->next != nullptr) {
    if (current->next->data == afterData) {
      Node *newNode = new Node(data);

      newNode->next = current->next;
      current->next = newNode;
      return;
    }
    current = current->next;
  }

  throw Exception(404, "Data not found!");
}

void LinkedList::InsertAfter(int data, int beforeData) {
  if (head == nullptr) {
    throw Exception(404, "Linked List Is Empty");
  }

  Node *current = head;
  while (current != nullptr) {
    if (current->data == beforeData) {
      Node *newNode = new Node(data);

      newNode->next = current->next;
      current->next = newNode;
      return;
    }
    current = current->next;
  }

  throw Exception(404, "Data not found!");
};

int LinkedList::GetCount() {
  Node *current = head;
  int count = 0;

  while (current != nullptr) {
    count++;
    current = current->next;
  }

  return count;
}

int LinkedList::GetDataByIndex(int index) {
  if (head == nullptr) {
    throw Exception(404, "Linked List Is Empty");
  }

  if (index < 0) {
    throw Exception(404, "Wrong Input!");
  }

  Node *current = head;
  while (index > 0) {
    current = current->next;
    if (current == nullptr) {
      throw Exception(404, "Index is out of boundries");
    }
    index--;
  }

  return current->data;
};

void LinkedList::RemoveALL(int data) {
  Node *temp;
  while (head != nullptr && head->data == data) {
    temp = head;
    head = head->next;
    delete temp;
  }

  if (head == nullptr) {
    return;
  }

  Node *current = head;
  while (current->next != nullptr) {
    if (current->next->data == data) {
      temp = current->next;
      current->next = temp->next;
      delete temp;
    } else {
      current = current->next;
    }
  }
}
