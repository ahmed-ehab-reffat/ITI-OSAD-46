number = int(input("Enter a number: "))

table = []

for i in range(1, number + 1):
  arr = []

  for j in range(1, i + 1):
    arr.append(j * i)
  
  table.append(arr)

print(table)
