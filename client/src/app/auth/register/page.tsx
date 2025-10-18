"use client";

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
import Link from "next/link";
import { useState } from "react";
import {Student} from '../../../types/student'
import { useRouter } from "next/navigation";


export default function register() {
  const [error, setError] = useState("");
  const [student, setStudent] = useState<Partial<Student>>({
    full_name: "",
    university_email: "",

    role: "68ef9daab57d4a3706242e1f",
    student_university_id: "",
    password: "",
    department: "",
  });
const router = useRouter()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("name", e.target.name,"target", e.target,"value", e.target.value);
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(student);
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const students: Student = student;
    try {
      const res = await api.post("/auth/register", student);
      // console.log("Sent student:", student);
      // console.log("Response:", res.data);
      // console.log(res);
      if (res.data.status) {
        alert(res.data.msg)
        router.push("/auth/login");
      }
      else {
        setError(res.data.msg|| "Failed.");
      }
    } catch (error:any) {
      console.log(error)
      setError(error.response.data.msg || "Failed.");
    }
  };

  return (
    <div className="flex items-center m-auto justify-center align-items-center mt-4 ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">
            <h1>Register</h1>
          </CardTitle>
          <CardDescription>
            Register by provideing your email and university ID below
          </CardDescription>
          <CardAction>
            <Link href="/auth/login">
              <Button variant="link" className="bg-blue-800 text-white">
                Login
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-600 text-sm mt-2 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}{" "}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="full_name"
                  type="text"
                  placeholder="full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="university_id">Uniersity ID</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="student_university_id"
                  type="text"
                  placeholder="Your correct university id"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="university_email">Email</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="university_email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  onChange={(e) => handleOnChange(e)}
                  name="department"
                  type="department"
                  placeholder="Computer science"
                  required
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
              </div>
            </div>
            <Button type="submit" className="w-full hover:!cursor-pointer mt-5">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
