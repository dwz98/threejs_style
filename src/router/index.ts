import { lazy } from "react";

// 懒加载组件
const Home = lazy(() => import("@/pages/Home"));
const Lesson01 = lazy(() => import("@/lessons/Lesson01"));
const Lesson02 = lazy(() => import("@/lessons/Lesson02"));
const Lesson03 = lazy(() => import("@/lessons/Lesson03"));
const Lesson04 = lazy(() => import("@/lessons/Lesson04"));
const Text = lazy(() => import("@/lessons/01-basics/Text"));
const Lights = lazy(() => import("@/lessons/02-classic-techniques/Lights"));

// 路由配置
export const routes = [
	{
		path: "/",
		Component: Home,
		meta: {
			title: "Three.js 学习课程",
			description: "欢迎来到Three.js学习之旅",
			icon: "🏠",
		},
	},
	{
		path: "/lesson1",
		Component: Lesson01,
		meta: {
			title: "课程1: 基础几何体",
			description: "学习创建和操作基础几何体",
			icon: "📐",
			backgroundColor: "#222333",
			lightingType: "basic",
			enableHelpers: true,
		},
	},
	{
		path: "/lesson2",
		Component: Lesson02,
		meta: {
			title: "课程2: 材质与纹理",
			description: "探索不同类型的材质和它们的特性",
			icon: "🎨",
			backgroundColor: "#1a1a2e",
			lightingType: "studio",
			enableHelpers: true,
		},
	},
	{
		path: "/lesson3",
		Component: Lesson03,
		meta: {
			title: "课程3: 光照系统",
			description: "学习Three.js中的光照技术",
			icon: "💡",
			backgroundColor: "#0f0f23",
			lightingType: "studio",
			enableHelpers: true,
		},
	},
	{
		path: "/lesson4",
		Component: Lesson04,
		meta: {
			title: "课程4: 动画基础",
			description: "掌握Three.js动画制作技巧",
			icon: "🎬",
			backgroundColor: "#1a1a2e",
			lightingType: "basic",
			enableHelpers: true,
		},
	},
	{
		path: "/Text",
		Component: Text,
		meta: {
			title: "Text字体",
			description: "掌握导入字体，并使用Text创建文字",
			icon: "🎬",
			backgroundColor: "#1a1a2e",
			lightingType: "basic",
			enableHelpers: true,
		},
	},
	{
		path: "/Lights",
		Component: Lights,
		meta: {
			title: "Lights灯光使用",
			description: "学习各种灯光的使用，以及各种用法",
			icon: "🎬",
			backgroundColor: "#1a1a2e",
			lightingType: "basic",
			enableHelpers: true,
		},
	},
];

// 路由守卫
export const beforeRouteEnter = (to) => {
	if (to.meta?.title) {
		document.title = `${to.meta.title} - Three.js学习`;
	}
	return true;
};
