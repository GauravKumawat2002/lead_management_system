export declare global {
  type ConvertSnakeToCamel<StringType extends string> =
    StringType extends `${infer FirstPart}_${infer RestParts}`
      ? `${FirstPart}${Capitalize<ConvertSnakeToCamel<RestParts>>}`
      : StringType;
  type ConvertCamelToSnake<S extends string> = S extends `${infer T}${infer U}`
    ? T extends Capitalize<T>
      ? `_${Lowercase<T>}${ConvertCamelToSnake<U>}`
      : `${T}${ConvertCamelToSnake<U>}`
    : S;
  type ConvertObjectKeysToSnake<T> =
    T extends Array<infer U>
      ? Array<ConvertObjectKeysToSnake<U>>
      : T extends object
        ? {
            [K in keyof T as ConvertCamelToSnake<
              K & string
            >]: ConvertObjectKeysToSnake<T[K]>;
          }
        : T;
  type ConvertObjectKeysToCamel<ObjectType> = {
    [KeyName in keyof ObjectType as ConvertSnakeToCamel<
      string & KeyName
    >]: ObjectType[KeyName];
  };
}
