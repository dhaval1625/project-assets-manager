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
import { transformAdditionalDetails, convertAdditionalToString } from '@/utils/helper';
import AddMoreDetails from '../helper/AddMoreDetails';
import { Switch } from '../ui/switch';

const formSchema = z.object(formSchemaDef);

function ProjectForm({ submitHandler, data, isLoading }) {
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: data
         ? { ...data, additionalDetails: convertAdditionalToString(data.additionalDetails) }
         : formKeys,
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
      const transformedData = {
         ...values,
         additionalDetails: transformAdditionalDetails(values.additionalDetails),
      };
      submitHandler(transformedData);
   }
   return (
      <div className="max-w-[600px] mx-auto">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8"
            >
               {formElements.map((el, idx) => (
                  <FormField
                     key={el.id}
                     control={form.control}
                     name={el.name}
                     render={({ field }) => (
                        <FormItem className={`${el.inputElement === 'switch' ? "flex items-center space-x-3 space-y-0" : ''}`}>
                           <FormLabel>{el.label}</FormLabel>
                           <FormControl>
                              {el.inputElement === 'switch' ? (
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                 />
                              ) : (
                                 <Input
                                    placeholder={el.placeholder || 'Enter ' + el.label}
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
                  <FormField
                     key={el.id}
                     control={form.control}
                     name={`additionalDetails[${idx}].item`}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Additional Detail {idx + 1}</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Title - Description"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               ))}
               <div className="flex items-center justify-between">
                  <Button
                     isLoading={isLoading}
                     type="submit"
                  >
                     Submit
                  </Button>
                  <AddMoreDetails clickHandler={() => append({ item: '' })} />
               </div>
            </form>
         </Form>
      </div>
   );
}
export default ProjectForm;
