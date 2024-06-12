import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Crackzj's Blog",
	description: "卜夋小站",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		siteTitle: `卜夋小站`,
		logo: "/logo.png",
		nav: [
			{ text: "首页", link: "/" },
			{
				text: "前端",
				items: [
					{ text: "vue", link: "/docs/vue/index" },
					{ text: "react", link: "/docs/react" },
					{ text: "html", link: "/docs/html" },
				],
			},
			{ text: "更多", link: "/docs/other" },
		],

		// sidebar: [
		// 	{
		// 		text: "Examples",
		// 		items: [
		// 			{ text: "Markdown Examples", link: "/markdown-examples" },
		// 			{ text: "Runtime API Examples", link: "/api-examples" },
		// 		],
		// 	},
		// ],
		sidebar: {
			"/docs/vue/": [
				{
					text: "GUide",
					items: [
						{ text: "index", link: "/docs/vue/" },
						{ text: "one", link: "/docs/vue/one" },
					],
				},
			],
			"/docs/react": [
				{
					text: "React",
					items: [
						{ text: "index", link: "/docs/react/" },
						{ text: "one", link: "/docs/react/one" },
					],
				},
			],
			"/docs/html/": [
				{
					text: "HTML",
				},
				{
					text: "CSS",
				},
				{
					text: "JavaScript",
				},
			],
			"/docs/other/": [
				{
					text: "杂记",
					items: [],
				},
			],
		},

		socialLinks: [{ icon: "github", link: "https://github.com/crackzj" }],
		footer: {
			message: `<span style="display:flex;justify-content:center;align-items:center;"><img src="/police.png" style="width:20px;height:20px;"/> <a style="text-decoration:none" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52012202006122" target="_blank">&nbsp;&nbsp;贵公网安备52012202006122号</a><a style="text-decoration:none" href="https://beian.miit.gov.cn" target="_blank">&nbsp;&nbsp;黔ICP备17007116号&nbsp;&nbsp;</a><span>`,
			copyright: `Copyright © 2019-${new Date().getFullYear()} <a style="text-decoration:none" href="https://github.com/crackzj">crackzj</a>`,
		},
	},
});
