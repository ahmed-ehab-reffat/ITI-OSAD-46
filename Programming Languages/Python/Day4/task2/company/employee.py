import re
from .person import Person
from .email_composer import compose_email


class Employee(Person):
    def __init__(self, id, name, email, salary, car=None, distanceToWork=0, money=0):
        super().__init__(name, money=money)
        self.id = id
        self.car = car
        self._email = None
        self.email = email
        self._salary = None
        self.salary = salary
        self.distanceToWork = distanceToWork

    @property
    def salary(self):
        return self._salary

    @salary.setter
    def salary(self, value):
        try:
            v = float(value)
        except Exception:
            raise ValueError("salary must be a number")
        if v < 1000:
            raise ValueError("salary must be 1000 or more")
        self._salary = v

    @property
    def email(self):
        return self._email

    @staticmethod
    def _validate_email(e):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, e) is not None

    @email.setter
    def email(self, value):
        if not self._validate_email(value):
            raise ValueError("Invalid email")
        self._email = value

    def work(self, hours):
        if hours == 8:
            self.mood = "happy"
        elif hours > 8:
            self.mood = "tired"
        else:
            self.mood = "lazy"
        return self.mood

    def drive(self, distance):
        if not self.car:
            print(f"{self.name} has no car.")
            return None
        return self.car.run(self.car.velocity, distance)

    def refuel(self, gasAmount=100):
        if not self.car:
            print(f"{self.name} has no car to refuel.")
            return None
        new_fuel = self.car.fuelRate + gasAmount
        self.car.fuelRate = new_fuel
        return self.car.fuelRate

    def send_mail(self, to, subject, receiver_name):
        if not self._validate_email(to):
            raise ValueError("Invalid recipient email")
        if not self.email:
            raise ValueError("Sender email not set")
        return compose_email(self.email, to, subject, receiver_name)
