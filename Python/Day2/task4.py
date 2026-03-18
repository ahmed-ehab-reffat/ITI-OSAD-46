import math

def calcArea(shape):
  area = 0

  if(shape[0].lower() == "t"):
    base = int(input("Enter the base length: "))
    height = int(input("Enter the height length: "))
    area = 0.5 * base * height
  elif(shape[0].lower() == "r"):
    width = int(input("Enter the width length: "))
    height = int(input("Enter the height length: "))
    area = width * height
  elif(shape[0].lower() == "s"):
    side = int(input("Enter the side length: "))
    area = side * side
  elif(shape[0].lower() == "c"):
    radius = int(input("Enter the radius length: "))
    area = math.pi * radius * radius
  else:
    area = "Not valid shape"
  
  return area


shape = input("Enter shape type: ")
print("Area =", calcArea(shape))
