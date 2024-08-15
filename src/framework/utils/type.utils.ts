export type Maybe<T> = T | undefined;

export type TypeOfConst<Const> = Const[keyof Const];

export type ScalarValue = string | number | boolean | undefined | null;
