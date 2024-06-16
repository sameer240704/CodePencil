import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../constants";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="bg-[#2a2a2a] sticky left-0 top-0 text-white flex flex-col justify-between p-2 pt-8 max-sm:hidden">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <NavLink
              key={item.label}
              to={item.route}
              className={`flex flex-col gap-2 items-center justify-start p-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "text-secondary-100"
                  : "text-gray-300 hover:text-gray-600"
              }`}
            >
              <item.imageUrl className="w-7 h-7" />
              <p className="text-md font-semibold max-lg:hidden">
                {item.label}
              </p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
