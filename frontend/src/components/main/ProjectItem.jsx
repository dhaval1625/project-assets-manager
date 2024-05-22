import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { copyToClipboard, formatDate, isValidUrl } from '@/utils/helper';
import { projectElements } from '@/utils/project-config';
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button, buttonVariants } from '../ui/button';
import { CopyIcon } from '../icons/Icon';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import fetchData, { queryClient } from '@/utils/service';
import { PROJECT_DELETE_URL } from '@/utils/config';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import ParseLink from '../helper/ParseLink';

function LinkPopup({ data }) {
   return (
      <TooltipProvider>
         <Tooltip delayDuration={200}>
            <TooltipTrigger className="overflow-hidden">
               <ParseLink text={data} />
            </TooltipTrigger>
            <TooltipContent
               color="dark"
               className="flex items-center space-x-3"
            >
               <ParseLink text={data} linkMode="full" />
               <Button
                  onClick={() => copyToClipboard(data)}
                  className="rounded-full"
                  size="icon"
                  variant="ghost"
               >
                  <CopyIcon />
               </Button>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
}

function ProjectItem({ details }) {
   const token = useSelector((state) => state.auth.token);
   const btnCloseDialog = useRef(null);
   const { mutate, isPending, isError, error } = useMutation({
      mutationFn: (id) =>
         fetchData(PROJECT_DELETE_URL + id, {
            method: 'DELETE',
            token,
            showSuccessMessage: true,
         }),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project'] });
         btnCloseDialog.current.click();
      },
   });

   return (
      <Card>
         <CardHeader>
            <CardTitle>
               <Link
                  className="hover:text-primary-400 transition"
                  to={'/view/' + details._id}
               >
                  {details.title}
               </Link>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ul className="space-y-4">
               <li className="">{formatDate(details.createdAt)}</li>
               {projectElements.map(
                  (item) =>
                     details[item.handle] && (
                        <li
                           className="flex items-start space-x-2"
                           key={item.id}
                        >
                           <p className="shrink-0 font-medium">
                              {item.label} :
                           </p>
                           <LinkPopup data={details[item.handle]} />
                        </li>
                     )
               )}
               {details?.additionalDetails.length > 0 &&
                  details.additionalDetails.map((item) => (
                     <li className="flex items-start space-x-2" key={item._id}>
                        <p className="shrink-0 font-medium">{item.title} :</p>
                        <LinkPopup data={item.description} />
                     </li>
                  ))}
            </ul>
         </CardContent>
         <CardFooter className="mt-auto">
            <div className="flex items-center justify-between w-full">
               <div className="flex items-center space-x-2">
                  <Link
                     to={'/edit/' + details._id}
                     className={buttonVariants({ size: 'sm' })}
                  >
                     Edit
                  </Link>
                  <Dialog>
                     <DialogTrigger
                        className={buttonVariants({
                           variant: 'destructive',
                           size: 'sm',
                        })}
                     >
                        Delete
                     </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                           <DialogTitle>Are you absolutely sure?</DialogTitle>
                           <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete the project data.
                           </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                           <DialogClose asChild>
                              <Button ref={btnCloseDialog} variant="outline">
                                 Close
                              </Button>
                           </DialogClose>
                           <Button
                              isLoading={isPending}
                              onClick={() => mutate(details._id)}
                              variant="destructive"
                           >
                              Delete
                           </Button>
                        </DialogFooter>
                     </DialogContent>
                  </Dialog>
               </div>
               {details.isCurrent && <Badge>Recent</Badge>}
            </div>
         </CardFooter>
      </Card>
   );
}
export default ProjectItem;
