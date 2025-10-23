"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { fetchall } from "@/Api/isued";
import { IssuedRecord } from "@/types/issue";
import { Flag } from "lucide-react";

export default function StaffDashboard() {
  const students = [
    {
      name: "Google",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Cleared",
    },
    {
      name: "Microsoft",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Uncleared",
    },
    {
      name: "INSA",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Cleared",
    },
    {
      name: "Icog",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Uncleared",
    },
    {
      name: "IE Networks",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Cleared",
    },
    {
      name: "Addis Software",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Uncleared",
    },
    {
      name: "INSA",
      role: "SWE Intern",
      id: "22/04/2022",
      year: "22/04/2022",
      status: "Cleared",
    },
  ];

  const [loading, setLaoding] = useState(false);
  const [issudeStudent, setIssuedstudent] = useState<IssuedRecord[]>([]);
  const { user } = useAuth();
  console.log("here", user?.role?.role_name);
  const role = user?.role?.role_name;
  useEffect(() => {
    getAll();
  }, [role]);

  const getAll = async () => {
    try {
      setLaoding(true);
      const data = await fetchall(role);
      console.log("data", data.data);
      setIssuedstudent(data.data);
      setLaoding(false);
    } catch (error) {
      console.log(error);
      setLaoding(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 min-h-screen bg-gray-50">
          <h1 className="text-3xl font-bold text-center mb-6">
            Staff Dashboard
          </h1>

          <Card className="max-w-5xl mx-auto shadow-md">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Students Needed
              </CardTitle>
              <Button className="bg-teal-700 hover:bg-teal-800 text-white">
                <FiPlus className="mr-2" /> Add Student
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto rounded-lg shadow-md">
                <Table className=" min-w-full divide-y divide-gray-200 bg-white">
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-center font-semibold">
                        Full Name
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Deppartement
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        ID
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        issued_reason
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Action And Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {issudeStudent.map((student, index) => (
                      <TableRow
                        key={index}
                        className={`${index % 2 === 1 ? "bg-blue-50/40" : ""}`}
                      >
                        <TableCell className="text-center">
                          {student?.student_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {student?.department}
                        </TableCell>
                        <TableCell className="text-center">
                          {student?.issued_reason}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.quantity}
                        </TableCell>
                        <TableCell className="text-center space-x-2">
                          <Badge
                            className={`${
                              student.status === "Cleared"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                            } text-white px-3`}
                          >
                            {student.status}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-gray-300"
                          >
                            View detail
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-gray-300 bg-red-700"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
