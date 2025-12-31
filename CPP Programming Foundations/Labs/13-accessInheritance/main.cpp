#include "circle.h"
#include "rectangle.h"
#include "square.h"
#include "triangle.h"
#include <iostream>
using namespace std;

int main() {
  Circle c(3);
  cout << "Circle area: " << c.area() << "\n";

  Triangle t(7, 4);
  cout << "Triangle area: " << t.area() << "\n";

  Rectangle r(8, 5);
  cout << "Rectangle area: " << r.area() << "\n";

  Square s(11);
  cout << "Square area: " << s.area() << "\n";

  return 0;
}