"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FiPlus } from "react-icons/fi";

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

    try {
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

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Staff Dashboard</h1>

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
                      >
                        View detail
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
  );
}
