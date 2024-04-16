import { Input } from '@/components/ui/input';
import { PROJECT_LIST_URL } from '@/utils/config';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import fetchData from '@/utils/service';
import ProjectItem from '@/components/main/ProjectItem';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

function FindProject() {
   const token = useSelector((state) => state.auth.token);
   const [searchText, setSearchText] = useState(null);
   const debSearch = useDebounce(searchText, 500);

   const { data, error, isLoading } = useQuery({
      queryKey: ['project', debSearch],
      queryFn: ({signal}) => fetchData(PROJECT_LIST_URL + `?search=${debSearch}`, { token, signal }),
      enabled: debSearch !== null && debSearch.length > 0,
   });

   const searchChangeHandler = (e) => {
      setSearchText(e.target.value);
   };

   const Result = () => {
      if (isLoading)
         return (
            <h3 className="flex items-center justify-center mt-5 light:text-zinc-700">
               <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading
            </h3>
         );
      if (error) return <h3 className='light:text-zinc-700'>An error occured : {error.message}</h3>;

      if(!data) return <h3 className='light:text-zinc-700'>Enter project title for finding project</h3>

      if (data && data.list.length === 0)
         return <h1 className="font-medium text-2xl light:text-zinc-700">No project found with this title!</h1>;

      if (data) {
         return (
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
               {data.list.map((item) => (
                  <ProjectItem
                     key={item._id}
                     details={item}
                  />
               ))}
            </div>
         );
      }
   };

   return (
      <div className="space-y-8">
         <div className="max-w-[250px]">
            <Input
               id="find-project"
               onChange={searchChangeHandler}
               placeholder="Search"
            />
         </div>
         <Result />
      </div>
   );
}
export default FindProject;
