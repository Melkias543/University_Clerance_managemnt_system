"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import WithdrawalForm from "@/types/service";
import { getData, toApply } from "../Api/applyForClearanceApi";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface ClearancePopupProps {
  open: boolean;
  onClose: () => void;
}

const ClearancePopup: React.FC<ClearancePopupProps> = ({ open, onClose }) => {
  const router = useRouter();
  const { user, applicantData, setapplicantData,setUser } = useAuth();
  // console.log(user);
  const userId = user?.userId;
  console.log("why",userId);
  const [formData, setFormData] = useState<WithdrawalForm>({
    full_name: "",
    university_email: "",
    university_id: "",
    department: "",
    year_batch: "",
    reason_for_withdrawal: "",
    student: "",
    clearance_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({
        ...prev,
        student: user.userId,
      }));
    }
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastID = toast.loading("Submitting your request...");
   const upadate = {
     ...formData,
     student: user.userId
    };
    setFormData(upadate);
    console.log(formData)
    try {
      const submited = await toApply(formData);
      // console.log("here", submited?.data);
      if (submited?.status) {
        toast.dismiss();
        // console.log(submited.msg);
        toast.success(submited?.msg || "Application submitted successfully!"); // Success toast
        setapplicantData(submited.data)
        router.push("/dashboard/students/application");
      }
    } catch (error: any) {
      toast.update(toastID, {
        render: error?.response.data.msg || "Fail to submit Your appliction",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

 console.log(applicantData)
  /**{data {
      full_name:full_name,
      university_email:university_email,
      university_id:university_id,
      department:department,
      year_batch:year_batch,
      reason_for_withdrawal:reason_for_withdrawal,
      clearance_date:clearance_date,
      application_id,
}
student,approvals} */
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Apply for Clearance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              name="full_name"
              // value={formData.full_name}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="University ID"
              name="university_id"
              // value={formData.university_id}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="University Email"
              name="university_email"
              // value={formData.university_email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Year / Batch"
              name="year_batch"
              // value={formData.year_batch}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="clearance_date"
              // value={formData.clearance_date}
              onChange={handleChange}
              required
            />
          </div>

          <Textarea
            placeholder="Reason for withdrawal"
            name="reason_for_withdrawal"
            // value={formData.reason_for_withdrawal}
            onChange={handleChange}
            className="h-24"
          />

          <DialogFooter className="flex justify-between">
            <Button
              variant="secondary"
              type="button"
              className="cursor-pointer bg-amber-50"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 cursor-pointer"
            >
              Proceed to Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClearancePopup;


