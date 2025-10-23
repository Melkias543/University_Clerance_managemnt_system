"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { Aprove, Delete, fetchall } from "@/Api/isued";
import { IssuedRecord } from "@/types/issue";
<<<<<<< HEAD
import StudentIssue from "@/components/StaffsPages/createIssue";
import { toast } from "react-toastify";
export default function StaffDashboard() {
  const[ role, setRole] =useState(null)
  const [issueToEdit, setIssueToEdit] = useState<IssuedRecord | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLaoding] = useState(false);
  const [issudeStudent, setIssuedstudent] = useState<IssuedRecord[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const userString = localStorage.getItem("user");
if (userString) {
  const user = JSON.parse(userString);
  console.log("local user", user?.role?.role_name);
  setRole(user?.role?.role_name);
}},[])
  console.log("rolerole",role);

  useEffect(() => {
    getAll();
  }, [role]);
=======
import { Flag } from "lucide-react";

interface StudentData {
  student_name: string;
  student_Id: string;
  department: string;
  issued_reason: string;
  quantity: string;
}

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StudentData>({
    student_name: "",
    student_Id: "",
    department: "",
    issued_reason: "",
    quantity: "1",
  });

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
>>>>>>> deb258983e291080f9b368e5e172843f1843909f

    try {
<<<<<<< HEAD
      setLaoding(true);
      const data = await fetchall(role);
      // console.log("data", data.data);
      setIssuedstudent(data.data);
      setLaoding(false);
    } catch (error) {
      console.log(error);
      setLaoding(false);
    }
  };
// console.log("role",role)
// Melkias
  const deleteIT = async (id: string, role:string) => {
    try {
      console.log(id);
      console.log("hee role", role);

      const deleted = await Delete(id, role);
      console.log("res", deleted.msg);
      toast.success(deleted.msg);
    } catch (error: any) {
      console.log(error);
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";

      toast.error(`${message || " Fail"} `);
      console.log("failed:", error);
    }
  };
  // console.log(issueToEdit);
  const handleAprove = async (id: string, value: string,role:string) => { 
    console.log(id,value,role)

    try {
      
      const res = await Aprove(id, value, role)
      console.log(res.msg)
         toast.success(res.msg);
    } catch (error:any) {
      console.log(error);
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";

      toast.error(`${message || " Fail"} `);
      console.log("failed:", error);
    }
  }
    
    ;
=======
      if (
        !formData.student_name ||
        !formData.student_Id ||
        !formData.department||
        !formData.issued_reason||
        !formData.quantity
      ) {
        throw new Error("Please fill in all required fields");
      }

      console.log("Adding student:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormData({
        student_name: "",
        student_Id: "",
        department: "",
        issued_reason: "",
        quantity: "1",
      });
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData({
        student_name: "",
        student_Id: "",
        department: "",
        issued_reason: "",
        quantity: "1",
      });
    }
  };

>>>>>>> deb258983e291080f9b368e5e172843f1843909f
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-6 min-h-screen bg-gray-50">
          <h1 className="text-3xl font-bold text-center mb-6">
            Staff Dashboard
          </h1>

<<<<<<< HEAD
          <Card className="max-w-5xl mx-auto shadow-md">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-700">
                Students Issued In Some Case.
              </CardTitle>
              <Button
                onClick={() => setShowPopup(!showPopup)}
                className="bg-teal-800 hover:bg-teal-600 text-white hover:cursor-pointer"
              >
                <FiPlus className="mr-2" /> Add Student
              </Button>

              <StudentIssue
                issueToEdit={issueToEdit}
                open={showPopup}
                onClose={() => setShowPopup(false)}
              />
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
                        Quantity
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Action And Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {issudeStudent.map((student, index) => (
                      <TableRow
                        key={student._id}
                        className={`${index % 2 === 1 ? "bg-blue-50/40" : ""}`}
=======
      <Card className="max-w-5xl mx-auto shadow-md">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-700">
            Students Needed
          </CardTitle>

          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-teal-700 hover:bg-teal-800 text-white cursor-pointer">
                <FiPlus className="mr-2 " /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold ">
                  Add New Student
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAddStudent} className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student_name" className="text-sm font-medium">
                    Student Name 
                  </Label>
                  <Input
                    id="student_name"
                    placeholder="Enter student full name"
                    value={formData.student_name}
                    onChange={(e) =>
                      handleInputChange("student_name", e.target.value)
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student_Id" className="text-sm font-medium">
                    Student ID 
                  </Label>
                  <Input
                    id="student_Id"
                    placeholder="Enter student ID"
                    value={formData.student_Id}
                    onChange={(e) =>
                      handleInputChange("student_Id", e.target.value)
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student_Id" className="text-sm font-medium">
                    Student ID 
                  </Label>
                  <Input
                    id="Department"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="issued_reason"
                    className="text-sm font-medium"
                  >
                    Issue Reason
                  </Label>
                  <Textarea
                    id="issued_reason"
                    placeholder="Describe the reason for withdrawal"
                    value={formData.issued_reason}
                    onChange={(e) =>
                      handleInputChange("issued_reason", e.target.value)
                    }
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-teal-700 hover:bg-teal-800 text-white cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                        Adding...
                      </>
                    ) : (
                      "Add Student"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isLoading}
                    className="flex-1 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-center font-semibold">
                    Full Name
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Role
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Year
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={index}
                    className={`${index % 2 === 1 ? "bg-blue-50/40" : ""}`}
                  >
                    <TableCell className="text-center">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.role}
                    </TableCell>
                    <TableCell className="text-center">{student.id}</TableCell>
                    <TableCell className="text-center">
                      {student.year}
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
>>>>>>> deb258983e291080f9b368e5e172843f1843909f
                      >
                        <TableCell className="text-center">
                          {student?.student_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {student?.department}
                        </TableCell>
                        <TableCell className="text-center">
                          {student?.student_Id}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.issued_reason}
                        </TableCell>
                        <TableCell className="text-center">
                          {student.quantity}
                        </TableCell>
                        <TableCell className="text-center space-x-2">
                          <select
                            name="status"
                            id="status"
                            value={student.status} // default value
                            onChange={(e) =>
                              handleAprove(student._id, e.target.value, role)
                            } // handle change
                            className={`text-white px-3 py-2 rounded-md text-center cursor-pointer
    ${
      student.status === "cleared"
        ? "bg-green-500 hover:bg-green-600"
        : student.status === "with_issue"
        ? "bg-red-500 hover:bg-red-600"
        : student.status === "pending"
        ? "bg-amber-400 hover:bg-amber-500"
        : "bg-gray-400"
    }`}
                          >
                            <option value="cleared">Cleared</option>
                            <option value="with_issues">With Issue</option>
                            <option value="pending">Pending</option>
                          </select>

                          {/* <Button
                            size="sm""pending", "with_issues", "cleared
                            variant="outline"
                            className="text-xs border-gray-300"
                          >
                            View detail
                          </Button> */}
                          <Button
                            onClick={() => {
                              setIssueToEdit(student);
                              setShowPopup(true);
                            }}
                            size="sm"
                            variant="outline"
                            className="text-xs bg-blue-700 hover:bg-blue-500 hover:cursor-pointer border-gray-300"
                          >
                            Edit Issue
                          </Button>
                          <Button
                            onClick={() => deleteIT(student._id, role)}
                            size="sm"
                            variant="outline"
                            className="text-xs border-gray-300 bg-red-700 hover:bg-red-500 hover:cursor-pointer"
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
