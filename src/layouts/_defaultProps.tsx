import { CustomRoute } from '../type/CustomRoute'
import mainRoutes from '../routers/mainRoutes';
import routeLoop from '../utils/routeLoop';

const routes = routeLoop(mainRoutes as CustomRoute[]);

export default {
  route: {
    path: '/',
    routes
  },
  location: {
    pathname: '/',
  },
};