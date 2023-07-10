export * from "./doc-generators";
export * from "./core";

(global as any).test = (global.test || function () {}) as any;
