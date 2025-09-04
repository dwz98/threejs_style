import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { routes } from "@/router";

export default function Navigation() {
	const location = useLocation();
	const [isExpanded, setIsExpanded] = useState(false);

	// 过滤出课程路由
	const lessonRoutes = routes.filter((route) => route.path !== "/");

	return (
		<nav className="fixed top-4 right-4 z-50">
			{/* 悬浮图标 */}
			<div
				className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-all duration-300"
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
			>
				<svg
					className="w-6 h-6 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</div>

			{/* 展开的导航菜单 */}
			{isExpanded && (
				<div
					className="absolute right-0 top-16 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-4 min-w-48 shadow-xl border border-gray-700"
					onMouseEnter={() => setIsExpanded(true)}
					onMouseLeave={() => setIsExpanded(false)}
				>
					{/* 首页链接 */}
					<Link
						to="/"
						className={`block px-3 py-2 rounded text-white text-sm mb-2 transition-colors ${
							location.pathname === "/"
								? "bg-blue-600 text-white"
								: "hover:bg-gray-700"
						}`}
					>
						🏠 首页
					</Link>

					{/* 分割线 */}
					<div className="border-t border-gray-600 my-2"></div>

					{/* 课程链接 */}
					{lessonRoutes.map((route) => (
						<Link
							key={route.path}
							to={route.path!}
							className={`block px-3 py-2 rounded text-white text-sm transition-colors ${
								location.pathname === route.path
									? "bg-blue-600 text-white"
									: "hover:bg-gray-700"
							}`}
						>
							{route.meta?.icon} {route.meta?.title}
						</Link>
					))}
				</div>
			)}
		</nav>
	);
}
