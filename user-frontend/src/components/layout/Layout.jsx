import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomHeader from './BottomHeader';
import SearchBar from '../ui/SearchBar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="py-4 mt-20">
        <SearchBar />
      </div>
      <main className="flex-1 w-full pb-16">
        <Outlet />
      </main>
      <BottomHeader />
    </div>
  );
};

export default Layout; 