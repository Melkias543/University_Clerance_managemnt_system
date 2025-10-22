
"use client";
import { useState } from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { LiaCriticalRole } from "react-icons/lia";

import { useAuth } from "@/context/authContext";

const AdminSidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const { logout} = useAuth();

  const handleLogout = () => {
  logout()
}
  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, href: "/dashboard/admin" },
    {
      name: "application",
      icon: <MdDashboard />,
      href: "/dashboard/admin/clearanceapplication",
    },
    { name: "Profile", icon: <FaUser />, href: "/dashboard/admin/profile" },
    {
      name: "Roles",
      icon: <LiaCriticalRole />,
      href: "/dashboard/admin/roles",
    },
    { name: "Staffs", icon: <FaUser />, href: "/dashboard/admin/staff" },

    { name: "Settings", icon: <FaCog />, href: "/settings" },
    {
      name: "Logout",
      icon: <FaSignOutAlt className="text-red-500" />,
      onClick: handleLogout,
      href: "/logout",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between h-screen">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-6 py-4 font-bold text-lg">
          <span className="text-blue-600 text-2xl">🎓</span>
          <span>Clearance MS</span>
        </div>

        {/* Menu */}
        <ul className="mt-4">
          {menuItems?.map((item) => (
            <Link key={item.name} href={item.href}>
              <li
                onClick={(e) => {
                  setActive(item.name);

                  // Prevent default navigation if we handle onClick manually
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition
      ${
        item.name === "Logout"
          ? "text-red-500 hover:bg-red-100"
          : active === item.name
          ? "bg-gray-100 text-blue-600 font-semibold"
          : "text-gray-600 hover:bg-gray-50"
      }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
