import { PROJECT_LIST_URL } from '@/utils/config';
import RenderProjects from '@/components/main/RenderProjects';

function Dashboard() {
   return (
      <RenderProjects
         url={PROJECT_LIST_URL}
         queryKey={['project']}
         fallback="No projects found! Please add one"
      />
   );
}
export default Dashboard;
