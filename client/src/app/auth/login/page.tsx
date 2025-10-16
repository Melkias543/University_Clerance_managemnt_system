"use client";
import { getData } from "@/Api/applyForClearanceApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/config/axiosConfig";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { user, setUser, isLogged, setIsLogged, token, setToken,setapplicantData,applicantData } = useAuth();

//  useEffect(() => {
//    const data = async () => {
//      // const toastId = toast.update('Loading User Data...')
//      toast.loading("loading Applicant");
//      try {
//        const data = await getData(user?.userId);
//        console.log("now", data);
//        if (data.status) {
//          // console.log(data.data)
//          setapplicantData({
//            data: {
//              full_name: data.data.full_name,
//              university_email: data.data.university_email,
//              university_id: data.data.university_id,
//              department: data.data.department,
//              year_batch: data.data.year_batch,
//              reason_for_withdrawal: data.data.reason_for_withdrawal,
//              clearance_date: data.data.clearance_date,
//            },
//            application_id: "",
//            student: data.data.student,
//            approvals: data.data.approvals,
//          });
//          toast.dismiss();
//          toast.success("Applicant Loaded!");
//        }
//      } catch (error: any) {
//        console.log(error?.response.data.msg);
//        toast.error("Student data Not Found");
//      }
//    };
//    data();
//  }, [user]);
//  console.log(applicantData);
  // if (user?.role.role_name === "student") {
  //   console.log("sport_office");
  // };

  const [error, setError] = useState("");
  const [student, setStudent] = useState({
    email: "",
    university_email: "",
    password: "",
  });

// console.log(user)
// console.log({user},token,isLogged)
  const router = useRouter();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(student);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("triggered");
    try {
      const loginData = {
        email: student.email || undefined,
        university_email: student.university_email,
        password: student.password,
      };

      const res = await api.post("/auth/login", loginData);
      // console.log("Sent student:", student);
      // console.log("Response:", res.data);
      // console.log(res);
      if (res.data.status) {
        toast.dismiss();
        setIsLogged(true);
        setToken(res?.data?.token);
        setUser(res?.data?.user);
        toast.success(res?.data.msg || "Logged IN");
        if (
          user?.role?.role_name === "student" ||
          user?.role === "student"
        ) {
          router.push("/dashboard/students");
        } else if (user?.role?.role_name === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/staff");
        }
    } 
      else {
        setError(res.data.msg || "Failed.");
      }
    } catch (error: any) {
      // console.log(error);
      setError(error?.response?.data?.msg || "Failed.");
       toast.error(error?.response?.data?.msg || "Failed.");
      
    }
  };
  return (
    <div className="flex items-center m-auto justify-center align-items-center mt-5 ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            <h1>Login to your account</h1>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/auth/register">
              <Button variant="link" className="bg-blue-800 text-white">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-600 text-sm mt-2 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Student Email</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="university_email"
                  type="email"
                  placeholder="ForStudentm@example.com"
                  
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Staff Email</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="email"
                  type="email"
                  placeholder="ForSatff@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="password"
                  type="password"
                  required
                />
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full mt-5 hover:cursor-pointer!">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

