import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStaff, getAllRoles, UpdateStaff } from "@/Api/adminApi";
import { toast } from "react-toastify";
import { IssuedRecord } from "@/types/issue";
import { useAuth } from "@/context/authContext";
import { createIssue, updateIssue } from "@/Api/isued";

interface cearteIssueProps {
  open: boolean;
  onClose: () => void;
  issueToEdit?: IssuedRecord | null;
}

const StudentIssue: React.FC<cearteIssueProps> = ({
  open,
  onClose,
  issueToEdit,
}) => {
  const [input, setInput] = useState<Partial<IssuedRecord>>({
    student_name: "",
    department: "",
    student_Id: "",
    issued_reason: "",
    quantity: "",
  });
  console.log("issueToEdit", issueToEdit);
  useEffect(() => {
    if (issueToEdit) {
      setInput({
        student_name: issueToEdit?.student_name,
        department: issueToEdit?.department,
        student_Id: issueToEdit?.student_Id,
        issued_reason: issueToEdit?.issued_reason,
        quantity: issueToEdit?.quantity,
      });
    } else {
      setInput({
        student_name: "",
        department: "",
        student_Id: "",
        issued_reason: "",
        quantity: "",
      });
    }
  }, [issueToEdit]);

  const { user } = useAuth();
  // console.log("isuue", user?.role?.role_name);
  const role = user?.role?.role_name;

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(input._id);
  // console.log(input);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove hired_date on update

    // console.log("dataToSend", input);
    try {
      let response;
      if (issueToEdit) {
        console.log(input, issueToEdit._id, role);
        response = await updateIssue(input, issueToEdit._id, role);
      } else {
        response = await createIssue(input, role);
      }
      console.log("response", response);
      // Show success only if backend confirms
      if (response && response.msg) {
        toast.success(response.message || response.msg);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";

      toast.error(`${message}  failed`);
      console.log("failed:", error);
    }
  };

  // const handleDelete=async(id)=>{

  // }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {issueToEdit ? "Update Staff" : "Add new Staff"}
            </DialogTitle>
            <DialogDescription>
              {issueToEdit
                ? " Update the staff information and click update ."
                : "Add new  staff information and  click save."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="student_name">Student Name</Label>
              <Input
                id="student_name"
                name="student_name"
                value={input.student_name}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Departement</Label>
              <Input
                id="department"
                name="department"
                value={input.department}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="student_Id">Student ID</Label>
              <Input
                id="student_Id"
                name="student_Id"
                value={input.student_Id}
                onChange={handleOnchange}
              />
            </div>
            {/* ,,,, */}
            <div className="grid gap-2">
              <Label htmlFor="issued_reason">Why Issued</Label>
              <Input
                id="issued_reason"
                name="issued_reason"
                type="text"
                value={input.issued_reason}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantiy</Label>
              <Input
                id="quantity"
                name="quantity"
                type="text"
                value={input.quantity}
                onChange={handleOnchange}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="hover:cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="hover:bg-blue-400 bg-blue-700 hover:cursor-pointer"
            >
              {issueToEdit ? "Update Staff" : "Add new Staff"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentIssue;
