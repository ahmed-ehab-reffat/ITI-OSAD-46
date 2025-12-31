#ifndef EMPLOYEE_DATA_H_INCLUDED
#define EMPLOYEE_DATA_H_INCLUDED

#include <string>
using namespace std;

#define MAX_EMPLOYEES 3

struct employee {
  int id;
  string firstName;
  string lastName;
  int age;
  int salary;
};

void createEmployee();

void displayEmployees();

#endif // EMPLOYEE_DATA_H_INCLUDED