---
prev:
  text: "首页"
  link: "/docs/python/base"
---

# `Python`基本数据类型

---

```python
# 这是注释
# 代码风格 PEP8

print("hello world")

```

## 整数

---

- `python`可以处理“任意”大小的整数，包括负数

- 支持二进制、八进制、十进制、十六进制

```python
a = 0b1010
b = 0o12
c = 10
d = 0xa
type(a) # 'int'
```

| 前缀  | 例子     | 进制 |
| ----- | -------- | ---- |
| 0b/0B | a=0b1010 | 2    |
| 0o/0O | b=0o12   | 8    |
| 无    | c=10     | 10   |
| 0x/0X | d=0xa    | 16   |

## 浮点数 `float`

---

```python
a = 1.2
b = .4
c = 1.3e-4
type(a) # 'float'
```

## 四则运算

---

```python
 3-1 # -2
 2*4 # 8
 2* -4 # -8
 4/2 # 2.0

 2//4 # 0
 4 // 2 # 2
 8 // 3 # 2

 0.2 + 0.8 # 1.0
 0.4 / 0.2 # 2.0
 0.4 // 0.2 # 2.0

```

## 字符串 `str`

---

- 定义

  - `a = 'string'`
  - `a = "string"`
  - `a = "我是字符串"`
  - `a = '''在一个字符串里面包含双引号（"）和单引号（'）'''`

- 格式化

```python
name = 'python'
age = 27
# 打印 "我是python,几年27岁啦"
new_str = "我是"+name +","+"今年"+ str(age) + "岁啦"
pring(new_str)
# str(age) 整数转字符串

# python2 格式化
new_str_1 = "我是%s,今年%d岁啦" % (name, age)
print(new_str_1)

# python3 格式化
new_str_2 = "我是{},今年{}岁啦".format(name,age)
new_str_3 = "我是{name},今年{age}岁啦".format(name=name,age=age)
print(new_str_2)
# python 3.6 and later
new_str_4 = f"我是{name},今年{age}岁啦"
```

## 布尔值和空值

---

- 真和假
- True 和 False

- 空值就是没有值
- a = None

## 列表

- 创建访问

```python
a = [1,2,4]

b = [1, 'abc', 2.0, ['a','b','c']]

print(a[0],a[1])

```
