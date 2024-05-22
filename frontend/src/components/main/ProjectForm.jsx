import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formElements, formKeys, formSchemaDef } from '@/utils/project-config';
import { displayMessage, sanitizeProjectFormData } from '@/utils/helper';
import AddMoreDetails from '../helper/AddMoreDetails';
import { Switch } from '../ui/switch';

const formSchema = z.object(formSchemaDef);

function ProjectForm({ submitHandler, data, isLoading }) {
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: data || formKeys,
      resetOptions: {
         keepDirtyValues: false,
         keepErrors: false,
      },
   });

   const { fields: dynamicFormElements, append } = useFieldArray({
      control: form.control,
      name: 'additionalDetails',
   });

   function onSubmit(values) {
      const sanitizedData = sanitizeProjectFormData(values);

      const enteredDataLength = Object.values(sanitizedData).filter(item => item.length > 0).length;
      console.log(enteredDataLength);
      if(enteredDataLength < 2) {
         displayMessage('Please add atleast one field.', true);
         return;
      }
      submitHandler(sanitizedData);
   }
   return (
      <div className="max-w-[600px] mx-auto">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               {formElements.map((el, idx) => (
                  <FormField
                     key={el.id}
                     control={form.control}
                     name={el.name}
                     render={({ field }) => (
                        <FormItem
                           className={`${
                              el.inputElement === 'switch'
                                 ? 'flex items-center space-x-3 space-y-0'
                                 : ''
                           }`}
                        >
                           <FormLabel>{el.label}</FormLabel>
                           <FormControl>
                              {el.inputElement === 'switch' ? (
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              ) : (
                                 <Input
                                    placeholder={
                                       el.placeholder || 'Enter ' + el.label
                                    }
                                    {...field}
                                 />
                              )}
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               ))}
               {dynamicFormElements.map((el, idx) => (
                  <div className="space-y-2" key={el.id}>
                     <FormLabel>Additional Detail {idx + 1}</FormLabel>
                     <div className="flex space-x-3">
                        <FormField
                           control={form.control}
                           name={`additionalDetails[${idx}].title`}
                           render={({ field }) => (
                              <FormItem className="max-w-[175px]">
                                 <FormControl>
                                    <Input placeholder="Title" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={`additionalDetails[${idx}].description`}
                           render={({ field }) => (
                              <FormItem className="grow">
                                 <FormControl>
                                    <Input
                                       placeholder="Description"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
               ))}
               <div className="flex items-center justify-between">
                  <Button isLoading={isLoading} type="submit">
                     Submit
                  </Button>
                  <AddMoreDetails
                     clickHandler={() => append({ title: '', description: '' })}
                  />
               </div>
            </form>
         </Form>
      </div>
   );
}
export default ProjectForm;
