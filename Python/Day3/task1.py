students = [
  ("101", "Ahmed Ehab"),
  ("102", "Andrew Emad"),
  ("103", "Mostafa Khalifa")
]

grades = [
  ("101", "Math", "95"),
  ("101", "History", "88"),
  ("101", "Python", "90"),
  ("102", "Math", "72"),
  ("102", "Science", "85"),
  ("102", "Python", "81"),
  ("103", "History", "91")
  ("103", "Python", "99"),
]

file = open('students.txt', 'w')

for student_id, name in students:
  file.write(f"{student_id},{name}\n")

file.close()

file = open('grades.txt', 'w')

for student_id, subject, grade in grades:
  file.write(f"{student_id},{subject},{grade}\n")

file.close()
