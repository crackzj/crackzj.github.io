# `MySQL`

## `DDL` `Data Definition Language`

     数据定义语言，用来定义数据库对象（数据库、表）

### 数据库操作

-   查询数据库

```sql
show databases;

# 查看当前正在使用的数据库
select database();
```

-   创建数据库

```sql
create database 数据库名;

create database if not exists 数据库名;
```

-   使用/切换数据库

```sql
use 数据库名;
```

-   删除数据库

```sql
drop database 数据库名;

drop database if exists 数据库名;
```

### 表操作

-   查看当前数据库下的表

```sql
show tables;
```

-   查看表结构

```sql
desc 表名;
```

-   查看建表语句

```sql
show create table 表名;
```

-   创建表

```sql
create table 表名(
	字段名1 字段类型 【约束】【comment 字段注释】
	....
	字段名n 字段类型 【约束】【comment 字段注释】
)【comment 表注释】

create table tb_user(
	id int comment 'id 唯一标识',
	username varchar(20) comment '用户名'
) comment '用户表';
```

-   约束

|   约束   | 描述                                             | 关键字      |
| :------: | :----------------------------------------------- | :---------- |
| 非空约束 | 限制该字段值不能为 null                          | not null    |
| 唯一约束 | 保证字段的所有数据都是唯一、不重复的             | unique      |
| 主键约束 | 主键是一行数据的唯一标识、要求非空且唯一         | primary key |
| 默认约束 | 保存数据时、如果未指定该字段值，则采用默认值     | default     |
| 外键约束 | 让两张表的数据建立连接，保证数据的一致性和完整性 | foreign key |

-   修改表

```sql
# 添加字段
alter table 表名 add 字段名 字段类型 【约束】【comment 字段注释】;

# 修改字段
alter table 表名 modify 字段名 字段类型 【约束】【comment 字段注释】;

# 删除字段
alter table 表名 drop column 字段名;

# 修改表名
rename table 表名 to 新表名;

# 删除表
drop table if exists 表名;
```

## `DML` `Data Manipulation Language`

    数据操作语言，用来对数据库表中的数据进行增、删、改、查

### `INSERT`

-   指定字段添加数据

```sql
insert into 表名 (字段名1,字段名2) values (值1,值2);
```

-   全部字段添加数据

```sql
insert into 表名 values (值1，...,值n);
```

-   批量添加数据

```sql
# 指定字段
insert into 表名 (字段名1,字段名2) values (值1,值2), ... ,(值1,值2);

# 全部字段

insert into 表名  values (值1,值2), ... ,(值1,值2);
```

### `UPDATE`

```sql
update 表名 set 字段名1=值1， 字段名2=值2 ... [where 条件];
```

### `DELETE`

```sql
delete from 表名 [where 条件];
```

## `DQL` `Data Query Language`

    数据查询语言，查询数据库表中的数据

```sql
select 字段列表（返回数据）

from 表名列表（可以有多张表）

where 条件列表

group by 分组字段列表 （可选）

having 分组后条件列表

order by 排序字段列表

limit 分页参数
```

-   基本查询 单表查询

```sql
# 查询指定字段
select 字段1,...,字段n from 表名;

# 查询所有字段
select * from 表名; #不建议
select 表字段列表 from 表名;

# 设置别名 as 可省略
select 字段1 as 别名, 字段2 as 别名 from 表名;

# 去除重复记录
select distinct 字段列表 from 表名;
```

-   条件查询

| 比较运算符                       | 功能                                                   |
| :------------------------------- | :----------------------------------------------------- |
| >                                | 大于                                                   |
| >=                               | 大于等于                                               |
| <                                | 小于                                                   |
| <=                               | 小于等于                                               |
| =                                | 等于                                                   |
| <> 或者 !=                       | 不等于                                                 |
| between ... and ...              | 在之间，闭区间包含                                     |
| in(...)                          | 在 in 集合中满足之一，可以看作多个`or` 语句            |
| like 占位符( \_ 和 % )           | 模糊查询，`_`匹配单个字符，`%`匹配任意个字符 0 ～ n 个 |
| is null 、is not num (`<=>null`) |                                                        |

| 逻辑运算符 | 功能 |
| :--------- | ---- |
| and &&     |      |
| or \|\|    |      |
| not !      |      |

-   分组查询（聚合函数） `group by` `having`

| 函数  | 功能   |
| :---- | :----- |
| count | 统计   |
| max   |        |
| min   |        |
| avg   | 平均值 |
| sum   | 求和   |

```sql
select 字段, 聚合函数(字段列表) from 表名 [where 条件] group by 分组字段名 [having 条件];
```

-   排序查询 `order by` `ASC` - 升序(默认值) `DESC` - 降序

```sql
select 字段列表 from 表名 [where 条件] [group by 字段列表] [having 条件] order by 字段1, ..., 字段n;
```

-   分页查询

```sql
select 字段列表 from 表名 limit 起始索引,查询记录数;
```

-   多表设计 - 一对多 一对一 多对多 多对一

物理外键(<font color="red">不建议使用</font>)

```sql
# 添加外键 - 创建表时指定
create table 表名(
	字段名 类型，
	...
	[constraint] [外键名称] foreign key (外键字段名) references 主表(字段名)
);
# 建完表后，添加外键
alter table 表名 add constraint 外键名称 foreign key (外键字段名) references 主表(字段名);
```

     外键约束：外键是为了保证数据的一致性和完整性
     通过 foreign key 添加的外键叫做物理外键，有以下缺点：
      - 影响增、删、改的效率（需要检查外键关系）
      - 仅用于单节点数据库，不适用于分布式、集群场景
      - 容易引发数据库的死锁问题、消耗性能

逻辑外键(<font color="green">推荐使用</font>)

     - 概念：在业务层逻辑中，解决外键关联
     - 通过逻辑外键，就可以很方便的解决上述问题

-   多表查询

```sql
select 字段列表 from 表名1，表名2，..., 表名n;
```

连接查询

```sql
# 内连接

select 字段列表 from 表1，表2 where 条件...; # 隐式内连接

select 字段列表 from 表1 [inner] join 表2 on 连接条件 ...;

# 外连接

select 字段列表 from 表1 left join 表2 on 连接条件 ...;

select 字段列表 from 表1 right join 表2 on 连接条件...;
```

子查询

```sql

```

-   事务: 原子性、一致性、隔离性、持久性

    事务时一组操作的集合，它是一个不可分割的工作单位。事务会把所有操作作为一个整体一起向系统提交或撤销操作请求，这些操作要么同时成功，要么同时失败。

```sql
# 开启事务
start transaction; # 或者  begin;

# 提交事务
commit;

# 回滚事务
rollback;
```

-   索引

```sql
create [unique] index 索引名称 on 表名(字段名...);

# 查看索引
show index from 表名;

# 删除索引
drop index 索引名 on 表名;
```
