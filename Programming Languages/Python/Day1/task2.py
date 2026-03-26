age = int(input("Age: "))
have_coupon = input("Do you have a coupon? (yes/no): ")
have_coupon = have_coupon in ['yes', 'y', 'Y', 'YES', 'Yes' , 'true', '1']

print(age < 18 or age > 65 or have_coupon)
