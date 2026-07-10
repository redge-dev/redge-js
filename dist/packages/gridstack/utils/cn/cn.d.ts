export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;
export interface ClassDictionary {
    [id: string]: any;
}
export type ClassArray = Array<ClassValue>;
export declare const cn: (...args: ClassValue[]) => string;
//# sourceMappingURL=cn.d.ts.map