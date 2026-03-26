#include <iostream>
//
#include "list.h"

using namespace std;

int main() {
  list<any> a{1, 2, 3, 4, 5, 6, 7, 8}, b{1, 2, 3, 4, 9, 10, 11, 12}, e{false, false, false, true, true, true, true, true}, tmp;
  cout << "a= " << a;
  cout << "b= " << b;
  cout << "e= " << e;
  cout << "(a<b) or (a>=b): ";
  tmp = ((a < b) | (a >= b));
  cout << tmp;
  cout << "b[b>4] = ";
  tmp = b[(b > 4)];
  cout << tmp;
  cout << "(a==b) and e: ";
  cout << ((a == b) & e);
  cout << "a append b: ";
  a.append(b);
  cout << a;
  cout << "a extend b: ";
  a.extend(b);
  cout << a;
  list<any> f{a, 'b', "good", 13.5, 7, false};
  cout << "f= " << f << endl;
  cout << "f= " << f[2] << endl;
  cout << "f= " << f[1] << endl;

  return 0;
}