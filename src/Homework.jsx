import { Link, Outlet } from "react-router-dom";

function Homework() {
  const isRootPath = location.pathname === "/homework";

  return (
    <>
      {isRootPath && <Link to="Day41">Day41</Link>}
      <Outlet />
    </>
  );
}

export default Homework;
