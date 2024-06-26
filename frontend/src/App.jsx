import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DefaultLayout from './components/layouts/DefaultLayout';
import { QueryClientProvider } from '@tanstack/react-query';
import AddProject from './pages/AddProject';
import ImpProject from './pages/ImpProject';
import { queryClient } from './utils/service';
import EditProject from './pages/EditProject';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './components/helper/ProtectedRoute';
import AuthRoute from './components/helper/AuthRoute';
import FindProject from './pages/FindProject';
import { ThemeProvider } from './components/helper/ThemeProvider';
import ViewProject from './pages/ViewProject';

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         { path: '', element: <ProtectedRoute component={<Dashboard />} /> },
         { path: 'find', element: <ProtectedRoute component={<FindProject />} /> },
         { path: 'add', element: <ProtectedRoute component={<AddProject />} /> },
         { path: 'recent', element: <ProtectedRoute component={<ImpProject />} /> },
         { path: 'edit/:projectId', element: <ProtectedRoute component={<EditProject />} /> },
         { path: 'view/:projectId', element: <ProtectedRoute component={<ViewProject />} /> }
      ],
   },
   {
      path: '/auth',
      element: <DefaultLayout />,
      children: [
         { path: 'signup', element: <Signup /> },
         { path: 'login', element: <AuthRoute component={<Login />} /> },
      ],
   },
]);

function App() {
   return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <RouterProvider router={router} />
         </ThemeProvider>
      </QueryClientProvider>
   );
}

export default App;
