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

---

- 真和假
- True 和 False

- 空值就是没有值
- a = None

## 列表

---

- 创建访问

```python
a = [1,2,4]

b = [1, 'abc', 2.0, ['a','b','c']]

print(a[0],a[1])

```

- 列表信息

```python
list1 = [1,2,3,5,3,6]

print('list1长度：', len(list1))

print('最大值：',max(list1))

print('最小值：',min(list1))

print(f'某元素出现的次数{list1.count(3)}')
```

- 列表改变

```python
list2 = ['a','b','d']

# 在尾部添加元素
list2.append('e') # ['a','b','d','e']

# 在第二个元素后插入元素
list2.insert(2,'c')

# 删除某元素
list2.remove('b')

# 翻转列表
list2.reverse()

# 列表排序
list2.sort()
list2.sort(reverse=True) # 降序排序

```

## 元组 `tuple`

---

- 创建

```python
 a = (1,2,3)

 b = 1, # 仅有一个元素时可以这样创建

 # 可以使用列表的访问方式
```

- 元组 🙅 改变 🙅 翻转 🙅 排序

## 列表 `VS` 元组

---

- 元组是不可变的(immutable)Python 对象，存储在固定的一块内存里。

- 列表是可变的(mutable)Python 对象，需要两块存储空间，一块固定用来存储实际的列表数据，一块可变的空间用于扩展

结论就是：元组创建和访问要比列表块，但是不如列表灵活

## 字典和集合

---

- 字典创建

```python
a = {
  key: 'value',
  2: 'a',
  '3': 1
}
# key 必须是不可改变的数据类型

# 通过 dict 函数创建
b = dict()

c = dict(a=1,b=2,c='3')
```

- 字典操作

```python
d = {
  'name': 'zs',
  'age': 20
}
#访问
print(d['name'])
# 安全读取字典 key
print(d.get("name"))

#修改
d['age'] = 30

# 获取字典所有的 key
print(d.keys())

# 获取所有 value
print(d.values())

# 获取所有 key-value
print(d.items()) # 元组形式返回

# 删除 key
d.pop('name')

# 清空字典
d.clear()

# 新增 key
d[3] = 3
d['4'] = '4'

e = {
  5: '5'
}
e.update(d)

f = {**d,**e}
```

## 集合 `set`

---

集合是只有 `key`，没有`value` 的字典

- 创建

```python
a = {'a','b','c'}
b = {
  'a':2,
  'b':3,
  'd':4
}

t = 'd' in a # False

# 集合去重
l = [1,1,2,3,4,4,5]
s = set(l) # {1,2,3,4,5}
print(list(s)) #集合转为列表
```

## 操作

```python
s = {1,2,3,4}

s.add(6)

s.remove(2)
```
