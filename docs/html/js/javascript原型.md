# JavaScript 对象、原型&原型链

Javascript 是一门弱类型的动态语言，其中原型`[[Prototype]]`是一个重要的概念和组成部分。JS 几乎所有的对象在创建是都会被赋予`[[Prototype]]`，然后新对象的`[[Prototype]]`指向父对象的`[[Prototype]]`，就这样根生一，一生二，二生三，形成了一条链，可以称之为原型链。以下是根据《Javascript 高级程序设计》红皮书做的一些笔记记录。

## `[[prototype]]`

JavaScript 中的对象有一个特殊的`[[Prototype]]`内置属性，保存着对其他对象的引用。几乎所有的对象在创建时`[[Prototype]]`属性都会被赋予一个非空的值。

```js
const person = {
	name: "zs",
};

person.name; // zs
```

`[[Prototype]]`在试图引用对象的属性时会触发`[[Get]]`操作（`Proxy`暂不讨论）。对于默认的`[[Get]]`操作，第一步时检查对象本身是否有这个属性，如果有的话就使用它。如果属性不存在，就需要使用对象的`[[Prototype]]`链查找。

对于默认的`[[Get]]`操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的`[[Prototype]]`链：

```js
const person = {
	name: "ls",
};

const ls = Object.create(person);

ls.name; // ls
```

`Object.create(...)`会创建一个对象并把这个对象的`[[Prototype]]`关联到指定对象。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc311bd4c2bf44e5a79e95a75b920cbb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=928&h=400&s=103771&e=png&b=fdfdfd)

上面的操作就`类似于`把对象`ls`的`[[prototype]]`指向了`person`，在找不到`name`属性的情况下，会到`person`去查找，所以输出了`ls`，如果找完整条链都没找到的话，则会输出`undefined`。

使用`for..in`遍历对象时原理和查找`[[prototype]]`类似，任何可以通过原型链访问到并且是可`enumerable`的属性都会被枚举。使用`in`操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（`无论属性是否可枚举`）。

```js
const person = {
	name: "zs",
};
const zs = Object.create(person);

for (let key in zs) {
	console.log("found: ", key);
}
// found: name
"name" in zs; //true
```

## `Object.prototype`

哪里是`[[Prototype]]`的尽头呢？

所有普通的`[[Prototype]]`链最终都会指向内置的`Object.prototype`。这里有个先有鸡还是先有蛋问题：

```js
Object.__proto__ === Function.prototype //true
Object instanceof Function  // true

Function.__proto__.__proto__ === Object.prototype // true
Function instance Object // true

Object instanceof Function // true
Function instanceof Object // true
```

## 属性设置和屏蔽

给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值。例如：

```js
myobj.txt = "test";
```

如果`myobj`对象中有`txt`属性（普通数据访问），那么上面的语句只会修改已有的属性值。

如果`txt`不是直接存在于`myobj`上，`[[Prototype]]`链就会被遍历，类似`[[Get]]`操作。如果原型链上找不到`txt`，那么就会在`myobj`上添加该属性。

如果属性名`txt`既存在于`myobj`上同时又存在于`[[Prototype]]`链上，那么就会发生屏蔽。`myobj`中包含的`txt`属性会屏蔽原型链上层的所有`txt`属性，因为`myobj.txt`总是会选择原型链中最底层的`txt`属性。屏蔽分很多种情况，下面分析的是如果`txt`不直接存在于`myobj`而是在原型链上是，上面的语句会出现三种情况。

1. 如果在`[[Prototype]]`链上存在`txt`，并且不是只读`writable:true`，那么就会直接在`myobj`中添加一个名为`txt `的新属性`（屏蔽属性）`

```js
const obj = { txt: "123" };

Object.defineProperty(obj, "txt", {
	writable: true,
}); //默认为true

const myobj = Object.create(obj);

myobj.txt = "321";

console.log(myobj.txt); // 321
```

2. 如果在`[[Prototype]]`链上存在`txt`，但是被标记为只读`writable:false`，那么无法修改已有属性或者在`myobj`上创建`屏蔽属性`。如果运行在严格模式下，代码会抛出错误。否则，这条语句会被忽略。

```js
const obj = { txt: "123" };

Object.defineProperty(obj, "txt", {
	writable: false,
});

const myobj = Object.create(obj);

myobj.txt = "321";

console.log(myobj.txt); // 123
console.log(myobj.hasOwnProperty("txt")); // false

// "use strict"
//在严格模式下会报错 TypeError: Cannot assign to read only property 'txt' of object '#<Object>'
```

只读`writable:false`属性会阻止`[[Prototype]]`链下层隐式创建（屏蔽）同名属性。这样做主要是为了模拟`类`属性的继承。可以把原型链上层的`txt`看作是父类中的属性，会被子类`myobj`继承（复制），这样一来`myobj`中的`txt`也是只读，所以无法创建。但要值得注意的是，`myobj`因为其他对象中有一个只读`txt`就不能添加`txt`属性吗？不是的，这个限制只有赋值操作(`=`)会出现，使用`Object.defineProperty(...)`不受影响。

3.如果在`[[Prototype]]`链上层存在`txt`并且它是一个`setter`，那就一定会调用这个`setter`。`txt`不会被添加到`myobj`，也不会重新定义`txt`这个`setter`。

```js
const obj = {
	get txt() {
		return this._txt_;
	},
	set txt(val) {
		this._txt_ = val + "2";
	},
};

obj.txt = "zs";
console.log(obj.txt); //zs2

const myobj = Object.create(obj);

myobj.txt = "ls";
console.log(myobj.txt); // ls2
console.log(obj.txt); // zs2
console.log(myobj.hasOwnProperty("txt")); // false
```
