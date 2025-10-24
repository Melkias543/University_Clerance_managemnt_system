"use client";

import { act, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
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
import { aproveOrReject, getApplication } from "@/Api/applyForClearanceApi";
import { Applicant } from "@/types/aplicants";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

type BookStoreApplicantProps = {
  title: string;
};
export default function BookStoreApplicant({ title }:BookStoreApplicantProps) {
  const [studentList, setStudents] = useState<Applicant[]>([]);
  const [id, setId] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // const filteredStudents = students?.filter((s) => {
  //   const matchName = s?.name.toLowerCase().includes(search.toLowerCase());
  //   const matchStatus = statusFilter === "All" || s.status === statusFilter;
  //   const matchType = typeFilter === "All" || s.type === typeFilter;
  //   return matchName && matchStatus && matchType;
  // });

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

  const { user } = useAuth();
  const role = user?.role?.role_name;
  console.log(role);
  useEffect(() => {
    const getAplicant = async () => {
      if (!role) return;
      try {
        const get = await getApplication(role);
        // console.log(get.data)
        setStudents(get.data);
      } catch (error) {}
    };

    getAplicant();
  }, [role]);
  // console.log("studentList", studentList);
  useEffect(() => {
    if (studentList?.length) {
      const firstId = studentList[0].student?.id;
      if (firstId) {
        // console.log("student inside useEffect", firstId);
        setId(firstId); // ✅ safe: runs only when studentList changes
      }
    }
  }, [studentList]); // dependency ensures it runs only when studentList updates

  const handleAproveal = async (action: string) => {
    try {
      const aproveIt = await aproveOrReject(action, id);
      if (aproveIt.status) {
        toast.success(aproveIt.msg);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.response.data.msg} || "Internal Server Error."`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-semibold">Staff Dashboard</h1>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

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
              <SelectItem value="All">All Applicants</SelectItem>
              <SelectItem value="Aproved">Aproved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
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
          {studentList
            ?.filter((s) => {
              const name = s?.withdrawal_info?.full_name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
              const id = s.withdrawal_info?.university_id
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());
              const dept = s.withdrawal_info?.department
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase());

              return name || id || dept;
            })
            .map((s, i) => (
              <Card key={i} className="p-4 shadow-sm">
                <CardContent className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 p-0">
                  <div>
                    <p className="font-semibold">
                      {s?.withdrawal_info?.full_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Dept:{s.withdrawal_info?.department}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {s.withdrawal_info?.university_id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {s?.withdrawal_info?.university_email}
                    </p>
                    <p className="text-sm text-gray-600">
                      Batch:{s.withdrawal_info?.year_batch}
                    </p>
                    <p className="text-sm text-gray-500 ">
                      data:{" "}
                      {s.withdrawal_info?.clearance_date
                        ? new Date(
                            s.withdrawal_info.clearance_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      name="status"
                      value={s?.aprovals?.status || "Take Action"}
                      onChange={(e) => handleAproveal(e.target.value)}
                      className={`px-3 py-2 rounded-md text-sm font-medium border outline-none transition-all duration-200
    ${
      s?.status === "Aproved"
        ? "bg-green-100 text-green-700 border-green-400 hover:bg-green-200"
        : s?.status === "Rejected"
        ? "bg-red-100 text-red-700 border-red-400 hover:bg-red-200"
        : "bg-green-700 text-white border-green-400 hover:bg-green-200"
    }
  `}
                    >
                      <option value="">
                        {s?.status ? s?.status : "Take Action"}
                      </option>
                      <option value="Aproved">Approve</option>
                      <option value="Rejected">Reject</option>
                    </select>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white"
                    >
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
