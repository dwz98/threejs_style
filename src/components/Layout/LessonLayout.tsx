import { ReactNode } from "react";
import Navigation from "@/components/UI/Navigation";
import { useRouteMeta } from "@/hooks/useRouteMeta";

interface LessonLayoutProps {
	children: ReactNode;
	// 移除title和description参数，直接从路由获取
}

export default function LessonLayout({ children }: LessonLayoutProps) {
	const { meta, isHome } = useRouteMeta();

	// 如果是首页，不显示标题栏
	if (isHome) {
		return (
			<div className="min-h-screen bg-gray-900">
				<Navigation />
				{children}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900">
			<Navigation />
			<div className="relative">
				{meta && (
					<div className="absolute top-4 left-4 z-10 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 rounded-lg border border-white border-opacity-20">
						<div className="flex items-center gap-2 mb-1">
							{meta.icon && <span className="text-lg">{meta.icon}</span>}
							<h1 className="text-xl font-bold">{meta.title}</h1>
						</div>
						{meta.description && (
							<p className="text-sm opacity-80">{meta.description}</p>
						)}
					</div>
				)}
				{children}
			</div>
		</div>
	);
}
