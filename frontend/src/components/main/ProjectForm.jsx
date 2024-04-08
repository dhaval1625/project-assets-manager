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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { transformAdditionalDetails, convertAdditionalToString } from '@/utils/helper';

const formSchema = z.object(formSchemaDef);

function ProjectForm({ submitHandler, data, isLoading }) {

   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: data ? {...data, additionalDetails: convertAdditionalToString(data.additionalDetails)} : formKeys,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               {formElements.map((el, idx) => (
                  <FormField
                     key={el.id}
                     control={form.control}
                     name={el.name}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>{el.label}</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder={el.placeholder || 'Enter ' + el.label}
                                 {...field}
                              />
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
                              <Input placeholder="Title - Description" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               ))}
               <div className="flex items-center justify-between">
                  <Button isLoading={isLoading} type="submit">Submit</Button>
                  <TooltipProvider delayDuration={300}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button
                              onClick={() => append({ item: '' })}
                              className="text-3xl rounded-full"
                              type="button"
                              variant="outline"
                              size="icon"
                           >
                              +
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                           <p>Add more details</p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </div>
            </form>
         </Form>
      </div>
   );
}
export default ProjectForm;
