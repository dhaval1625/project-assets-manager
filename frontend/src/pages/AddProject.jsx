import ProjectForm from '@/components/main/ProjectForm';
import { useMutation } from '@tanstack/react-query';
import fetchData, { queryClient } from '@/utils/service';
import { useNavigate } from 'react-router-dom';
import { PROJECT_ADD_URL } from '@/utils/config';
import { useSelector } from 'react-redux';

function AddProject() {
   const navigate = useNavigate();
   const token = useSelector(state => state.auth.token);
   const { mutate, isPending, isError, error } = useMutation({
      mutationFn: payload => fetchData(PROJECT_ADD_URL, { method: 'POST', payload, token, showSuccessMessage: true }),
      onSuccess: data => {
         console.log('add project response', data);
         queryClient.invalidateQueries({ queryKey: ['project'] });
         navigate('/');
      },
   });
   return <ProjectForm isLoading={isPending} submitHandler={data => mutate(data)} />;
}
export default AddProject;
