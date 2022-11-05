/*

 * @FilePath: /TS-demo-Original/src/routers/mainRoutes.tsx
 */
import Home from '@pages/Home';
import Courses from '@pages/Courses';
import WorkOrderTemplate from '@pages/WorkOrder/Templates/index';
import Preset from '@pages/WorkOrder/Preset/index';

const layoutChildrenRoutes = [
  {
    path: '/',
    element: <Home />,
    name: '首页',
    meta: {
      isNavBar: true,
    },
  },
  {
    path: '/admin',
    name: '管理页',
    meta: {
      isNavBar: true,
    },
    children: [
      {
        path: '/admin/list',
        name: '管理列表页',
        element: <Courses />,
        meta: {
          isNavBar: true,
        },
      },
      {
        path: '/admin/create',
        name: '管理创建页',
        element: <Courses />,
      },
    ],
  },
  {
    path: '/workOrder',
    name: '工单',
    meta: {
      isNavBar: true,
    },
    children: [
      {
        path: 'templates',
        name: '工单模板',
        element: <WorkOrderTemplate />,
        meta: {
          isNavBar: true,
        },
      },
      {
        path: 'preset',
        name: '预设模板数据',
        element: <Preset />,
        meta: {
          isNavBar: true,
        },
      },
    ],
  },
];

export default layoutChildrenRoutes;
