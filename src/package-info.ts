import packageInfoObject from "../package.json";

export interface PackageInfo {
  readonly name: string;
  readonly version: string;
  readonly description: string;
}

const packageInfo = packageInfoObject as PackageInfo;

export { packageInfo };
