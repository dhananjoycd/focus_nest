import { NavLink } from "react-router-dom";
import { useState } from "react";
import sidebarLinks from "../../Router/moneyRoutes";

const LeftSideBar = () => {
  const [activeLink, setActiveLink] = useState("status");

  return (
    <nav className="w-full">
      <h3 className="px-3 py-2 font-bold">At a Glance</h3>
      <ul className="flex flex-col gap-1.5">
        {sidebarLinks.map((l) => (
          <li
            key={l.url}
            onClick={() => setActiveLink(l.url)}
            className={`px-3 py-1 border-r ${
              activeLink === l.url ? "bg-amber-700" : " hover:bg-gray-500"
            }`}
          >
            <NavLink to={l.url}>{l.pathName}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftSideBar;
