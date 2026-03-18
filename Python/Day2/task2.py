string = input("Enter some text: ")

letter = input("Enter one litter: ")

letterLocations = []

for i in range(0, len(string)):
  if string[i] == letter:
    letterLocations.append(i)

print(letterLocations)
