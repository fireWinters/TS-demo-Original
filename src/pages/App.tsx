/*

 * @FilePath: /TS-demo-Original/src/pages/App.tsx
 */
import { RouterGurad } from '@components/RouterGurad';
import routes from '../routers';
import './App.css';
import { Spin } from 'antd';
import { globalLoading } from '../store';
import { useRecoilValue } from 'recoil';

const App = (): JSX.Element => {
  const routing = RouterGurad(routes);

  return (
    <div>
      {useRecoilValue(globalLoading) ? <Spin size="large">{routing}</Spin> : <>{routing}</>}
    </div>
  );
};
export default App;
