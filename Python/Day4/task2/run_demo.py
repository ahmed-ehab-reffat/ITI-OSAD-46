from company import Car, Employee, Office


def main():
    car = Car("Toyota", fuelRate=50, velocity=60)

    emp = Employee(id=1, name="Ahmed", email="ahmed@example.com", salary=2000, car=car, distanceToWork=120, money=500)

    print("Initial:")
    print(f"Employee: {emp.name}, Money: {emp.money}, Health: {emp.healthRate}, Mood: {emp.mood}, Salary: {emp.salary}")

    emp.sleep(7)
    emp.eat(3)
    emp.buy(2)
    print("After sleep/eat/buy:")
    print(f"Money: {emp.money}, Health: {emp.healthRate}, Mood: {emp.mood}")

    emp.work(8)
    print(f"Mood after working 8 hours: {emp.mood}")

    print("Driving 100 units:")
    emp.drive(100)
    print(f"Car fuel after drive: {emp.car.fuelRate}")

    office = Office("Main Office", targetHour=9)
    office.hire(emp)
    print(f"Employees in office: {office.get_all_employees()} (count class var: {Office.employeesNum})")

    late = office.check_lateness(emp.id, moveHour=7)
    print(f"Is employee late? {late}")
    print(f"Salary after lateness check: {emp._salary}")

    emp.send_mail("boss@example.com", "Daily Report", "Boss")


if __name__ == '__main__':
    main()
