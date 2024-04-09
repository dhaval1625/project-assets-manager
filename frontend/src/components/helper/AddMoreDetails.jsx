import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

function AddMoreDetails({clickHandler}) {
   return (
      <TooltipProvider delayDuration={300}>
         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  onClick={clickHandler}
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
   );
}
export default AddMoreDetails;
