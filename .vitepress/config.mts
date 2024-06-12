import { defineConfig } from "vitepress";
import sidebar from "./theme/sidebar";
// https://vitepress.dev/reference/site-config
export default defineConfig({
	head: [["link", { rel: "icon", href: "/favicon.ico" }]],
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
			{
				text: "后端",
				items: [
					{ text: "Golang", link: "/docs/go" },
					{ text: "Java", link: "/docs/java" },
					{ text: "Python", link: "/docs/python" },
				],
			},
			{
				text: "移动端",
				items: [
					{ text: "ios", link: "/docs/ios" },
					{ text: "android", link: "/docs/android" },
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
		sidebar: sidebar,

		socialLinks: [{ icon: "github", link: "https://github.com/crackzj" }],
		footer: {
			message: `<span style="display:flex;justify-content:center;align-items:center;"><img src="/police.png" style="width:20px;height:20px;"/> <a style="text-decoration:none" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52012202006122" target="_blank">&nbsp;&nbsp;贵公网安备52012202006122号</a><a style="text-decoration:none" href="https://beian.miit.gov.cn" target="_blank">&nbsp;&nbsp;黔ICP备17007116号&nbsp;&nbsp;</a>Copyright © 2019-${new Date().getFullYear()} <a style="text-decoration:none" href="https://github.com/crackzj">crackzj</a><span>`,
			copyright: ``,
		},
	},
});
