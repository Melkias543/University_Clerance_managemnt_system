"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import { getCearanceApplicantadmin } from "@/Api/adminApi";
import { Applicant } from "@/types/aplicants";
import { Approvals, Student } from "@/types/student";

export default function AdminDashboard() {
  const [student, setStudent] = useState<Student[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showApprovals, setShowApprovals] = useState(false);
  const [aproval, setAproval] = useState<Approvals[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [currentApprovals, setCurrentApprovals] = useState<>([]);

  // const filteredStudents = students.filter((s) => {
  //   const matchName = s.name.toLowerCase().includes(search.toLowerCase());
  //   const matchStatus = statusFilter === "All" || s.status === statusFilter;
  //   const matchType = typeFilter === "All" || s.type === typeFilter;
  //   return matchName && matchStatus && matchType;
  // });
  const { user } = useAuth();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {status}
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {status}
          </Badge>
        );
    }
  };
  useEffect(() => {
    getCearanceApplicant();
  }, []);
  useEffect(() => {
    if (student?.length > 0) {
      // Assuming you want all approvals of the first student
      setAproval(student[0]?.approvals);
    }
  }, [student]);

  const getCearanceApplicant = async () => {
    try {
      // console.log("hi");

      const student = await getCearanceApplicantadmin();
      setStudent(student?.data);
      setAproval(student?.data?.approvals);
      console.log(student?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(student);

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
          {student?.map((s, i) => (
            <Card key={i} className="p-4 shadow-sm">
              <CardContent className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 p-0">
                <div>
                  <p className="font-semibold">{s.full_name}</p>
                  <p className="text-sm text-gray-600">Dept:{s.department}</p>
                  <p className="text-sm text-gray-500">{s.year_batch}</p>
                </div>
                <div>
                  <p className="font-semibold">{s.university_email}</p>

                  <p className="text-sm text-gray-500">ID: {s.university_id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {s.clearance_date}
                  </p>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer">
                      View Approvals/Rejections
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Here Student approvals and Rejections with respective office</DialogTitle>
                        <DialogDescription asChild>
                          <div className="mt-3 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full sm:w-96">
                            <h3 className="font-semibold mb-3 text-gray-700">
                              Approvals & Rejections
                            </h3>
                            {aproval?.map((a, i) => {
                              // color coding status
                              let statusColor =
                                a.status.toLowerCase() === "aproved"
                                  ? "text-green-600"
                                  : a.status.toLowerCase() === "rejected"
                                  ? "text-red-600"
                                  : "text-yellow-600";

                              return (
                                <div
                                  key={i}
                                  className="flex justify-between items-center gap-4 py-2 px-3 mb-2 rounded hover:bg-gray-50 transition"
                                >
                                  <p className="font-medium text-gray-700">
                                    At {a.office}
                                  </p>
                                  <p className={`font-semibold ${statusColor}`}>
                                    {a.status}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center gap-2">
                  {getStatusBadge(s.status)}
                  {s.status === "Rejected" ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Reject
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View Detail
                  </Button>
                </div> */
}
