import { RouteObject } from 'react-router-dom';
import Loading from '@components/Loading';
import MainLayout from '@layouts/MainLayout';
import NotFound from '@pages/NotFound';
import { Suspense } from 'react';
import layoutChildrenRoutes from './mainRoutes'

const Routes: RouteObject[] = [];

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    ...layoutChildrenRoutes
  ],
};

const staticRoutes = [
  {
    path: '*',
    element: <NotFound />,
  }
];

Routes.push(mainRoutes, ...staticRoutes);

export default Routes;
