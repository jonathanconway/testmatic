type Builder<TTarget extends object> = {
  readonly [Key in keyof TTarget]: BuilderAdder<TTarget, TTarget[Key]>;
} & {
  readonly build: () => TTarget;
  readonly values: Partial<TTarget>;
};

type BuilderAdder<TTarget extends object, TValue> = (
  value: TValue
) => Builder<TTarget>;

export function createBuilder<T extends object>(
  initialValues?: Partial<T>
): Builder<T> {
  const target: object = initialValues ?? {};

  const fields = new Map<keyof T, T[keyof T]>(
    Object.entries(initialValues ?? {}) as unknown as readonly (readonly [
      keyof T,
      T[keyof T]
    ])[]
  );

  const proxy = new Proxy(target, {
    get(_target, propertyName: string) {
      if (propertyName === "build") {
        return build;
      }

      if (propertyName === "values") {
        return target;
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
