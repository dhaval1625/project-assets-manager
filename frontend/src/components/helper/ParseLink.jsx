import { cn } from '@/lib/utils';
import { isValidUrl } from '@/utils/helper';
import React from 'react';

const ParseLink = React.forwardRef(({ text, linkMode }, ref) => {
   if (isValidUrl(text)) {
      return (
         <a
            target="_blank"
            ref={ref}
            className={cn('link', { 'link-full': linkMode === 'full' })}
            href={text}
         >
            {text}
         </a>
      );
   }

   return <p ref={ref} className="link">{text}</p>;
});

export default ParseLink;
