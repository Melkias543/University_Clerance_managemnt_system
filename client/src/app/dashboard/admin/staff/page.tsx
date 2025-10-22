// import React from 'react'

"use client";

import { act, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { deleteStaff, getStaff, view } from "@/Api/adminApi";
import { Staff } from "@/types/staff";


import { Input } from "@/components/ui/input";
import StaffPopup from "@/components/admin/staffPopup";
import SIngleStaffPopover from "@/components/admin/singleStaffPopup";
type BookStoreApplicantProps = {
  title: string;
};
export default function CollegeDeanApplicant({
  title,
}: BookStoreApplicantProps) {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [id, setId] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [stafToEdit, setStaffToEdit] = useState<Staff | null>(null);
  const [singleStaff, setSingleStaff] = useState<Staff | null>(null);
  const [singleStaffPop, setSingleStaffPopup] = useState(false);
  // console.log("Staff to edit ", stafToEdit)
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

  useEffect(() => {
    const getstaffs = async () => {
      try {
        const get = await getStaff();
        console.log(get.data);
        setStaff(get.data);
      } catch (error) {}
    };

    getstaffs();
  }, []);

  // handleView
  const handleDelete = async (id: string) => {
    console.log("delete function", id);
    try {
      const deleted = await deleteStaff(id);
      toast.success(deleted.data.msg);
      console.log(deleted.data.msg);
      window.location.reload();
    } catch (error: any) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";
      console.log(message);
      toast.error(message);
    }
  };
   const handleView = async (id: string) => {
     console.log("delete function", id);
     try {
       const data = await view(id);
       toast.success(data.data.msg);
      //  console.log(data.data);
       setSingleStaff(data.data);
       //  window.location.reload();
       setSingleStaffPopup(true);
     } catch (error: any) {
       console.log(error)
       const message =
         error?.response?.data?.msg ||
         error?.response?.data?.message ||
         error?.message ||
         "Server Error";
       console.log(message);
       toast.error(message);
     }
  };
  // console.log(singleStaff);
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
        {/* <h2 className="text-[#253D90] font-semibold text-xl mb-4">
          List of Student Applications
        </h2> */}

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Staff List</h2>

            <div>
              <Button
                onClick={() => setShowPopup(true)}
                className="bg-blue-600 text-white hover:bg-blue-700  hover:cursor-pointer"
              >
                New Staff
              </Button>
            </div>
          </div>
          <StaffPopup
            staffToEdit={stafToEdit}
            open={showPopup}
            onClose={() => setShowPopup(false)}
          />
          {singleStaff && (
            <SIngleStaffPopover
              open={singleStaffPop}
              onClose={() => setSingleStaffPopup(false)}
              staff={singleStaff}
            />
          )}
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs sm:text-sm">
              <tr>
                <th className="px-4 py-3 border-b">Full Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Salary</th>
                <th className="px-4 py-3 border-b">Role</th>
                <th className="px-4 py-3 border-b">Hired Date</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staff?.map((s, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {s.full_name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 break-words">
                    {s.email}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{s.salary}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {s?.role_id?.role_name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {s.hired_date
                      ? new Date(s.hired_date).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <Button
                        onClick={() => {
                          setStaffToEdit(s);
                          setShowPopup(true);
                        }}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(s._id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          handleView(s._id);
                          // () => setSingleStaffPopup(true);
                        }}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                      >
                        View
                      </Button>

                      {/* <SIngleStaffPopover
                        open={singleStaffPop}
                        onClose={() => setSingleStaffPopup(false)}
                        staff={singleStaff!} */}
                      {/* /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

