names = input("Enter diffrenet names separated by space: ")

names = names.split(" ")
names= sorted(names)

dict = {}

for name in names:
  letter = name[0].lower()

  arr = dict.get(letter, [])

  arr.append(name)

  dict[letter] = arr

print(dict)
