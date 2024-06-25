# `Python`函数与控制流

## 条件语句

---

- `if`

```python
if 1 > 0:
	print('hello world')
	print('1>0')
print('out of if')
```

- `if...else`

```python
a = int(input('please type a number:'))
if a > 0:
	print('a>0')
else:
	print('a is not great than zero')
```

- `if...elif...else`

```python
a = int(input("please input: "))
if a > 0:
	print('a > 0')
elif a == 0:
	print('a=0')
else:
	print('a<0')
```

## 循环 `while` `for`

---

```python
a = 10
while a > 0:
	print('loop')
	a = a-1
s = 'hello'
for item in s:
	if item == 'h':
		continue
	if item == 'o':
		break
	print(item)

```

## 函数

---

- 定义

```python
def demo():
	print("hello world")

def demo1(a,b):
	print(a,b)

def sum(a,b):
	return a + b

demo()
demo1(a=123,b={1:1,2:2})

z = 1
def demo2(a):
	global z  # 引用全局变量
	z = z + a

# 可变参数/剩余参数
def add(*args):
	result = 0
	for item in args:
		result += item
	return result

def add2(**wargs): # **wargs 命名可变参数
	return (wargs.get('a') + wargs.get('b'))

add2(a=1,b=2)

# 默认参数
def test(a,b=False):
	if b:
		return a
	else:
		return a*a


```
