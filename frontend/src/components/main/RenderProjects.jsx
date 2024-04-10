import ProjectItem from '@/components/main/ProjectItem';
import fetchData from '@/utils/service';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import RenderPagination from './RenderPagination';
import { useSearchParams } from 'react-router-dom';
import { appendQuery } from '@/utils/helper';

function RenderProjects({ url, queryKey, fallback }) {
   const [searchParams] = useSearchParams();
   const pageQuery = searchParams.get('page');
   const activePage = pageQuery ? +pageQuery : 1;

   const finalQueryKey = [...queryKey, activePage];
   const finalUrl = appendQuery(url, [{ query: 'page', value: activePage }]);

   const token = useSelector((state) => state.auth.token);

   const { data, isPending, error } = useQuery({
      queryKey: finalQueryKey,
      queryFn: () => fetchData(finalUrl, { token }),
   });

   if (isPending)
      return (
         <h3 className="flex items-center justify-center mt-5">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
         </h3>
      );
   if (error) return <h3>An error occured : {error.message}</h3>;

   if (data.list.length === 0) return <h1 className="font-medium text-2xl">{fallback}</h1>;

   return (
      <div className="space-y-5">
         <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
            {data.list.map((item) => (
               <ProjectItem
                  key={item._id}
                  details={item}
               />
            ))}
         </div>
         {data.totalPages > 1 && <RenderPagination
            activePage={activePage}
            totalPages={data.totalPages}
         />}
      </div>
   );
}
export default RenderProjects;
