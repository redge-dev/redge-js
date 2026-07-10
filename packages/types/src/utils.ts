export type Merge<T, P> = T & Omit<P, keyof T>;
