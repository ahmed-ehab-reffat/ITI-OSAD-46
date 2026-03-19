file = open('students.txt', 'r')

for line in file:
  data = line.strip().split(',')
  
  name = data[1]
  print(name)

file.close()
