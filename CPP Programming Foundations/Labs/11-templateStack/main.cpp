#include "myStack.h"
#include <iostream>
#include <stdexcept>
#include <string>

using namespace std;

// Function to run tests for a specific type
template <typename T>
int run_tests(const string &type_name) {
  cout << "--- Starting MyStack<" << type_name << "> Tests ---\n";
  int tests_failed = 0;

  // --- Test 1: Default Constructor and Basic Push/Pop ---
  cout << "Test 1: Basic Push/Pop and isEmpty\n";
  MyStack<T> s1;
  if (!s1.isEmpty()) {
    cout << "FAIL: T1.1 - New stack should be empty.\n";
    tests_failed++;
  }

  // Using T{10} and T{20} for generic initialization
  s1.push(T{10});
  s1.push(T{20});

  if (s1.isEmpty()) {
    cout << "FAIL: T1.2 - Stack should have length 2 and not be empty.\n";
    tests_failed++;
  }

  if (s1.peek() != T{20}) {
    cout << "FAIL: T1.3 - Peek should return 20. Got " << s1.peek() << "\n";
    tests_failed++;
  }

  if (s1.pop() != T{20}) {
    cout << "FAIL: T1.4 - Pop should return 20.\n";
    tests_failed++;
  }

  if (s1.peek() != T{10}) {
    cout << "FAIL: T1.5 - Stack state incorrect after pop.\n";
    tests_failed++;
  }
  s1.pop(); // Pop 10

  cout << "Test 1 finished.\n\n";

  // --- Test 2: Dynamic Resizing (Default capacity is 5) ---
  cout << "Test 2: Dynamic Resizing (Pushing 6 elements)\n";
  MyStack<T> s2;
  for (int i = 1; i <= 5; ++i) {
    s2.push(T{i * 10}); // 10, 20, 30, 40, 50
  }

  // 6th push triggers resize
  cout << "  -> Pushing 60 (triggers resize)...\n";
  s2.push(T{60});

  if (s2.peek() != T{60}) {
    cout << "FAIL: T2.1 - Resizing failed." << ", Top: " << s2.peek() << "\n";
    tests_failed++;
  }

  if (s2.pop() != T{60} || s2.pop() != T{50} || s2.pop() != T{40}) {
    cout << "FAIL: T2.2 - Data integrity check failed after resize.\n";
    tests_failed++;
  }

  cout << "Test 2 finished.\n\n";

  // --- Test 3: Copy Constructor (Deep Copy) ---
  cout << "Test 3: Copy Constructor\n";
  MyStack<T> original;
  original.push(T{1});
  original.push(T{2}); // original: [2, 1]

  MyStack<T> copy = original; // Copy

  // Check initial copy state
  if (copy.peek() != T{2}) {
    cout << "FAIL: T3.1 - Copy state incorrect.\n";
    tests_failed++;
  }

  // Mutate original and check copy (Deep Copy Test)
  original.push(T{99}); // original: [99, 2, 1]
  if (copy.peek() == T{99}) {
    cout << "FAIL: T3.2 - Copy is shallow! Original change affected copy.\n";
    tests_failed++;
  }

  cout << "Test 3 finished.\n\n";

  // --- Test 4: Copy Assignment Operator ---
  cout << "Test 4: Copy Assignment Operator\n";
  MyStack<T> assign_src(1);
  assign_src.push(T{100});
  assign_src.push(T{200}); // assign_src: [200, 100] (resized)

  MyStack<T> assign_dest(10); // Larger capacity stack
  assign_dest.push(T{5});

  assign_dest = assign_src; // Assignment

  if (assign_dest.peek() != T{200}) {
    cout << "FAIL: T4.1 - Assignment failed to transfer data correctly.\n";
    tests_failed++;
  }

  // Mutate source and check destination (Deep Copy Test)
  assign_src.pop(); // assign_src: [100]
  if (assign_dest.peek() != T{200}) {
    cout << "FAIL: T4.2 - Assignment resulted in shallow copy.\n";
    tests_failed++;
  }

  cout << "Test 4 finished.\n\n";

  // --- Test 5: Error Handling (Pop/Peek on Empty) and Stream Operator ---
  cout << "Test 5: Empty Stack Errors and Stream Output\n";
  MyStack<T> s_error;

  // Check pop/peek failure using try/catch (template version throws exceptions)
  bool pop_failed = false;
  try {
    s_error.pop();
  } catch (const std::underflow_error &e) {
    pop_failed = true;
    cout << "  -> Caught expected pop error: " << e.what() << "\n";
  }
  if (!pop_failed) {
    cout << "FAIL: T5.1 - Pop on empty stack did not throw underflow_error.\n";
    tests_failed++;
  }

  // Check stream operator
  s_error.push(T{100});
  s_error.push(T{200});
  cout << "  Stack output: " << s_error << "\n";
  // Manual check needed: Output should be '200, 100'

  cout << "Test 5 finished.\n";

  cout << "--- MyStack<" << type_name << "> Tests Finished ---\n";
  return tests_failed;
}

int main() {
  int total_failed = 0;

  // Run tests for int
  total_failed += run_tests<int>("int");

  cout << "\n======================================================\n\n";

  // Run tests for std::string
  // Note: We use string literals for comparisons here
  cout << "--- Starting MyStack<string> Tests ---\n";
  int string_tests_failed = 0;

  MyStack<string> str_s;
  str_s.push("Hello");
  str_s.push("World");

  if (str_s.peek() != "World") {
    cout << "FAIL: S-T1.1 - String Peek incorrect. Got " << str_s.peek() << "\n";
    string_tests_failed++;
  }

  if (str_s.pop() != "World") {
    cout << "FAIL: S-T1.2 - String Pop incorrect.\n";
    string_tests_failed++;
  }

  // Test resizing with strings
  MyStack<string> str_s2;
  for (int i = 1; i <= 5; ++i) {
    str_s2.push("Item" + to_string(i));
  }
  str_s2.push("NEW_ITEM"); // Should trigger resize

  if (str_s2.peek() != "NEW_ITEM") {
    cout << "FAIL: S-T2.1 - String Resizing failed.\n";
    string_tests_failed++;
  }

  // Test stream operator with strings
  cout << "  String Stack output: " << str_s2 << "\n";
  // Manual check needed: Output should be 'NEW_ITEM, Item5, Item4, Item3, Item2, Item1'

  total_failed += string_tests_failed;
  cout << "--- MyStack<string> Tests Finished (Failed: " << string_tests_failed << ") ---\n\n";
  cout << "======================================================\n";

  // --- Summary ---
  cout << "-------------------------------\n";
  if (total_failed == 0) {
    cout << "SUCCESS: All tests passed for int and string types.\n";
  } else {
    cout << "FAILURE: " << total_failed << " total tests failed across all types.\n";
  }
  cout << "-------------------------------\n";

  return 0;
}