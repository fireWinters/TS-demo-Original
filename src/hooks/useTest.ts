import { useCallback, useRef } from 'react';

export function useTest() {
  const lastCallId = useRef(0);
  const fn = () => {
    console.log('执行到位');
    lastCallId.current = lastCallId.current + 1;
  };
  lastCallId.current++;
  //   setInterval(() => {
  //     lastCallId.current++;
  //   });

  console.log('lastCallId.current: ', lastCallId.current);

  return [fn, lastCallId] as const;
}
