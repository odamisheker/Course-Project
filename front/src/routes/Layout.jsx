import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h3>SESSION</h3>
      <Outlet />
    </div>
  );
}
