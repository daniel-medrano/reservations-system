import React from 'react';
import { NavBar } from './navbar';
import { Outlet } from 'react-router';

export default function LayoutWithoutNavbar() {
  return (
    <>
      <Outlet />
    </>
  );
};