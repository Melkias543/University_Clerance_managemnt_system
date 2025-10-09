"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/students" },
    { name: "Application", icon: FileText, href: "/dashboard/students/application" },
    { name: "Profile", icon: User, href: "/dashboard/students/profile" },
    { name: "Settings", icon: Settings, href: "/dashboard/students/setting" },
    { name: "Logout", icon: LogOut, href: "/" },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col justify-between border-r bg-white">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-6 py-4 font-bold text-lg">
          <span className="text-blue-600 text-2xl">🎓</span>
          <span>Clearance MS</span>
        </div>

        <Separator />

        {/* Menu */}
        <nav className="mt-4 flex flex-col">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 px-6 py-5 text-[15px] ${
                    isActive
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActive(item.name)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      
    </aside>
  );
}
