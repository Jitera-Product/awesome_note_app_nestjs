import { ClassConstructor } from 'class-transformer';
export declare function serialize<T, O>(transformClass: ClassConstructor<T>, plainObject: O): T;
export declare function serializeArray<T, O>(transformClass: ClassConstructor<T>, plainArray: O[]): T[];
