import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';
import Container from './Container';

function DefaultLayout() {
   return (
      <React.Fragment>
         <Navbar />
         <main className="py-8">
            <Container>
               <Outlet />
            </Container>
         </main>
      </React.Fragment>
   );
}
export default DefaultLayout;
