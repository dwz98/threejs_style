import { useLocation } from "react-router-dom";
import { routes } from "@/router";

export const useRouteMeta = () => {
	const location = useLocation();

	const currentRoute = routes.find((route) => route.path === location.pathname);

	return {
		meta: currentRoute?.meta,
		path: location.pathname,
		isHome: location.pathname === "/",
	};
};
