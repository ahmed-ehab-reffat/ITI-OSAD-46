full_name = input("Enter your full name: ")

name_parts = full_name.split()

initial1 = name_parts[0][0]
initial2 = name_parts[-1][0]

print(initial1.upper() + ". " + initial2.upper() + ".")
