import ProjectItem from '@/components/main/ProjectItem';
import { PROJECT_LIST_URL } from '@/utils/config';
import fetchData from '@/utils/service';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

function Dashboard() {
   const token = useSelector(state => state.auth.token);
   const { data, isPending, isLoading, error } = useQuery({
      queryKey: ['project'],
      queryFn: () => fetchData(PROJECT_LIST_URL, { token }),
   });

   if (isPending) return <h3>Loading...</h3>;
   if (error) return <h3>An error occured : {error.message}</h3>;

   if (data.length === 0)
      return <h1 className="font-medium text-2xl">No projects found! Please add one</h1>;

   return (
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
         {data.map(item => (
            <ProjectItem key={item._id} details={item} />
         ))}
      </div>
   );
}
export default Dashboard;
