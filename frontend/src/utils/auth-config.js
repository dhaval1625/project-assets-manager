import { z } from 'zod';

export const signupFormElements = [
   {
      id: 'f1',
      name: 'userName',
      validationSchema: z.string().min(1, { message: 'Name is required' }),
      label: 'Name',
      autoComplete: 'username',
   },
   {
      id: 'f2',
      name: 'email',
      validationSchema: z
         .string()
         .min(1, { message: 'Email is required' })
         .email({ message: 'Please enter a valid email!' }),
      label: 'Email',
      autoComplete: 'email',
   },
   {
      id: 'f3',
      name: 'password',
      validationSchema: z
         .string()
         .min(6, { message: 'Password must be atleast 6 characters long!' }),
      label: 'Password',
      type: 'password',
      autoComplete: 'new-password',
   },
   {
      id: 'f4',
      name: 'cnfPassword',
      validationSchema: z.string(),
      label: 'Confirm password',
      type: 'password',
      autoComplete: 'new-password',
   },
];

const signupSchemaObj = {};
const signupFormKeysObj = {};

signupFormElements.forEach(el => {
   signupSchemaObj[el.name] = el.validationSchema;
   signupFormKeysObj[el.name] = '';
});

export const signupFormSchemaDef = signupSchemaObj;
export const signupFormKeys = signupFormKeysObj;
export const signupFormSchema = z
   .object(signupFormSchemaDef)
   .refine(data => data.password === data.cnfPassword, {
      message: 'Must be equal to password entered above!',
      path: ['cnfPassword'],
   });

export const loginFormElements = [
   {
      id: 'f2',
      name: 'email',
      validationSchema: z
         .string()
         .min(1, { message: 'Email is required' })
         .email({ message: 'Please enter a valid email!' }),
      label: 'Email',
      autoComplete: 'email',
   },
   {
      id: 'f3',
      name: 'password',
      validationSchema: z
         .string()
         .min(6, { message: 'Password must be atleast 6 characters long!' }),
      label: 'Password',
      type: 'password',
      autoComplete: 'current-password',
   },
];

const loginSchemaObj = {};
const loginFormKeysObj = {};

loginFormElements.forEach(el => {
   loginSchemaObj[el.name] = el.validationSchema;
   loginFormKeysObj[el.name] = '';
});

export const loginFormSchemaDef = loginSchemaObj;
export const loginFormKeys = loginFormKeysObj;
export const loginFormSchema = z.object(loginFormSchemaDef);
