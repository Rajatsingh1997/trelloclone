import React from 'react';
import NavigationBar from './Navbar';

function Layout({ children }) {
  return (
    <div className='min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100'>
      <NavigationBar />
      <main className='px-8 pt-8'>{children}</main>
    </div>
  );
}

export default Layout;
