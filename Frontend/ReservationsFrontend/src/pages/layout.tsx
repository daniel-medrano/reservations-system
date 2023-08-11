import { Nav } from "./nav";
import { Outlet } from "react-router";
import { Footer } from "./footer";

export default function Layout() {
  return (
    <>
      <Nav />
      <div className='container relative min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};