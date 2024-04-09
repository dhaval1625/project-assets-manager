import ProjectItem from '@/components/main/ProjectItem';
import fetchData from '@/utils/service';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

function RenderProjects({ url, queryKey, fallback }) {
   const token = useSelector((state) => state.auth.token);
   const { data, isPending, error } = useQuery({
      queryKey,
      queryFn: () => fetchData(url, { token }),
   });

   if (isPending)
      return (
         <h3 className="flex items-center justify-center mt-5">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
         </h3>
      );
   if (error) return <h3>An error occured : {error.message}</h3>;

   if (data.length === 0)
      return <h1 className="font-medium text-2xl">{fallback}</h1>;

   console.log(data);

   return (
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
         {data.map((item) => (
            <ProjectItem
               key={item._id}
               details={item}
            />
         ))}
      </div>
   );
}
export default RenderProjects;
