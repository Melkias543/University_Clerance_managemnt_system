import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

const applications = [
  { id: 1, name: "Department/Program Head" },
  { id: 2, name: "Bookstore" },
  { id: 3, name: "Library" },
  { id: 4, name: "Dormitory" },
  { id: 5, name: "Cafeteria" },
  { id: 6, name: "Sport Academy" },
  { id: 7, name: "Student Loan" },
  { id: 8, name: "Registral Office" },
  { id: 9, name: "Student Descipline" },
];

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="font-bold text-3xl text-gray-800">
          Student Application Dashboard
        </h1>
        <Button className="bg-[#0A6372] text-white px-5 py-2 rounded hover:bg-[#084f57] transition">
          Apply For Clearance
        </Button>
        </div>

        
              <p className="text-gray-600 mb-6 px-1">Students can apply here!</p>

     
      <h2 className="text-[#253D90] font-semibold text-2xl mb-4 px-1">
        List of Student Applications
      </h2>
        
      <div className="grid gap-4 ">
        
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition pb-4"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-gray-900 font-medium">{app.name}</h3>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#0A6372] text-white px-4 py-2 rounded hover:bg-[#084f57] transition cursor-pointer">
                  Apply
                </Button>
                <Button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition cursor-pointer">
                  View Detail
                </Button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Page;
