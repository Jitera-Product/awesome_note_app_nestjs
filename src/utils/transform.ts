import { ClassConstructor, plainToClass } from 'class-transformer';

export function serialize<T, O>(transformClass: ClassConstructor<T>, plainObject: O) {
  return plainToClass(transformClass, plainObject, { excludeExtraneousValues: true });
}

export function serializeArray<T, O>(transformClass: ClassConstructor<T>, plainArray: O[]) {
  return plainArray.map((object) =>
    plainToClass(transformClass, object, { excludeExtraneousValues: true }),
  );
}
