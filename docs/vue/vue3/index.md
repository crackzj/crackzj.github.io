# `vue3`简介

> - Vue2 已于 2023 年 12 月 31 停止维护。详见 [Vue 2 终止支持 (EOL)](https://v2.cn.vuejs.org/eol/)。
>
> - 想从`Vue2`升级？请参考[迁移指南](https://v3-migration.vuejs.org/)。

`Vue`是一款用于构建用户界面的`Javascript`框架。它基于标准`HTML` `CSS` 和`Javascript`构建，并提供了一套声明式、组件化的编程模型。

`Vue3.0` 代号 `One Piece`于 2020 年 9 月 19 日凌晨正式发布，此次更新为用户提供了全新的`composition-api`以及更小的包大小，和更好的`Typescript`支持。

`Vue3.x`版本在性能上有巨大提升，写法上也有很大的差异（也兼容`Vue2`的`Options`选项式写法）

```vue
<template>
	<div>vue2</div>
	<div>{{ msg }}</div>
</template>

<script>
export default {
	data() {
		return {
			msg: "hello vue2",
		};
	},
	components: {},
	computed: {},
	methods: {
		//TODO
	},
};
</script>
```

以上是以前`Vue2`的选项时写法，接下来看看`Vue3`的新语法。

```vue
<template>
	<div>Vue3</div>
	<div>{{ msg }}</div>
</template>

<script>
import { ref } from "vue";
export default {
	setup() {
		const msg = ref("hello vue3");
		return {
			msg,
		};
	},
};
</script>
```

`Vue3`还可以使用`setup`语法糖

```vue
<template>
	<div>Vue3</div>
	<div>{{ msg }}</div>
</template>

<script setup>
import { ref } from "vue";
const msg = ref("hello vue3");
</script>
```
