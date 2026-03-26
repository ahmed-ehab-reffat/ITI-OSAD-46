#include "exception.h"
#include "queue.h"
#include <iostream>

using namespace std;

int main() {
  Queue q;

  try {
    cout << "--- Test 1: Basic Enqueue and Circularity ---" << endl;
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.display(); // Expected: 10 20 30

    cout << "\n--- Test 2: Insert Front ---" << endl;
    q.insertFront(5);
    q.insertFront(1);
    q.display(); // Expected: 1 5 10 20 30

    cout << "\n--- Test 3: Trigger Resize ---" << endl;
    // Current size is 5 (which is the initial capacity). Next add will resize.
    q.enqueue(40);
    q.display(); // Expected: 1 5 10 20 30 40
    cout << "Front: " << q.getFront() << ", Rear: " << q.getRear() << endl;

    cout << "\n--- Test 4: Delete Rear ---" << endl;
    cout << "Deleted from rear: " << q.deleteRear() << endl; // Expected: 40
    q.display();                                             // Expected: 1 5 10 20 30

    cout << "\n--- Test 5: Dequeue ---" << endl;
    cout << "Dequeued from front: " << q.dequeue() << endl; // Expected: 1
    q.display();                                            // Expected: 5 10 20 30

    cout << "\n--- Test 6: Emptying the Queue ---" << endl;
    while (!q.isEmpty()) {
      cout << "Removing: " << q.dequeue() << endl;
    }
    q.display(); // Expected: Empty Queue

    cout << "\n--- Test 7: Exception Handling ---" << endl;
    q.dequeue(); // This should trigger the exception

  } catch (Exception &e) {
    cout << "Caught Exception: " << e.name << endl;
  }

  return 0;
}