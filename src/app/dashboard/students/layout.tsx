import Sidebar from "@/components/ui/sideBar/Sidebar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
        <Sidebar />
      
      

      {/* Dashboard content */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
