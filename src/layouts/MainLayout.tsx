import { Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { ProLayout, ProBreadcrumb } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProps from './_defaultProps';

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState(location.pathname || '/');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: '工单系统',
        }}
        onMenuHeaderClick={e => console.log(1111, e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              console.log(item);
              setPathname(item.path || '/');
              navigate(item.path || '/', { replace: true });
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        headerContentRender={() => <ProBreadcrumb />}
        breadcrumbRender={(routers = []) => [...routers]}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};
