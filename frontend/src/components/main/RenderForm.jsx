import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

function RenderForm({ submitHandler, formElements, formKeys, formSchema, isLoading }) {
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: formKeys,
   });

   function onSubmit(values) {
      submitHandler(values);
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
                                 autoComplete={el.autoComplete || 'on'}
                                 type={el.type || 'text'}
                                 placeholder={el.placeholder || 'Enter ' + el.label}
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               ))}
               <Button isLoading={isLoading} type="submit">Submit</Button>
            </form>
         </Form>
      </div>
   );
}
export default RenderForm;
