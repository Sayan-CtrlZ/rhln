import { _ as lazyRouteComponent, h as createRouter, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as Route$7 } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BIilLra7.js
var $$splitComponentImporter$6 = () => import("./routes-COh7IGvb.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./api-DSjwpfZ-.mjs");
var Route$5 = createFileRoute("/api")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./changes-BiwbmiqA.mjs");
var Route$4 = createFileRoute("/changes")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./documents-1NpGQnAV.mjs");
var Route$3 = createFileRoute("/documents")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./jurisdictions-C4TFslQe.mjs");
var Route$2 = createFileRoute("/jurisdictions")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./lookup-DjjLl1wy.mjs");
var Route$1 = createFileRoute("/lookup")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./rules-CiOmI2jj.mjs");
var Route = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	ApiRoute: Route$5.update({
		id: "/api",
		path: "/api",
		getParentRoute: () => Route$7
	}),
	ChangesRoute: Route$4.update({
		id: "/changes",
		path: "/changes",
		getParentRoute: () => Route$7
	}),
	DocumentsRoute: Route$3.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => Route$7
	}),
	JurisdictionsRoute: Route$2.update({
		id: "/jurisdictions",
		path: "/jurisdictions",
		getParentRoute: () => Route$7
	}),
	LookupRoute: Route$1.update({
		id: "/lookup",
		path: "/lookup",
		getParentRoute: () => Route$7
	}),
	RulesRoute: Route.update({
		id: "/rules",
		path: "/rules",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
