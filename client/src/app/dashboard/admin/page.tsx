"use client";

import { ClearanceProgressChart } from "@/components/admin/AdminCharts";
import { DepartmentClearanceChart } from "@/components/admin/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Student {
  name: string;
  department: string;
  id: string;
  year: string;
  status: string;
  type: string;
}

export default function AdminDashboard() {
  const students: Student[] = [
    {
      name: "milkias",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Rejected",
      type: "Internship",
    },
    {
      name: "tolera",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Rejected",
      type: "Internship",
    },
    {
      name: "chalchisa",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Approved",
      type: "Internship",
    },
    {
      name: "Icog",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Rejected",
      type: "Internship",
    },
    {
      name: "IE Networks",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Approved",
      type: "Internship",
    },
    {
      name: "Addis Software",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Rejected",
      type: "Internship",
    },
    {
      name: "INSA",
      department: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Rejected",
      type: "Internship",
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredStudents = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    const matchType = typeFilter === "All" || s.type === typeFilter;
    return matchName && matchStatus && matchType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      case "Rejected":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4 bg-[#FFFFFF] p-4 rounded shadow flex-wrap justify-between">
        <input
          type="text"
          placeholder="Search for student"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All Types</option>
          <option value="Internship">Internship</option>
          <option value="Research">Research</option>
        </select>
      </div>

      {/* List of students */}
      <h2 className="text-[#253D90] font-semibold text-2xl mb-4 px-1">
        List of Student Applications
      </h2>
      <div className="flex flex-col gap-3">
        {/* {filteredStudents.map((s, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{s.name}</span>
              <span className="text-sm text-gray-600">{s.department}</span>
              <span className="text-sm text-gray-500">{s.id} | {s.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={getStatusBadge(s.status)}>{s.status}</span>
              {s.status === "Rejected" ? (
                <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">Approve</button>
              ) : (
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">Reject</button>
              )}
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">View Detail</button>
            </div>
          </div>
        ))} */}
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,230</p>
            <p className="text-sm text-muted-foreground">+10 this week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ClearanceProgressChart />
        <DepartmentClearanceChart />
      </div>
    </div>
  );
}
