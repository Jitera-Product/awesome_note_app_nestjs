interface IStringFieldOptions {
    length?: number;
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
    allowEmpty?: boolean;
    email?: boolean;
    url?: boolean;
    regex?: {
        pattern: string;
        message?: string;
    };
    equalTo?: string;
}
interface INumberFieldOptions {
    each?: boolean;
    minimum?: number;
    maximum?: number;
    int?: boolean;
    isPositive?: boolean;
    equal?: boolean;
}
interface IDateFieldOptions {
    minDate?: Date;
    maxDate?: Date;
}
export declare function StringField(options?: IStringFieldOptions): PropertyDecorator;
export declare function StringFieldOptional(options?: IStringFieldOptions): PropertyDecorator;
export declare function NumberField(options?: INumberFieldOptions): PropertyDecorator;
export declare function NumberFieldOptional(options?: INumberFieldOptions): PropertyDecorator;
export declare function EnumField<TEnum>(getEnum: () => TEnum, options?: Partial<{
    each: boolean;
}>): PropertyDecorator;
export declare function EnumFieldOptional<TEnum>(getEnum: () => TEnum, options?: Partial<{
    each: boolean;
}>): PropertyDecorator;
export declare function BooleanField(options?: Partial<{}>): PropertyDecorator;
export declare function BooleanFieldOptional(options?: Partial<{}>): PropertyDecorator;
export declare function DateField(options: IDateFieldOptions): PropertyDecorator;
export declare function DateFieldOptional(options?: {}): PropertyDecorator;
export declare function ResponseField(options?: {}): PropertyDecorator;
export declare function ResponseTypeField<T extends Function>(getType: () => T, options?: {}): PropertyDecorator;
export {};
