#include "exception.h"
#include "linkedlist.h"
#include <iostream>
using namespace std;

int main() {
  LinkedList s;
  s.add(10);
  s.add(20);
  s.add(30);
  s.add(40);
  s.add(50);
  s.add(60);
  s.display();

  try {
    s.pop(); // 60
    s.pop(); // 50
    s.pop(); // 40
    s.pop(); // 30

  } catch (Exception e) {
    cout << e.name;
  }
  s.display(); // 20 10

  return 0;
}