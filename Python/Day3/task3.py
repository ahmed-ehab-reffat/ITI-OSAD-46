file = open('grades.txt', 'r')

for line in file:
  student_id, subject, grade = line.strip().split(',')

  if subject.strip().lower() == "python":
    print(f"Student ID {student_id}: {grade}")

file.close()
