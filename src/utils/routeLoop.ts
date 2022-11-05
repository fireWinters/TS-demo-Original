import { CustomRoute } from '../type/CustomRoute';

export interface Route {
  path: string;
  routes: Array<{
    exact?: boolean;
    icon?: string;
    name: string;
    path: string;
    // 可选二级菜单
    routes?: Route['routes'];
  }>;
}

export default function routeLoop(route: CustomRoute[]): Route['routes'] {
  return route.filter(item => item.meta?.isNavBar).map(item => {
    let resItem: {
      exact?: boolean;
      icon?: string;
      name: string;
      path: string;
      // 可选二级菜单
      routes?: Route['routes'];
    } = {} as any;

    resItem.name = item.name;
    resItem.path = item.path;
    // resItem.icon = item.icon;

    if (item.children) {
      resItem.routes = routeLoop(item.children);
    }

    return resItem;
  });
}