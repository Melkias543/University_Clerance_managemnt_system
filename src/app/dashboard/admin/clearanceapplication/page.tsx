"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    { name: "milkias", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Rejected", type: "Internship" },
    { name: "tolera", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Rejected", type: "Internship" },
    { name: "chalchisa", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Approved", type: "Internship" },
    { name: "Icog", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Rejected", type: "Internship" },
    { name: "IE Networks", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Approved", type: "Internship" },
    { name: "Addis Software", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Rejected", type: "Internship" },
    { name: "INSA", department: "SWE Intern", id: "22/04/2022", year: "22/04/2022", status: "Rejected", type: "Internship" },
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Input
            placeholder="Search for student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3"
          />

          <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setTypeFilter} defaultValue={typeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Research">Research</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Student Applications */}
      <div>
        <h2 className="text-[#253D90] font-semibold text-xl mb-4">
          List of Student Applications
        </h2>

        <div className="space-y-3">
          {filteredStudents.map((s, i) => (
            <Card key={i} className="p-4 shadow-sm">
              <CardContent className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 p-0">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-gray-600">{s.department}</p>
                  <p className="text-sm text-gray-500">{s.id} | {s.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(s.status)}
                  {s.status === "Rejected" ? (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Reject
                    </Button>
                  )}
                  <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
