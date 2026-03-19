search_id = input("Enter the student ID to search for: ").strip()

student_name = None
found_grades = []

file = open('students.txt', 'r')

for line in file:
  sid, name = line.strip().split(',')
  if sid == search_id:
    student_name = name
    break

file.close()

file = open('grades.txt', 'r')
for line in file:
  sid, subject, grade = line.strip().split(',')

  if sid == search_id:
    found_grades.append((subject, grade))

file.close()

if student_name:
  print(f"\nStudent Name: {student_name}")
  print("-" * 22)

if found_grades:
  print(f"| {'Subject':<10} | {'Grade':<5} |")
  print("-" * 22)
  for sub, grd in found_grades:
    print(f"| {sub:<10} | {grd:<5} |")
  print("-" * 22)
