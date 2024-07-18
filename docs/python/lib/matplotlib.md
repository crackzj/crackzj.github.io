# `matplotlib`

## `matplotlib`基本要点

- 笛卡尔坐标系

```python
from matplotlib import pyplot as plt

x = range(2, 28, 2)

y = [15, 13, 14, 5, 17, 20, 25, 26, 26, 24, 22, 18, 15]

# 设置图片大小
fig = plt.figure(figsize=(20, 8), dpi=80)

# 折线图
plt.plot(x, y)

# 保存图片
plt.savefig("./tt.png")
# 显示图形
plt.show()

# 10点到12点的温度变化图


a = [random.randint(20, 35) for i in range(121)]
t_range = []
for i in range(121):

    _str = f"{10 + i // 60}:{i % 60 if i % 60 > 9 else '0'+str(i % 60)}"
    t_range.append(_str)

plt.plot(t_range,a)

plt.xticks(t_range[::2])
plt.show()


# 显示中文

import matplotlib.font_manager
from matplotlib import pyplot as plt

font = matplotlib.font_manager.FontProperties(fname="/System/Library/Fonts/PingFang.ttc")

x = [1,2,3,5,7]
y = [2,4,6,7,8]

plt.plot(x,y)
plt.title("测试中文", fontproperties=font)
# 网格
plt.grid(alpha=0.4)
plt.show()

```
