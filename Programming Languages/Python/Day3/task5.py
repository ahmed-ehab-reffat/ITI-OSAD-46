student_data = {}

file = open('students.txt', 'r')

for line in file:
  sid, name = line.strip().split(',')
  student_data[sid] = {"name": name, "grades": []}

file.close()

file = open('grades.txt', 'r')

for line in file:
  sid, _, grade = line.strip().split(',')

  if sid in student_data:
    student_data[sid]["grades"].append(int(grade))

file.close()

print(f"{'Student Name':<15} | {'Average Grade'}")
print("-" * 30)

for sid, info in student_data.items():
  name = info["name"]
  grades = info["grades"]

  if grades:
    average = sum(grades) / len(grades)
    print(f"{name:<15} | {average:.2f}")
  else:
    print(f"{name:<15} | No grades found")
