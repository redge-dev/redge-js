export type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | undefined
  | null
  | boolean;

export interface ClassDictionary {
  [id: string]: any;
}

export type ClassArray = Array<ClassValue>;

const hasOwn = {}.hasOwnProperty;

const appendClass = (value: string, newClass: string): string => {
  if (!newClass) {
    return value;
  }
  if (value) {
    return value + ' ' + newClass;
  }
  return value + newClass;
};

const parseValue = (arg: ClassValue): string => {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return String(arg);
  }

  if (typeof arg !== 'object' || arg === null) {
    return '';
  }

  if (Array.isArray(arg)) {
    return cn(...arg);
  }

  if (
    arg.toString !== Object.prototype.toString &&
    !arg.toString.toString().includes('[native code]')
  ) {
    return arg.toString();
  }

  let classes = '';

  for (const key in arg) {
    if (hasOwn.call(arg, key) && arg[key]) {
      classes = appendClass(classes, key);
    }
  }

  return classes;
};

export const cn = (...args: ClassValue[]): string => {
  let classes = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
};
