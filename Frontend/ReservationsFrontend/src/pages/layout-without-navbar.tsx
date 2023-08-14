import { Outlet } from 'react-router';

export default function LayoutWithoutNavbar() {
  return (
    <>
      <Outlet />
    </>
  );
};