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
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();

  const handleLogout = () => {
    logout();
    console.log("user after logout (state):", user);
    console.log("localStorage after logout:", localStorage.getItem("user"));
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/students" },
    {
      name: "Application",
      icon: FileText,
      href: "/dashboard/students/application",
    },
    { name: "Profile", icon: User, href: "/dashboard/students/profile" },
    { name: "Settings", icon: Settings, href: "/dashboard/students/setting" },
    { name: "LogoutMe", icon: LogOut, href: "/", onClick: handleLogout },
  ];

  return (
    <div className="flex">
      
      <div className="md:hidden flex items-center justify-between w-full bg-white px-4 py-3 shadow-sm fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-blue-600 text-2xl">🎓</span>
          <span>Clearance MS</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

     
      <aside
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col justify-between z-20 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="pt-16 md:pt-0"> 
          <div className="hidden md:flex items-center gap-2 px-6 py-4 font-bold text-lg">
            <span className="text-blue-600 text-2xl">🎓</span>
            <span>Clearance MS</span>
          </div>

          <Separator />
          <nav className="mt-4 flex flex-col">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.name;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      else router.push(item.href);
                      setActive(item.name);
                      setIsOpen(false); 
                    }}
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 px-6 py-5 text-[15px] ${
                      isActive
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
