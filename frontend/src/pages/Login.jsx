import RenderForm from '@/components/main/RenderForm';
import { loginFormElements, loginFormKeys, loginFormSchema } from '@/utils/auth-config';
import { useMutation } from '@tanstack/react-query';
import fetchData from '@/utils/service';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '@/utils/config';
import { useDispatch } from 'react-redux';
import { authActions } from '@/store/auth-slice';

function Login() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { mutate, isPending, isError, error } = useMutation({
      mutationFn: payload => fetchData(LOGIN_URL, { method: 'POST', payload }),
      onSuccess: data => {
         console.log(data);
         dispatch(authActions.loginUser({
            token: data.token,
            userName: data.name,
         }));
         navigate('/');
      },
   });
   return (
      <div>
         <h1 className="text-center font-bold text-2xl mb-3">LOGIN</h1>
         <RenderForm
            formElements={loginFormElements}
            formKeys={loginFormKeys}
            formSchema={loginFormSchema}
            submitHandler={data => mutate(data)}
            isLoading={isPending}
         />
      </div>
   );
}
export default Login;
