/*

 * @FilePath: /TS-demo-Original/src/main.tsx
 */

import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './wdyr';
import { RecoilRoot } from 'recoil';
import './style.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
);
