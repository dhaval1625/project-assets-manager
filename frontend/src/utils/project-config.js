import { z } from 'zod';

export const formElements = [
   {
      id: 'f1',
      name: 'projectTitle',
      validationSchema: z.string().min(1, {message: 'Project Title is required'}),
      label: 'Project Title',
   },
   {
      id: 'f2',
      name: 'url',
      validationSchema: z.string().url({message: 'Please enter a valid url!'}).optional().or(z.literal('')),
      label: 'URL',
   },
   {
      id: 'f3',
      name: 'figma',
      validationSchema: z.string(),
      label: 'Figma Link',
   },
   {
      id: 'f4',
      name: 'github',
      validationSchema: z.string(),
      label: 'Github repo',
   },
   {
      id: 'f5',
      name: 'isCurrent',
      validationSchema: z.boolean(),
      label: 'Are you currently working on this project?',
      inputElement: 'switch',
      defaultValue: true,
   }
]

const schemaObj = {};
const formKeysObj = {};

formElements.forEach(el => {
   schemaObj[el.name] = el.validationSchema;
   if(el.defaultValue) {
      formKeysObj[el.name] = el.defaultValue;
   }
   else formKeysObj[el.name] = '';
})

schemaObj.additionalDetails = z.array(z.object({title: z.string(), description: z.string()}));

export const formSchemaDef = schemaObj;
export const formKeys = formKeysObj;

export const projectElements = [
   {
      id: 'p1',
      label: 'URL',
      handle: 'primaryUrl',
   },
   {
      id: 'p2',
      label: 'Figma',
      handle: 'figma',
   },
   {
      id: 'p3',
      label: 'Github',
      handle: 'githubRepo',
   },
]