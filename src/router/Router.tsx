import {
	createBrowserRouter,
	createHashRouter,
	RouterProvider,
} from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./index";

// 创建加载组件
function LoadingFallback() {
	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center">
			<div className="text-white text-xl">加载中...</div>
		</div>
	);
}

// const router = createBrowserRouter(routes);
const router = createHashRouter(routes);

export default function Router() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}
