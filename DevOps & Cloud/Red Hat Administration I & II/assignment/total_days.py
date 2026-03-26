print("Enter a date to calculate number of days since 1970-1-1")
user_year = int(input("Year: "))
user_month = int(input("Month: "))
user_day = int(input("Day: ")) - 1

years_in_days = ( user_year - 1970 ) * 365

month_in_days = 0
days_in_every_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
for month in range(1, user_month):
    month_in_days += days_in_every_month[month]

def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

no_of_leap_years = 0
while user_year > 1970:
    if is_leap(user_year):
        no_of_leap_years += 1
    user_year -= 1

if user_month < 3 and isLeap(user_year):
    no_of_leap_years -= 1

total_days = years_in_days + month_in_days  + user_day  + no_of_leap_years

print(f"The number of days since 1970-1-1 is {total_days}")
