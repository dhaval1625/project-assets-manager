import RenderForm from '@/components/main/RenderForm';
import { signupFormElements, signupFormKeys, signupFormSchema } from '@/utils/auth-config';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/utils/service';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_URL } from '@/utils/config';

function Signup() {
   const navigate = useNavigate();
   const { mutate, isPending, isError, error } = useMutation({
      mutationFn: payload => fetchData(SIGNUP_URL, { method: 'POST', payload, showSuccessMessage: true }),
      onSuccess: data => {
         navigate('/auth/login');
      },
   });

   return (
      <div>
         <h1 className="text-center font-bold text-2xl mb-3">SIGNUP</h1>
         <RenderForm
            formElements={signupFormElements}
            formKeys={signupFormKeys}
            formSchema={signupFormSchema}
            submitHandler={(data) => mutate(data)}
            isLoading={isPending}
         />
      </div>
   );
}
export default Signup;
