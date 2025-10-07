"use client";
// import Sidebar  from "../../componen/ts/ui/sideBar/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import StudentApply from "@/components/ui/Appication/StudentApply";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

    const {setIsLogged,setUser,setToken }= useAuth()
const router = useRouter()
  const handleLogout = async () => {
    setUser(null);
      setToken(null);
    setIsLogged(false);
router.push('/auth/login')
  }
  return (
    <div>
      <h1
        className="text-3xl md:text-4xl font-extrabold text-center mt-6 
               bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
               bg-clip-text text-transparent tracking-wide drop-shadow-sm"
      >
        Haramaya University Student Clearances Management System
      </h1>
      <div className="flex gap-30 sm:flex-col md:flex-row mt-10 justify-center">
        <div className="flex justify-center mt-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center w-80 border border-gray-200 hover:shadow-2xl transition duration-300">
            {/* Profile Icon */}

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-full">
              <div className="bg-white rounded-full p-2">
                <CgProfile size={80} className="text-indigo-600" />
              </div>
            </div>

            {/* Name */}
            <p className="mt-4 text-xl font-semibold text-gray-800">
              Melkias Teshoma
            </p>

            <h1> to checking purpose Student</h1>
            {/* Info */}
            <div className="mt-4 text-center space-y-1 text-gray-600 text-sm">
              <p className="font-medium">
                Department:{" "}
                <span className="text-gray-800">Computer Science</span>
              </p>
              <p>
                Batch: <span className="text-gray-800">2020</span>
              </p>
              <p>
                ID: <span className="font-mono text-gray-900">123456</span>
              </p>
              <p className="italic text-red-600 flex-row">
                Reason of Clearance: Exit
                <Button
                  onClick={handleLogout}
                  type="submit"
                  className="w-full mt-5 hover:cursor-pointer!"
                >
                  LogOut
                </Button>
              </p>
            </div>
          </div>
        </div>
        <div className=" p-5  w-200">
          <StudentApply />
        </div>
      </div>
    </div>

    // <div className="flex min-h-screen height-screen bg-gray-50">
    //   {/* Sidebar */}
    //   <div className="height-screen">
    //     <StudentApply />
    //   </div>

    //   <main className="flex-1 p-6">
    //     <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

    //     {/* Cards grid */}
    //     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Total Users</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="text-2xl font-bold">120</p>
    //           <p className="text-sm text-muted-foreground">+5 this week</p>
    //         </CardContent>
    //       </Card>

    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Pending Clearances</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="text-2xl font-bold">32</p>
    //           <p className="text-sm text-muted-foreground">Updated today</p>
    //         </CardContent>
    //       </Card>

    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Completed Clearances</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="text-2xl font-bold">88</p>
    //           <p className="text-sm text-muted-foreground">This month</p>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </main>
    // </div>
  );
}
