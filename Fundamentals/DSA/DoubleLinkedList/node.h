#ifndef NODE_H_INCLUDED
#define NODE_H_INCLUDED

class Node {
  public:
  int data;
  Node *next;
  Node *prev;
  Node(int data);
};

#endif // NODE_H_INCLUDED