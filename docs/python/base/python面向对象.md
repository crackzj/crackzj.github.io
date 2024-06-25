# `Python`面向对象 `OOP`

## 类的定义

```python
class MyClass:
	pass

class People:
    def __init__(self, name):
        self.name = name

    def say(self):
        print(f"Hello {self.name}")

zs = People("zs")
zs.say()
```

## 受保护的属性和私有属性

```python
class People:
    def __init__(self, name，age):
        self.name = name
				self._protect_var = 10 #受保护的属性： 可以修改和访问 仅仅用做提醒
				self.__private_var = 10 # 私有属性 不可直接访问和修改
				self.__age = age
    def say(self):
        print(f"Hello {self.name}")

	# property 装饰器使用
		@property
		def age(self):
			# TODO 格式化操作...
			return self.__age

		@age.setter
		def age(self,age):
			# TODO 校验合规性
			self.__age = age

```

## 继承和多态

```python
class Animal:
	def eat(self):
		print("Animal is eating")


class Bird(Animal):
	def eat(self):
		print("Bird eat")

class Dog(Animal):
	pass

b = Brid()
b.eat()

D = Dog()
d.eat()
```

## 模块与包

- 新建文件夹(包): 包内需要有 `__init__.py`文件

```python
import sys

print(sys.path)

```
