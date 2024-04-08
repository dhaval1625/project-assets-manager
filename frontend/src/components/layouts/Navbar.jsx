import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { authActions } from '@/store/auth-slice';

function Navbar() {
   const linkClasses = ({ isActive }) =>
      [
         isActive ? 'text-primary' : 'text-white',
         'hover:text-primary-100 transition duration-200',
      ].join(' ');

   const isAuth = useSelector(state => state.auth.isAuth);
   const dispatch = useDispatch();

   const logoutHandler = () => dispatch(authActions.logoutUser());

   return (
      <header className="flex items-center justify-between py-7 px-10 bg-dark-100">
         <nav>
            <ul className="flex items-center space-x-5">
               <li>
                  <Link className="text-white-100 font-bold text-xl leading-none" to="/">
                     <p>PROJECT ASSETS</p> <p className="tracking-[11.3px]">MANAGER</p>
                  </Link>
               </li>
               {isAuth && (
                  <Fragment>
                     <li>
                        <NavLink className={linkClasses} to="/">
                           Home
                        </NavLink>
                     </li>
                     {/* <li>
                        <NavLink className={linkClasses} to="/important">
                           Important
                        </NavLink>
                     </li> */}
                     <li>
                        <NavLink className={linkClasses} to="/add">
                           Add Project
                        </NavLink>
                     </li>{' '}
                  </Fragment>
               )}
            </ul>
         </nav>

         <nav className="flex">
            <ul className="flex items-center space-x-5">
               {!isAuth ? (
                  <Fragment>
                     <li>
                        <NavLink className={linkClasses} to="/auth/signup">
                           Signup
                        </NavLink>
                     </li>
                     <li>
                        <NavLink className={linkClasses} to="/auth/login">
                           Login
                        </NavLink>
                     </li>
                  </Fragment>
               ) : (
                  <li>
                     <Button onClick={logoutHandler} variant="outline">Logout</Button>
                  </li>
               )}
            </ul>
         </nav>
      </header>
   );
}
export default Navbar;
