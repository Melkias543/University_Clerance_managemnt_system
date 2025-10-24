"use client";

import { useState, useEffect } from "react";
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
import { Aprove, Delete, fetchall } from "@/Api/isued";
import { IssuedRecord } from "@/types/issue";
import StudentIssue from "@/components/StaffsPages/createIssue";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

export default function StaffDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [issueToEdit, setIssueToEdit] = useState<IssuedRecord | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [issuedStudent, setIssuedStudent] = useState<IssuedRecord[]>([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  // Get role from local storage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log("local user", user?.role?.role_name);
      setRole(user?.role?.role_name);
    }
  }, []);

  console.log("rolerole", role);

  // Fetch all issued students whenever role changes
  useEffect(() => {
    if (role) getAll();
  }, [role]);

  const getAll = async () => {
    try {
      setLoading(true);
      const data = await fetchall(role);
      setIssuedStudent(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Delete a student issue
  const deleteIT = async (id: string, role: string) => {
    try {
      const deleted = await Delete(id, role);
      toast.success(deleted.msg);
    } catch (error: any) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";
      toast.error(`${message}`);
    }
  };

  // Approve or change status
  const handleAprove = async (id: string, value: string, role: string) => {
    try {
      const res = await Aprove(id, value, role);
      toast.success(res.msg);
    } catch (error: any) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";
      toast.error(`${message}`);
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
              <div className="w-full sm:w-1/3">
                <Input
                  placeholder="🔍 Search by name, department, or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-gray-300 focus:ring-2 focus:ring-teal-600"
                />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Students Issued In Some Case
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
                <Table className="min-w-full divide-y divide-gray-200 bg-white">
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-center font-semibold">
                        Full Name
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Department
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        ID
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Issued Reason
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Quantity
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {issuedStudent
                      ?.filter((student) => {
                        const name = student.student_name
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase());
                        const dept = student.department
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase());
                        const Id = student.student_Id
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase());

                        return name || dept || Id;
                      })
                      .map((student, index) => (
                        <TableRow
                          key={student._id}
                          className={`${
                            index % 2 === 1 ? "bg-blue-50/40" : ""
                          }`}
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
                              value={student.status}
                              onChange={(e) =>
                                handleAprove(student._id, e.target.value, role!)
                              }
                              className={`text-white px-3 py-2 rounded-md text-center cursor-pointer
                              ${
                                student.status === "cleared"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : student.status === "with_issues"
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
                              onClick={() => deleteIT(student._id, role!)}
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

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { FiPlus } from "react-icons/fi";
// import { useAuth } from "@/context/authContext";
// import { useEffect, useState } from "react";
// import { Aprove, Delete, fetchall } from "@/Api/isued";
// import { IssuedRecord } from "@/types/issue";
// import StudentIssue from "@/components/StaffsPages/createIssue";
// import { toast } from "react-toastify";
// export default function StaffDashboard() {
//   const[ role, setRole] =useState(null)
//   const [issueToEdit, setIssueToEdit] = useState<IssuedRecord | null>(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLaoding] = useState(false);
//   const [issudeStudent, setIssuedstudent] = useState<IssuedRecord[]>([]);
//   const { user } = useAuth();
//   useEffect(() => {
//     const userString = localStorage.getItem("user");
// if (userString) {
//   const user = JSON.parse(userString);
//   console.log("local user", user?.role?.role_name);
//   setRole(user?.role?.role_name);
// }},[])
//   console.log("rolerole",role);

//   useEffect(() => {
//     getAll();
//   }, [role]);

//   const getAll = async () => {
//       try {
//       setLaoding(true);
//       const data = await fetchall(role);
//       // console.log("data", data.data);
//       setIssuedstudent(data.data);
//       setLaoding(false);
//     } catch (error) {
//       console.log(error);
//       setLaoding(false);
//     }
//   };
//  }
// // console.log("role",role)
// // Melkias
//   const deleteIT = async (id: string, role:string) => {
//     try {
//       console.log(id);
//       console.log("hee role", role);

//       const deleted = await Delete(id, role);
//       console.log("res", deleted.msg);
//       toast.success(deleted.msg);
//     } catch (error: any) {
//       console.log(error);
//       const message =
//         error?.response?.data?.msg ||
//         error?.response?.data?.message ||
//         error?.message ||
//         "Server Error";

//       toast.error(`${message || " Fail"} `);
//       console.log("failed:", error);
//     }
//   };
//   // console.log(issueToEdit);
//   const handleAprove = async (id: string, value: string,role:string) => {
//     console.log(id,value,role)

//     try {

//       const res = await Aprove(id, value, role)
//       console.log(res.msg)
//          toast.success(res.msg);
//     } catch (error:any) {
//       console.log(error);
//       const message =
//         error?.response?.data?.msg ||
//         error?.response?.data?.message ||
//         error?.message ||
//         "Server Error";

//       toast.error(`${message || " Fail"} `);
//       console.log("failed:", error);
//     }
//   }

//     ;
//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="p-6 min-h-screen bg-gray-50">
//           <h1 className="text-3xl font-bold text-center mb-6">
//             Staff Dashboard
//           </h1>

//           <Card className="max-w-5xl mx-auto shadow-md">
//             <CardHeader className="flex justify-between items-center">
//               <CardTitle className="text-lg font-semibold text-gray-700">
//                 Students Issued In Some Case.
//               </CardTitle>
//               <Button
//                 onClick={() => setShowPopup(!showPopup)}
//                 className="bg-teal-800 hover:bg-teal-600 text-white hover:cursor-pointer"
//               >
//                 <FiPlus className="mr-2" /> Add Student
//               </Button>

//               <StudentIssue
//                 issueToEdit={issueToEdit}
//                 open={showPopup}
//                 onClose={() => setShowPopup(false)}
//               />
//             </CardHeader>

//             <CardContent>
//               <div className="overflow-x-auto rounded-lg shadow-md">
//                 <Table className=" min-w-full divide-y divide-gray-200 bg-white">
//                   <TableHeader>
//                     <TableRow className="bg-blue-50">
//                       <TableHead className="text-center font-semibold">
//                         Full Name
//                       </TableHead>
//                       <TableHead className="text-center font-semibold">
//                         Deppartement
//                       </TableHead>
//                       <TableHead className="text-center font-semibold">
//                         ID
//                       </TableHead>
//                       <TableHead className="text-center font-semibold">
//                         issued_reason
//                       </TableHead>
//                       <TableHead className="text-center font-semibold">
//                         Quantity
//                       </TableHead>
//                       <TableHead className="text-center font-semibold">
//                         Action And Action
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>

//                   <TableBody>
//                     {issudeStudent.map((student, index) => (
//                       <TableRow
//                         key={student._id}
//                         className={`${index % 2 === 1 ? "bg-blue-50/40" : ""}`}
//                       >
//                         <TableCell className="text-center">
//                           {student?.student_name}
//                         </TableCell>
//                         <TableCell className="text-center">
//                           {student?.department}
//                         </TableCell>
//                         <TableCell className="text-center">
//                           {student?.student_Id}
//                         </TableCell>
//                         <TableCell className="text-center">
//                           {student.issued_reason}
//                         </TableCell>
//                         <TableCell className="text-center">
//                           {student.quantity}
//                         </TableCell>
//                         <TableCell className="text-center space-x-2">
//                           <select
//                             name="status"
//                             id="status"
//                             value={student.status} // default value
//                             onChange={(e) =>
//                               handleAprove(student._id, e.target.value, role)
//                             } // handle change
//                             className={`text-white px-3 py-2 rounded-md text-center cursor-pointer
//     ${
//       student.status === "cleared"
//         ? "bg-green-500 hover:bg-green-600"
//         : student.status === "with_issue"
//         ? "bg-red-500 hover:bg-red-600"
//         : student.status === "pending"
//         ? "bg-amber-400 hover:bg-amber-500"
//         : "bg-gray-400"
//     }`}
//                           >
//                             <option value="cleared">Cleared</option>
//                             <option value="with_issues">With Issue</option>
//                             <option value="pending">Pending</option>
//                           </select>

//                           {/* <Button
//                             size="sm""pending", "with_issues", "cleared
//                             variant="outline"
//                             className="text-xs border-gray-300"
//                           >
//                             View detail
//                           </Button> */}
//                           <Button
//                             onClick={() => {
//                               setIssueToEdit(student);
//                               setShowPopup(true);
//                             }}
//                             size="sm"
//                             variant="outline"
//                             className="text-xs bg-blue-700 hover:bg-blue-500 hover:cursor-pointer border-gray-300"
//                           >
//                             Edit Issue
//                           </Button>
//                           <Button
//                             onClick={() => deleteIT(student._id, role)}
//                             size="sm"
//                             variant="outline"
//                             className="text-xs border-gray-300 bg-red-700 hover:bg-red-500 hover:cursor-pointer"
//                           >
//                             Delete
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
