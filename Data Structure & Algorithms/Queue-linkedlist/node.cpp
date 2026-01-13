#include "node.h"
#include <iostream>

using namespace std;

Node::Node(int data) {
  this->data = data;
  this->next = nullptr;
}
