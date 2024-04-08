import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute({component}) {
   const isAuth = useSelector(state => state.auth.isAuth);
   
   if(!isAuth) {
      return component;
   } 
   else return <Navigate to='/' />
}
export default AuthRoute;
