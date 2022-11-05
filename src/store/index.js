/*

 * @FilePath: /TS-demo-Original/src/store/index.js
 */
import { atom } from 'recoil';

export const globalLoading = atom({
  key: 'globalLoading',
  default: false,
});
