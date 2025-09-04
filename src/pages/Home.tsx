import { Link } from "react-router-dom";
import { routes } from "@/router";
import { Button, Flex } from "antd";

export default function Home() {
	// 过滤掉首页，只显示课程
	const lessonRoutes = routes.filter((route) => route.path !== "/");

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
			{/* 主要内容 */}
			<div className="container mx-auto px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
						Three.js 学习课程
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						从基础几何体到高级动画，一步步掌握Three.js的核心概念和实用技巧
					</p>
				</div>

				{/* 课程网格 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{lessonRoutes.map((route) => (
						<Link
							key={route.path}
							to={route.path!}
							className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 hover:border-opacity-40 hover:scale-105"
						>
							<div className="text-center">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<span className="text-2xl">📚</span>
								</div>
								<h2 className="text-2xl font-semibold mb-3">
									{route.meta?.title}
								</h2>
								<p className="text-gray-300">{route.meta?.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
