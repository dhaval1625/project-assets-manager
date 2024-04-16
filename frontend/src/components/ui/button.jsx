import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
   'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-primary-950 dark:focus-visible:ring-primary-300',
   {
      variants: {
         variant: {
            default:
               'bg-primary text-black hover:bg-primary-100',
            destructive:
               'bg-danger text-primary-50 hover:bg-red-500/90',
            outline:
               'border border-primary-200 hover:bg-primary text-primary hover:text-black',
            secondary:
               'bg-primary-100 text-primary hover:bg-primary-100/80',
            ghost: 'hover:bg-primary-100/50 hover:text-primary',
            link: 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   }
);

const Button = React.forwardRef(
   ({ className, variant, size, asChild = false, children, isLoading, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button';
      return (
         <Comp disabled={isLoading} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {children}
         </Comp>
      );
   }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
