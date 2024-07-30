# `Java`基础

## 抽象类抽象方法

```java
public abstract class className {
	public abstract void testAbstract();
}
```

     抽象类不能实例化

## 接口

```java
public interface Inter {
	// default标记可以不用实现重写方法
	public default void show(){
		System.out.println("接口中的默认方法")；
	}
}

public class InterImpl implements Inter {
	@Override
	public void show(){
		System.out.println("实现类重写方法");
	}
}
```

## 内部类

```java
public class Outer {
	public class Inner {

	}
}
```

-   成员内部类

```java
public class Car {
	String carName;
	private class Engine {
		String engineName
	}
}
```

-   静态内部类 `(jdk16)`

    静态内部类只能调用静态方法和使用静态变量

-   匿名内部类

```java
public class outer {

	new Swim(){
		@Override
		public void swim(){
			System.out.println("重写方法");
		}
	}
}
```

## `Object`

```java
public Object{

}
```

## `jdk8`时间类

-   `Date`
    -   `ZoneId`: 时区
    -   `Instant`: 时间戳
        `static Instant now()` 获取当前时间的`Instant`对象（标准时间）
        `static Instant ofXxx(long epochMilli)` 根据（秒/毫秒/纳秒）获取`Instant`对象
        `ZonedDateTime atZone(ZoneId zone)` 指定时区
        `boolean isXxx(Instant otherInstant)` 判断
        `Instant minusXxx(long millisToSubtract)` 减少时间
        `Instant plusXxx(long millisToSubtract)` 增加时间
    -   `DateTimeFormatter`

## `Lambda`表达式

-   遍历

```java
Collection<String> collection = new ArrayList<>();
collection.add("aaa");
collection.add("bbb");
collection.add("ccc");
collection.add("ddd");

collection.forEach(s->System.out.println(s));
```

## 集合

-   遍历

    -   迭代器遍历
        ```java
        Iterator<String> it = list.iterator();
        boolean flag = it.hasNext();
        String str = it.next();
        System.out.println(str);

    for(;it.hasNext();){
    String str = it.next();
    System.out.println(str);
    }
    ```

-   `Collection` <font color="red">interface</font> - 单列集合

    ```java
    public boolean add(E e)
    public void clear()
    public boolean remove(E e)
    public boolean contains(Object obj)
    public boolean isEmpty()
    public int size()
    ```

    -   `List` <font color="red">interface</font>: 添加的元素有序、可重复、有索引

        ```java
        void add(int index, E element)
        E remove(int index)
        E set(int index, E element)
        E get(int index)
        ```

```

		- `ArrayList`

		- `LinkedList`

	- `Set`<font color="red">interface</font>: 添加的元素无序、不重复、无索引

		- `HashSet`

			- `LinedHashSet`

		- `TreeSet`

- `Map` - 双列集合

---
## `Stream`流


 ``
```
