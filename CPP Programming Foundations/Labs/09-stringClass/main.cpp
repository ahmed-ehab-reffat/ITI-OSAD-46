#include "myString.h"
#include <iostream>
#include <stdexcept> // For catching exceptions from operator[]

using namespace std;

// Helper function to print a line separator
void printSeparator() {
  cout << "\n------------------------------------------------\n";
}

void testCase(const char *title) {
  cout << "\n### " << title << "\n";
}

int main() {
  cout << "Starting MyString Class Tests\n";

  // --- 1. Constructors and Basic Access ---
  testCase("1. Constructors and Basic Access");

  MyString s1;          // Default constructor
  MyString s2("Hello"); // C-string constructor
  MyString s3 = s2;     // Copy constructor (MyString s3(s2);)
  MyString s4("WORLD");

  cout << "s1 (Default): \"" << s1 << "\"\n";
  cout << "s2 (C-string): \"" << s2 << "\", Length: " << s2.length() << "\n";
  cout << "s3 (Copy of s2): \"" << s3 << "\"\n";
  cout << "s4 (Upper): \"" << s4 << "\"\n";

  printSeparator();

  // --- 2. Case Conversion ---
  testCase("2. Case Conversion (toLower/toUpper)");

  s2.toUpper();
  cout << "s2 after toUpper: \"" << s2 << "\"\n"; // Should be "HELLO"

  s4.toLower();
  cout << "s4 after toLower: \"" << s4 << "\"\n"; // Should be "world"

  printSeparator();

  // --- 3. Comparison Methods and Operator == ---
  testCase("3. Comparison Methods and Operator ==");

  // Testing C-string compare
  cout << "s2.compare(\"HELLO\"): " << (s2.compare("HELLO") ? "True" : "False") << " (Expected: True)\n";
  cout << "s2.compare(\"hello\"): " << (s2.compare("hello") ? "True" : "False") << " (Expected: False)\n";

  // Testing MyString compare
  cout << "s2.compare(s3): " << (s2.compare(s3) ? "True" : "False") << " (Expected: False, s3 is \"Hello\")\n";

  // Testing operator ==
  cout << "s2 == \"HELLO\": " << (s2 == "HELLO" ? "True" : "False") << " (Expected: True)\n";
  cout << "s2 == s3: " << (s2 == s3 ? "True" : "False") << " (Expected: False)\n";

  printSeparator();

  // --- 4. Concatenation and Operator Overloading (+, +=) ---
  testCase("4. Concatenation and Operator Overloading");

  MyString s5("TEST");
  MyString s6("ING");

  // Testing concat method (in-place modification)
  cout << "s5 before concat: \"" << s5 << "\"\n";
  // NOTE: If you implemented concat to return bool, check the return value.
  // Assuming void based on your final header.
  s5.concat("ING");
  cout << "s5 after concat(\"ING\"): \"" << s5 << "\"\n"; // Should be "TESTING"

  // Testing += operator (in-place modification)
  MyString s7("ONE");
  s7 += s6;                                     // s7 = "ONE" + "ING"
  cout << "s7 after += s6: \"" << s7 << "\"\n"; // Should be "ONEING"

  // Testing + operator (returns new MyString)
  MyString s8 = s3 + " beautiful " + s4;            // "Hello" + " beautiful " + "world"
  cout << "s8 = s3 + ... + s4: \"" << s8 << "\"\n"; // Should be "Hello beautiful world"

  printSeparator();

  // --- 5. Assignment Operator (=) ---
  testCase("5. Assignment Operator (=)");

  MyString s9;
  s9 = "Assignment 1"; // Assignment from C-string
  cout << "s9 after = \"Assignment 1\": \"" << s9 << "\"\n";

  s9 = s2;                                     // Assignment from MyString (s2 is "HELLO")
  cout << "s9 after = s2: \"" << s9 << "\"\n"; // Should be "HELLO"

  printSeparator();

  // --- 6. Operator [] (Read/Write Access) ---
  testCase("6. Operator [] (Read/Write Access)");

  MyString s10("abcdef");

  // Read access
  cout << "s10[1] (Read): " << s10[1] << "\n"; // Should be 'b'

  // Write access
  cout << "s10 before modification: \"" << s10 << "\"\n";
  s10[0] = 'A';
  s10[5] = 'F';
  cout << "s10 after modification (s10[0]='A', s10[5]='F'): \"" << s10 << "\"\n"; // Should be "AbcdeF"

  // Testing bounds check (requires exception handling)
  try {
    cout << "Attempting write to out-of-bounds index 10...\n";
    s10[10] = 'Z'; // This should throw std::out_of_range
  } catch (const out_of_range &e) {
    cout << "Caught exception: " << e.what() << "\n";
  }

  printSeparator();

  // --- 7. Stream Extraction (>> for input) ---
  testCase("7. Stream Extraction (>> for Input)");

  MyString s_input;
  cout << "Enter a single word to test input (e.g., testword): ";

  // Note: If you run this in an IDE, the input buffer might need clearing.
  // In a simple console, this should work.
  if (cin >> s_input) {
    cout << "s_input read: \"" << s_input << "\", Length: " << s_input.length() << "\n";
  } else {
    cout << "Input failed.\n";
  }

  printSeparator();
  cout << "All tests completed.\n";

  // Destructors will be called automatically for all MyString objects here.
  return 0;
}