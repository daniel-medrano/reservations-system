import { Footer } from "./footer";
import { Nav } from "./nav";
import { Outlet } from "react-router";

export default function LayoutWithoutFooter() {
  return (
    <>
      <Nav />
      <div className='container relative'>
        <Outlet />
      </div>
    </>
  );
};