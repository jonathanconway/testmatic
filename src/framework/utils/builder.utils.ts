type Builder<TTarget extends object> = {
  readonly [Key in keyof TTarget]: BuilderAdder<TTarget, TTarget[Key]>;
} & {
  readonly build: () => TTarget;
};

type BuilderAdder<TTarget extends object, TValue> = (
  value: TValue
) => Builder<TTarget>;

export function createBuilder<T extends object>(): Builder<T> {
  const fields = new Map<keyof T, T[keyof T]>();

  const target: object = {};

  const proxy = new Proxy(target, {
    get(_target, propertyName: string) {
      if (propertyName === "build") {
        return build;
      }

      return function <TValue extends T[keyof T]>(value: TValue): Builder<T> {
        fields.set(propertyName as keyof T, value);
        return proxy as Builder<T>;
      };
    },
  });

  function build() {
    return Object.fromEntries(fields.entries()) as T;
  }

  return proxy as Builder<T>;
}
