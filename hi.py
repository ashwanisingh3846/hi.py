a = 'a'
print (type(a))
print(ord('a'))
print(chr(97))
print(type(chr(97)))
a =True
print(type(a))
a =[]
a.append(8)
a.append(89)
a.append(80)
a.append(87)
a.append(83)
a.append(81)

# print(a)
a.insert(0 ,8)
b=[]
b.append(8)
b.append(89)
b.append(80)
b.append(87)
b.append(83)
b.append(81)

suare = [b*b*b for b in list(range(3,81))]
print (suare)
d = "nagshastridevvemradumdpakdumdu"
t =[ch for ch in d if ch in "artopu"]
print(t)
print('z' in d)
square = [x*x for x in list(range(1,12))]
print(square)
square_oneto10 = list(range(11 ,1 -1))
square_list = []
for x in square_oneto10: 
  print(x)
  square_list.append(x*x)
print(square_list)
l1=["milk"]
l2=["cheese"]
breakfast = l1
l1.append("lassi")
breakfast.extend(l2)
print(breakfast)
def hi():
  print("hi")
  return 2


print(hi())  
def add(x , y):
  return x+y


p = add(3 , 6)
print(p)
  
class student :
  def __init__(self,name,email):
    self.name = name
    self.email = email

#create an object and instance of class student
s1 = student('ashwani', 'ashawnisingh@gamil.com')
s2= student('manish', 'manishsingh@gmail.com')

print(s1.name)
print(s2.name)

print(s1.email)
print(s2.email)
class test:
  def m1(self):
    print("hello my name ashwani singh i from rsmt")

test =test()
test.m1()
from random import randint
print(randint(0,9),randint(0,9),randint(0,9),randint(0,9),randint(0,9))










