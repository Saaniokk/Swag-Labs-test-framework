

export type BasicWait = 'load' | 'domcontentloaded' | 'networkidle' | undefined;
type WaitUntil = BasicWait | 'commit';
export type GotoOptions = {
  referer?: string;
  timeout?: number;
  waitUntil?: WaitUntil;
};