import { message } from "antd";
import { useEffect } from "react";
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
}

//递归查询对应的路由
export function searchroutedetail(
  path: string,
  routes: RouteObject[]
): RouteObject | null {
  for (let item of routes) {
    if (item.path === path) return item;
    if (item.children) {
      return searchroutedetail(path, item.children);
    }
  }
  return null;
}

//全局路由守卫
function guard(
  location: Location,
  navigate: NavigateFunction,
  routes: RouteObject[]
) {
  const { pathname } = location;

  //找到对应的路由信息
  const routedetail = searchroutedetail(pathname, routes);

  //没有找到路由，跳转404
  if (!routedetail) {
    // navigate("/404");
    return false;
  }

  //如果需要权限验证
  if (routedetail.auth) {
    const token = localStorage.getItem("jiang_blog_token");
    if (!token) {
      message.warn("请登录");
      navigate(-1);
      return false;
    }
  }
  return true;
}

export const RouterGurad = (routes: RouteObject[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    guard(location, navigate, routes);
  }, [location, navigate, routes]);
  // document.documentElement.scrollTo(0, 0);
  const Route = useRoutes(routes);
  return Route;
};