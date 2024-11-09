import { FieldValues, RegisterOptions } from 'react-hook-form';

export type FormValidationRules<T extends FieldValues> = {
  [K in keyof T]?:  RegisterOptions<T, any> | undefined;
};

// export const formField = getFormField<Form>(FormRules);
// export function getFormField<T extends object>(formRules: CompleteUser<T>) {
//   return function (name: keyof T): [keyof T, RegisterOptions<T, any> | undefined] {
//     if (name in formRules) {
//       return [name, formRules[name]];
//     }
//     return [name, undefined];
//   };
// }
