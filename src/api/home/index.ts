/*
 * @Author: 吴芬燕
 * @wufenyan@hualala.com
 * @Date: 2022-08-02 14:32:27
 * @Description: 统一接口格式
 * @FilePath: /mis-workOrder-web-fe/src/service/api.ts
 */
import request from '@service/index';

/** 接口作用xxx POST /api/xxx */
export async function currentUser(options?: { [key: string]: any }) {
  return await request.post({
    url: '/xxx',
    ...options,
  });
}