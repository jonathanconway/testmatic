export interface Token {
  readonly type: string;
  readonly name: string;
  readonly toString: () => string;
}
