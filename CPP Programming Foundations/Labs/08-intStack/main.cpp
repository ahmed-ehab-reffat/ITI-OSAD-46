#include "myStack.h"
#include <iostream>

using namespace std;

int main() {
  cout << "Starting MyStack Basic Tests\n";
  cout << "-------------------------------\n";
  int tests_failed = 0;

  // --- Test 1: Default Constructor and Basic Push/Pop ---
  cout << "Test 1: Basic Push/Pop and isEmpty\n";
  MyStack s1;
  if (!s1.isEmpty()) {
    cout << "FAIL: T1.1 - New stack should be empty.\n";
    tests_failed++;
  }

  s1.push(10);
  s1.push(20);

  if (s1.isEmpty()) {
    cout << "FAIL: T1.2 - Stack should have length 2 and not be empty.\n";
    tests_failed++;
  }

  if (s1.peek() != 20) {
    cout << "FAIL: T1.3 - Peek should return 20. Got " << s1.peek() << "\n";
    tests_failed++;
  }

  if (s1.pop() != 20) {
    cout << "FAIL: T1.4 - Pop should return 20.\n";
    tests_failed++;
  }

  if (s1.peek() != 10) {
    cout << "FAIL: T1.5 - Stack state incorrect after pop.\n";
    tests_failed++;
  }
  s1.pop(); // Pop 10

  cout << "Test 1 finished.\n\n";

  // --- Test 2: Dynamic Resizing (Default capacity is 5) ---
  cout << "Test 2: Dynamic Resizing (Pushing 6 elements)\n";
  MyStack s2;
  for (int i = 1; i <= 5; ++i) {
    s2.push(i * 10); // 10, 20, 30, 40, 50
  }

  // 6th push triggers resize
  cout << "  -> Pushing 60 (triggers resize)...\n";
  s2.push(60);

  if (s2.peek() != 60) {
    cout << "FAIL: T2.1 - Resizing failed." << ", Top: " << s2.peek() << "\n";
    tests_failed++;
  }

  if (s2.pop() != 60 || s2.pop() != 50 || s2.pop() != 40) {
    cout << "FAIL: T2.2 - Data integrity check failed after resize.\n";
    tests_failed++;
  }

  cout << "Test 2 finished.\n\n";

  // --- Test 3: Copy Constructor (Deep Copy) ---
  cout << "Test 3: Copy Constructor\n";
  MyStack original;
  original.push(1);
  original.push(2); // original: [2, 1]

  MyStack copy = original; // Copy

  // Check initial copy state
  if (copy.peek() != 2) {
    cout << "FAIL: T3.1 - Copy state incorrect.\n";
    tests_failed++;
  }

  // Mutate original and check copy (Deep Copy Test)
  original.push(99); // original: [99, 2, 1]
  if (copy.peek() == 99) {
    cout << "FAIL: T3.2 - Copy is shallow! Original change affected copy.\n";
    tests_failed++;
  }

  cout << "Test 3 finished.\n\n";

  // --- Test 4: Copy Assignment Operator ---
  cout << "Test 4: Copy Assignment Operator\n";
  MyStack assign_src(1);
  assign_src.push(100);
  assign_src.push(200); // assign_src: [200, 100] (resized)

  MyStack assign_dest(10); // Larger capacity stack
  assign_dest.push(5);

  assign_dest = assign_src; // Assignment

  if (assign_dest.peek() != 200) {
    cout << "FAIL: T4.1 - Assignment failed to transfer data correctly.\n";
    tests_failed++;
  }

  // Mutate source and check destination (Deep Copy Test)
  assign_src.pop(); // assign_src: [100]
  if (assign_dest.peek() != 200) {
    cout << "FAIL: T4.2 - Assignment resulted in shallow copy.\n";
    tests_failed++;
  }

  cout << "Test 4 finished.\n\n";

  // --- Test 5: Error Handling (Pop/Peek on Empty) and Stream Operator ---
  cout << "Test 5: Empty Stack Errors and Stream Output\n";
  MyStack s_error;

  // Check pop/peek failure (will print error message to console)
  // cout << "  -> Next line should show 'Error: Stack is empty (pop failed)'\n";
  // if (s_error.pop() != 0) {
  //   cout << "FAIL: T5.1 - Pop on empty stack did not return 0.\n";
  //   tests_failed++;
  // }
  // cout << "  -> Next line should show 'Error: Stack is empty (peek failed)'\n";
  // if (s_error.peek() != 0) {
  //   cout << "FAIL: T5.2 - Peek on empty stack did not return 0.\n";
  //   tests_failed++;
  // }

  // Check stream operator
  s_error.push(100);
  s_error.push(200);
  cout << "  Stack output: " << s_error << "\n";
  // Manual check needed: Output should be [200, 100]

  cout << "Test 5 finished.\n\n";

  // --- Summary ---
  cout << "-------------------------------\n";
  if (tests_failed == 0) {
    cout << "SUCCESS: All basic tests passed.\n";
  } else {
    cout << "FAILURE: " << tests_failed << " tests failed.\n";
  }
  cout << "-------------------------------\n";

  return 0;
}