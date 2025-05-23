export interface TableHeader<T> {
  key: keyof T;
  label: string;
}

export type TableRow<T> = {
  [K in keyof T]: T[K];
};
