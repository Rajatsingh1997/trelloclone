import React from 'react';
import { useRouter } from 'next/router';

const NavigationBar = () => {
  const router = useRouter();
  const handleSignOut=()=>{
    localStorage.clear();
    router.push('/')
  }
  return (
    <div>
      <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <span className='font-semibold text-xl tracking-tight'>
            Trello Clone
          </span>
        </div>

        <div className='lg:flex lg:items-center lg:w-auto'>
          <div>
            <button className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white 
              hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'
              onClick={handleSignOut}
              >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
