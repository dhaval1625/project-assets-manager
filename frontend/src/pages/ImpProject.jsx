import { PROJECT_LIST_URL } from '@/utils/config';
import RenderProjects from '@/components/main/RenderProjects';

function ImpProject() {
   return (
      <RenderProjects
         url={PROJECT_LIST_URL + '?filter=recent'}
         queryKey={['project', 'recent']}
         fallback="No recent projects!"
      />
   );
}
export default ImpProject;
