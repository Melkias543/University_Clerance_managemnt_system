"use client";


import BookStoreApplicant from "@/components/StaffsPages/Bookstore";
import { useAuth } from "@/context/authContext";
import RegistralApplicant from "@/components/StaffsPages/RegistralApplicant";
import CafteriaApplicant from "@/components/StaffsPages/CaffeApplicant";
import WomenAndYouthAffairsApplicant from "@/components/StaffsPages/WomenAffairsApplicant";
import StudentLoanApplicant from "@/components/StaffsPages/StudentAppilicant";
import DepartmentHeadApplicant from "@/components/StaffsPages/DeptHeadApplicant";
import LibrarianApplicant from "@/components/StaffsPages/LibraryAplicant";
import CollegeDeanApplicant from "@/components/StaffsPages/CollegeDeanApplicant";
import DormitoryApplicant from "@/components/StaffsPages/DormitoryApplicant";
import SportApplicant from "@/components/StaffsPages/SportApplicant";



export default function StaffDashBoard() {
  // const [studentList, setStudents] = useState<Applicant[]>([]);
  // const [id, setId] = useState("");
  const { user } = useAuth()
 const role =user?.role?.role_name
  // let students: Student[] = [
  //   {
  //     name: "milkias",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Rejected",
  //     type: "Internship",
  //   },
  //   {
  //     name: "tolera",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Rejected",
  //     type: "Internship",
  //   },
  //   {
  //     name: "chalchisa",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Approved",
  //     type: "Internship",
  //   },
  //   {
  //     name: "Icog",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Rejected",
  //     type: "Internship",
  //   },
  //   {
  //     name: "IE Networks",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Approved",
  //     type: "Internship",
  //   },
  //   {
  //     name: "Addis Software",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Rejected",
  //     type: "Internship",
  //   },
  //   {
  //     name: "INSA",
  //     department: "SWE Intern",
  //     id: "22/04/2022",
  //     year: "22/04/2022",
  //     status: "Rejected",
  //     type: "Internship",
  //   },
  // ];

  // const [search, setSearch] = useState("");
  // const [statusFilter, setStatusFilter] = useState("All");
  // const [typeFilter, setTypeFilter] = useState("All");

  // const filteredStudents = students?.filter((s) => {
  //   const matchName = s?.name.toLowerCase().includes(search.toLowerCase());
  //   const matchStatus = statusFilter === "All" || s.status === statusFilter;
  //   const matchType = typeFilter === "All" || s.type === typeFilter;
  //   return matchName && matchStatus && matchType;
  // });

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case "Approved":
  //       return (
  //         <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
  //           {status}
  //         </Badge>
  //       );
  //     case "Rejected":
  //       return (
  //         <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
  //           {status}
  //         </Badge>
  //       );
  //     case "Pending":
  //       return (
  //         <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
  //           {status}
  //         </Badge>
  //       );
  //     default:
  //       return (
  //         <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
  //           {status}
  //         </Badge>
  //       );
  //   }
  // };

  // useEffect(() => {
  //   const getAplicant = async () => {
  //     try {
  //       const get = await getApplication();
  //       // console.log(get.data)
  //       setStudents(get.data);
  //     } catch (error) {}
  //   };

  //   getAplicant();
  // }, []);
  // console.log("studentList", studentList);
  // useEffect(() => {
  //   if (studentList?.length) {
  //     const firstId = studentList[0].student?.id;
  //     if (firstId) {
  //       console.log("student inside useEffect", firstId);
  //       setId(firstId); // ✅ safe: runs only when studentList changes
  //     }
  //   }
  // }, [studentList]); // dependency ensures it runs only when studentList updates

  // const handleAproveal = async (action: string) => {
  //   try {
  //     const aproveIt = await aproveOrReject(action, id);
  //     if (aproveIt.status) {
  //       toast.success(aproveIt.msg);
  //     }
  //   } catch (error:any) {
  //     console.log(error);
  //     toast.error(`${error?.response.data.msg} || "Internal Server Error."`)
  //   }
  // };

  return (
  

    <>
      {role === "book_store_keeper" && (
        <BookStoreApplicant title="Book Store" />
      )}
      {role === "registrar_office" && (
        <RegistralApplicant title="Registral Office" />
      )}
      {role === "cafteria" && <CafteriaApplicant title="Cafteria" />}
      {role === "librarian" && <LibrarianApplicant title="Library" />}
      {role === "women_affairs" && (
        <WomenAndYouthAffairsApplicant title="Youth and Women affairs" />
      )}
      {role === "student_loan" && <StudentLoanApplicant title="Student Loan" />}
      {role === "college_dean" && <CollegeDeanApplicant title="College Dean" />}
      {role === "dept_head" && (
        <DepartmentHeadApplicant title="Department Head" />
      )}
      {role === "dormitory_office" && (
        <DormitoryApplicant title="Dormitory" />
      )}
      {role === "sport_office" && <SportApplicant title="Sport Science" />}
      {/* {role === "registrar_office" && (
        <BookStoreApplicant title="Book Store Staff" />
      )} */}
    </>
  );
}
