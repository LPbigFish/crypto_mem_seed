// src/types/argon2-browser.d.ts
declare module 'argon2-browser/dist/argon2-bundled.min.js' {
  export function hash(
    options: Argon2BrowserHashOptions,
  ): Promise<Argon2BrowserHashResult>;

  export function verify(options: Argon2VerifyOptions): Promise<void>;

  export function unloadRuntime(): void;


  export interface Argon2BrowserHashOptions {
    pass: string | Uint8Array;
    salt: string | Uint8Array;
    time?: number;
    mem?: number;
    hashLen?: number;
    parallelism?: number;
    type?: ArgonType;
    distPath?: string;
    secret?: Uint8Array;
    ad?: Uint8Array;
  }

  export interface Argon2BrowserHashResult {
    encoded: string;
    hash: Uint8Array;
    hashHex: string;
  }

  export interface Argon2VerifyOptions {
    pass: string;
    encoded: string | Uint8Array;
    type?: ArgonType;
    secret?: Uint8Array;
    ad?: Uint8Array;
  }

  export interface Argon2Error {
    message: string;
    code: number;
  }

  export enum ArgonType {
    Argon2d = 0,
    Argon2i = 1,
    Argon2id = 2,
  }

  
  const argon2: {
    hash: typeof hash;
    verify: typeof verify;
    unloadRuntime: typeof unloadRuntime;
    ArgonType: typeof ArgonType;
  };

  export default argon2;
}