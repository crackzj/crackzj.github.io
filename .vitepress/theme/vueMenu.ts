import type { DefaultTheme } from "vitepress";

export const vueMenu: DefaultTheme.Sidebar = {
	"/docs/vue/": [
		{
			text: "Vue3系列日记",
			items: [
				{ text: "index", link: "/docs/vue/index" },
				{ text: "vue3入门", link: "/docs/vue/vue3入门" },
			],
		},
	],
};
