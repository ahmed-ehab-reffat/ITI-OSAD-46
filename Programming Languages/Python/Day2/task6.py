levels = int(input("Enter number of levels: "))
levels += 1

for i in range(0, levels):
  for j in range(levels - i):
    print(" ", end="")
  for j in range(i):
    print("*", end="")
  print("")
