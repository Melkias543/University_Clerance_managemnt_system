'use client'

import AdminSidebar from "@/components/ui/sideBar/adminsidebar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";




export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
   const [myuser, setMyuser] = useState<any>(null);
   const [loading, setLoading] = useState(true); // 👈 new
   const router = useRouter();
   const { user } = useAuth();

   // Load user from localStorage
   useEffect(() => {
     const storedUser = localStorage.getItem("user");
     if (storedUser) {
       setMyuser(JSON.parse(storedUser));
     }
     setLoading(false); // done loading
   }, []);

   // Redirect only after loading is done
   useEffect(() => {
     if (!loading && !myuser) {
       router.push("/auth/login");
     }
   }, [loading, myuser, router]);

   if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
         <p className="text-lg font-medium">Checking login...</p>
       </div>
     );
   }

   if (!myuser) {
     return (
       <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
         <MdShoppingCartCheckout />
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
         <p className="text-lg font-medium">Redirecting to login...</p>
       </div>
     );
   }
  return (
    <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
      
      

      {/* Dashboard content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
