'use client'
import StaffSideBar from "@/components/ui/sideBar/staffSIdeBar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  

  
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) {
    // Optional: show a loading screen while redirecting
    return (
       <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
            {/* Spinner */}
            <MdShoppingCartCheckout/>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            {/* Message */}
            <p className="text-lg font-medium">Redirecting to login...</p>
          </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
        <StaffSideBar />
      {/* Dashboard content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}