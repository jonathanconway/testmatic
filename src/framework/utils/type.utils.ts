export type Maybe<T> = T | undefined;

export type TypeOfConst<Const> = Const[keyof Const];
