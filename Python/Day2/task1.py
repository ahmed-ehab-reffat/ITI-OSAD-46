msg = input("Enter some text: ")

vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"]

for vowel in vowels:
  msg = msg.replace(vowel, "")

print(msg)

# vowels = ["a", "e", "i", "o", "u"]
# for letter in msg:
#   if letter.lower() in vowels:
#     msg.replace(letter.lower(), "")
