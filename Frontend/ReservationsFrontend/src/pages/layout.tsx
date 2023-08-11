import React from 'react';
import { Nav } from './nav';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <Nav />
      <div className='container relative'>
        <Outlet />
      </div>
    </>
  );
};