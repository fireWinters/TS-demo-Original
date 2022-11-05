export type PromiseType<P extends Promise<unknown>> = P extends Promise<infer T>
  ? T
  : never;

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;
