/*

 * @FilePath: /TS-demo-Original/src/pages/Home.tsx
 */
import { useImmer } from '@hooks/useImmer';
import { useTest } from '@hooks/useTest';
import { atom, useAtom } from 'jotai';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { currentUser } from '../api/home';
import { Button } from 'antd';
const textAtom = atom('hello');

function Home() {
  const [uppercase, setUppercase] = useImmer({ a: 123 });
  const handleChange = useCallback(() => {
    setUppercase(draf => {
      draf.a = 1234;
    });
  }, [setUppercase]);
  return (
    <>
      <div className='bg-amber-800'>1243</div>
      <input type="button" value={uppercase.a} onClick={handleChange} />
      <Button type="primary">hah</Button>
    </>
  );
}
Home.whyDidYouRender = true;
export default memo(Home);
