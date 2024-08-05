export interface Action<TName, TParams> {
  readonly name: TName;
  readonly params: TParams;
}
