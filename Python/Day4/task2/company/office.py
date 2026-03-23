from .employee import Employee

class Office:
    employeesNum = 0

    def __init__(self, name, targetHour=9):
        self.name = name
        self.employees = []
        self.targetHour = targetHour

    def get_all_employees(self):
        return self.employees

    def get_employee(self, empId):
        for e in self.employees:
            if getattr(e, 'id', None) == empId:
                return e
        return None

    def hire(self, employee):
        if not isinstance(employee, Employee):
            raise ValueError("Only Employee instances can be hired")
        self.employees.append(employee)
        Office.employeesNum += 1

    def fire(self, empId):
        emp = self.get_employee(empId)
        if emp:
            self.employees.remove(emp)
            Office.employeesNum = max(0, Office.employeesNum - 1)
            return True
        return False

    def deduct(self, empId, deduction):
        emp = self.get_employee(empId)
        if emp:
            try:
                d = float(deduction)
            except Exception:
                d = 0.0
            if hasattr(emp, '_salary') and emp._salary is not None:
                emp._salary = max(0.0, emp._salary - d)
                return emp._salary
        return None

    def reward(self, empId, reward):
        emp = self.get_employee(empId)
        if emp:
            try:
                r = float(reward)
            except Exception:
                r = 0.0
            if hasattr(emp, '_salary') and emp._salary is not None:
                emp._salary = emp._salary + r
                return emp._salary
        return None

    def check_lateness(self, empId, moveHour):
        emp = self.get_employee(empId)
        if not emp:
            return None
        velocity = emp.car.velocity if emp.car else 0
        is_late = Office.calculate_lateness(self.targetHour, moveHour, emp.distanceToWork, velocity)
        if is_late:
            self.deduct(empId, 10)
            return True
        else:
            self.reward(empId, 10)
            return False

    @staticmethod
    def calculate_lateness(targetHour, moveHour, distance, velocity):
        try:
            distance = float(distance)
            velocity = float(velocity)
        except Exception:
            return True
        if velocity <= 0:
            return True
        travel_time = distance / velocity
        arrival = moveHour + travel_time
        return arrival > targetHour

    @classmethod
    def change_emps_num(cls, num):
        try:
            n = int(num)
        except Exception:
            return None
        cls.employeesNum = n
        return cls.employeesNum
