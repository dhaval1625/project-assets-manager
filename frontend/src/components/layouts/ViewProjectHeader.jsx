import { Link, useNavigate } from 'react-router-dom';
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
import { Button, buttonVariants } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { PROJECT_DELETE_URL } from '@/utils/config';
import { useSelector } from 'react-redux';
import fetchData, { queryClient } from '@/utils/service';

function ViewProjectHeader({ title, projectId }) {
   const navigate = useNavigate();
   const token = useSelector((state) => state.auth.token);
   const { mutate, isPending } = useMutation({
      mutationFn: (id) =>
         fetchData(PROJECT_DELETE_URL + id, {
            method: 'DELETE',
            token,
            showSuccessMessage: true,
         }),
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project'] });
         navigate('/');
      },
   });
   return (
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-medium">{title}</h1>
         <div className="flex items-center space-x-3">
            <Link
               to={'/edit/' + projectId}
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
                        This action cannot be undone. This will permanently
                        delete the project data.
                     </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="outline">
                           Close
                        </Button>
                     </DialogClose>
                     <Button
                        isLoading={isPending}
                        onClick={() => mutate(projectId)}
                        variant="destructive"
                     >
                        Delete
                     </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
         </div>
      </div>
   );
}

export default ViewProjectHeader;
