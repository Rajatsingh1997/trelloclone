import React from 'react';
import NavigationBar from './navbar';


function Layout({children}) {
    return (
        <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100">
            <NavigationBar />
            <main className="pt-16">
                {children}
            </main>
        </div>
    );
}

export default Layout;