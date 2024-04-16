import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { authActions } from '@/store/auth-slice';
import { Logo } from '../icons/Icon';

function Navbar() {
   const linkClasses = ({ isActive }) =>
      [
         isActive ? 'text-primary light:text-primary-400' : 'text-white light:text-zinc-600',
         'hover:text-primary-100 transition duration-200 light:hover:text-primary-400',
      ].join(' ');

   const isAuth = useSelector((state) => state.auth.isAuth);
   const userName = useSelector((state) => state.auth.userName);
   const dispatch = useDispatch();

   const logoutHandler = () => dispatch(authActions.logoutUser());

   return (
      <header className="flex items-center justify-between py-7 px-10 bg-dark-100 light:bg-white-200 light:shadow-dark-md">
         <nav>
            <ul className="flex items-center space-x-5">
               <li>
                  <Link
                     className="text-white-100 font-bold text-xl leading-none flex items-center space-x-2"
                     to="/"
                  >
                     <div className="icon max-w-10 shrink-0">
                        <Logo />
                     </div>
                     <div className='light:text-zinc-500'>
                        <p>PROJECT ASSETS</p> <p className="tracking-[11.3px]">MANAGER</p>
                     </div>
                  </Link>
               </li>
               {isAuth && (
                  <Fragment>
                     <li>
                        <NavLink
                           className={linkClasses}
                           to="/"
                        >
                           Home
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className={linkClasses}
                           to="/recent"
                        >
                           Current Projects
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className={linkClasses}
                           to="/find"
                        >
                           Find
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className={linkClasses}
                           to="/add"
                        >
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
                        <NavLink
                           className={linkClasses}
                           to="/auth/signup"
                        >
                           Signup
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           className={linkClasses}
                           to="/auth/login"
                        >
                           Login
                        </NavLink>
                     </li>
                  </Fragment>
               ) : (
                  <Fragment>
                     <li>
                        <h3 className="text-sm font-semibold text-white light:text-zinc-500">Hi, {userName}</h3>
                     </li>
                     <li>
                        <Button
                           onClick={logoutHandler}
                           variant="outline"
                        >
                           Logout
                        </Button>
                     </li>
                  </Fragment>
               )}
            </ul>
         </nav>
      </header>
   );
}
export default Navbar;
