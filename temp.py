# ROHIT DEKA 
# 23MIM10093
# Write a program that prompts a user to enter two different numbers. Perform basic
# arithmetic operations based on the choices.

# num1 = int(input("Enter 1st Number : "))
# num2 = int(input("Enter 2nd Number : "))

# ops = {
#     "1": lambda a, b: a + b,
#     "2": lambda a, b: a - b,
#     "3": lambda a, b: a / b if b != 0 else "Cannot divide by zero",
#     "4": lambda a, b: a * b,
# }

# print("Choose any operation:")
# for key, symbol in [("1", "+"), ("2", "-"), ("3", "/"), ("4", "*")]:
#     print(f"{key} -> {symbol}")

# choice = input("Enter the choice eg: 1,2,3,4: ")

# if choice in ops:
#     print("Result:", ops[choice](num1, num2))
# else:
#     print("Invalid choice")


#Write a program to find the smaller number among the two numbers.

# num1 = int(input("Enter a number"))
# num2 = int(input ("Enter 2nd number"))

# print(min(num1,num2))


#3
import math

radius = float(input("Enter the radius of the circle: "))

if radius > 0:
    area = math.pi * radius * radius
    circumference = 2 * math.pi * radius

    print("Area =", area)
    print("Circumference =", circumference)

else:
    print("Radius must be greater than zero")


#4
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
num3 = float(input("Enter third number: "))

if num1 > num2 and num1 > num3:
    print("The first number is greater than both numbers")

elif num1 < num2 and num1 < num3:
    print("The first number is less than both numbers")

else:
    print("The first number is neither greater nor less than both numbers")


#5
sales = float(input("Enter total sales: "))

basic = 40000
conveyance = 500

if sales >= 100000:
    hra = 20 / 100 * basic
    da = 110 / 100 * basic
    incentive = 10 / 100 * sales
    bonus = 1000

else:
    hra = 10 / 100 * basic
    da = 110 / 100 * basic
    incentive = 4 / 100 * sales
    bonus = 500

salary = basic + hra + da + conveyance + incentive + bonus

print("Basic Salary =", basic)
print("HRA =", hra)
print("DA =", da)
print("Conveyance =", conveyance)
print("Incentive =", incentive)
print("Bonus =", bonus)
print("Total Salary =", salary)

#6

marks1 = float(input("Enter marks of subject 1: "))
marks2 = float(input("Enter marks of subject 2: "))
marks3 = float(input("Enter marks of subject 3: "))
marks4 = float(input("Enter marks of subject 4: "))
marks5 = float(input("Enter marks of subject 5: "))

total = marks1 + marks2 + marks3 + marks4 + marks5

percentage = (total / 500) * 100

print("Total Marks =", total)
print("Percentage =", percentage)

if percentage >= 90:
    print("Excellent")

elif percentage >= 75:
    print("Very Good")

elif percentage >= 60:
    print("Good")

elif percentage >= 50:
    print("Average")

else:
    print("Needs Improvement")

#7

