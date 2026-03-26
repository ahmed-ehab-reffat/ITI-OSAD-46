#include <iostream>

using namespace std;

void swap1(int *x, int *y) {
  int temp = *x;
  *x = *y;
  *y = temp;
}

void swap2(int *x, int *y) {
  *x = *x * *y;
  *y = *x / *y;
  *x = *x / *y;
}

void swap3(int *x, int *y) {
  *x = *x + *y;
  *y = *x - *y;
  *x = *x - *y;
}

void swap4(int *x, int *y) {
  *x = *x ^ *y;
  *y = *x ^ *y;
  *x = *x ^ *y;
}

int main() {

  int a = 1;
  int b = 2;
  cout << "a = " << a << " --- b = " << b << endl;

  swap1(&a, &b);
  cout << "a = " << a << " --- b = " << b << endl;

  swap2(&a, &b);
  cout << "a = " << a << " --- b = " << b << endl;

  swap3(&a, &b);
  cout << "a = " << a << " --- b = " << b << endl;

  swap4(&a, &b);
  cout << "a = " << a << " --- b = " << b << endl;

  return 0;
}
