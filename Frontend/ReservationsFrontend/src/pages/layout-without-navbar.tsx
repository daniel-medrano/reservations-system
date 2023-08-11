import React from 'react';
import { Nav } from './nav';
import { Outlet } from 'react-router';

export default function LayoutWithoutNavbar() {
  return (
    <>
      <Outlet />
    </>
  );
};