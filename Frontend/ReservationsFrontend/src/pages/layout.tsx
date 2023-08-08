import React from 'react';
import { NavBar } from './navbar';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};