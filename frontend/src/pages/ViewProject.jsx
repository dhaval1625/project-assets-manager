import Container from '@/components/layouts/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useRef } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { projectElements } from '@/utils/project-config';
import ParseLink from '@/components/helper/ParseLink';
import { CopyIcon } from '@/components/icons/Icon';
import { copyToClipboard } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { PROJECT_DETAILS_URL } from '@/utils/config';
import fetchData from '@/utils/service';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import ViewProjectHeader from '@/components/layouts/ViewProjectHeader';

function ViewProject() {
   const params = useParams();
   const { projectId } = params;

   const token = useSelector((state) => state.auth.token);
   const { data, error, isPending } = useQuery({
      queryKey: ['project', projectId],
      queryFn: ({ signal }) =>
         fetchData(PROJECT_DETAILS_URL + projectId, { signal, token }),
   });

   if (isPending)
      return (
         <h3 className="flex items-center justify-center mt-5 light:text-zinc-700">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
         </h3>
      );
   if (error) return <p>{error.message}</p>;

   if (!data || data?.length === 0) {
      return <h1>Entry not found!</h1>;
   }

   return (
      <Container>
         <ViewProjectHeader title={data.title} projectId={data._id} />
         <ul className="space-y-6 pl-4 mt-10">
            {projectElements.map(
               (item) =>
                  data[item.handle] && (
                     <li className="space-y-2" key={item.id}>
                        <h3 className="shrink-0 font-semibold text-lg">
                           {item.label}
                        </h3>
                        <div className="flex items-center space-x-4 group">
                           <ParseLink text={data[item.handle]} />
                           <Button
                              onClick={() => copyToClipboard(data[item.handle])}
                              className="rounded-full opacity-0 group-hover:opacity-100"
                              size="icon"
                              variant="ghost"
                           >
                              <CopyIcon />
                           </Button>
                        </div>
                     </li>
                  )
            )}
            {data?.additionalDetails.length > 0 &&
               data.additionalDetails.map((item) => (
                  <li className="space-y-2" key={item._id}>
                     <h3 className="shrink-0 font-semibold text-lg">
                        {item.title}
                     </h3>
                     <div className="flex items-center space-x-4 group">
                        <ParseLink text={item.description} />
                        <Button
                           onClick={() => copyToClipboard(item.description)}
                           className="rounded-full opacity-0 group-hover:opacity-100"
                           size="icon"
                           variant="ghost"
                        >
                           <CopyIcon />
                        </Button>
                     </div>
                  </li>
               ))}
         </ul>
      </Container>
   );
}

export default ViewProject;
