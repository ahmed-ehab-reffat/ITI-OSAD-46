#include "employeeData.h"
#include "consoleUtils.h"
#include "keyboardRead.h"
#include <iostream>

using namespace std;

employee employees[MAX_EMPLOYEES];
int count = 0;

void createEmployee() {
  clearScreen();
  print("==== New Empoyee ====", 2, 6, GREEN);

  if (count == MAX_EMPLOYEES) {
    print("You reached the maximum limit of employees", 5, 2, RED);
    print("You cant add another employee", 6, 2, RED);
  } else {
    employee emp;

    emp.id = count + 1;

    print("First Name:", 4, 10, BLUE);
    gotoRowCol(4, 22);
    string name = "";
    if (getName(name) == -1) {
      return;
    }
    emp.firstName = name;

    print("Last Name:", 5, 10, BLUE);
    gotoRowCol(5, 22);
    name = "";
    if (getName(name) == -1) {
      return;
    }
    emp.lastName = name;

    print("Age:", 6, 10, BLUE);
    gotoRowCol(6, 22);
    int age = getInt();
    if (age == -1) {
      return;
    }
    emp.age = age;

    print("Salary:", 7, 10, BLUE);
    gotoRowCol(7, 22);
    int salary = getInt();
    if (salary == -1) {
      return;
    }
    emp.salary = salary;

    if (emp.firstName == "" || emp.lastName == "" || emp.age < 18 || emp.salary < 1) {
      print("Failed to add employee - Invalid input", 9, 2, RED);
    } else {
      employees[count] = emp;
      count++;
      print("Employee added sucssefully", 9, 2, GREEN);
    }
  }

  print("Press ESC to return to Main Menu", 10, 2, RED);
  while (true) {
    int key = getKey();
    if (key == ESC) {
      return;
    };
  }
};

void displayEmployees() {
  clearScreen();
  print("==== Employees ====", 2, 6, GREEN);

  for (int i = 0; i < count; i++) {
    print("ID: " + to_string(employees[i].id) + "   Name: " +
              employees[i].firstName + " " +
              employees[i].lastName + "   Age: " +
              to_string(employees[i].age) + "   Salary: " +
              to_string(employees[i].salary),
          i + 4, 3, BLUE);
  }

  setColor(RED);
  cout << "\n Press ESC to return to Main Menu \n";
  resetColor();

  while (true) {
    int key = getKey();
    if (key == ESC) {
      return;
    };
  }
};