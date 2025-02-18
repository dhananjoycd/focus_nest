import { NavLink } from "react-router-dom";
import sidebarLinks from "../../Router/moneyRoutes";

const LeftSideBar = () => {
  return (
    <nav className="w-full">
      <h3 className="px-3 py-2 font-bold">At a Glance</h3>
      <ul className="flex flex-col gap-1.5">
        {sidebarLinks.map((l) => (
          <li key={l.url} className="border-r">
            <NavLink
              to={l.url}
              className={({ isActive }) =>
                `px-3 py-1 block ${
                  isActive ? "bg-amber-700" : " hover:bg-gray-500"
                }`
              }
            >
              {l.pathName}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftSideBar;
