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
import { Role } from "@/types/role";
import { Staff } from "@/types/staff";
import { toast } from "react-toastify";

interface StaffPopupProps {
  open: boolean;
  onClose: () => void;
  staffToEdit?: Staff | null;
}

const StaffPopup: React.FC<StaffPopupProps> = ({
  open,
  onClose,
  staffToEdit,
}) => {
  const [input, setInput] = useState<Staff>({
    full_name: "",
    email: "",
    password: "",
    salary: 0,
    hired_date: "",
    role_id: "",
  });

  // const [input, setInput] = useState<Staff>({
  //   _id: staffToEdit?._id || "",
  //   full_name: staffToEdit?.full_name || "",
  //   email: staffToEdit?.email || "",
  //   password: staffToEdit?.password,
  //   salary: staffToEdit?.salary || 0,
  //   hired_date: staffToEdit?.hired_date.split("T")[0],
  //   role_id:
  //     typeof staffToEdit?.role_id === "object"
  //       ? staffToEdit?.role_id._id
  //       : staffToEdit?.role_id || "",
  // });
  //   console.log("formData", staffToEdit?.hired_date)

  //     ;
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (staffToEdit) {
      setInput({
        _id: staffToEdit._id,
        full_name: staffToEdit.full_name,
        email: staffToEdit.email,
        password: staffToEdit?.password,
        salary: staffToEdit.salary,
        // hired_date: staffToEdit.hired_date,

        role_id:
          typeof staffToEdit.role_id === "object"
            ? staffToEdit.role_id._id
            : staffToEdit.role_id,
      });
    } else {
      setInput({
        full_name: "",
        email: "",
        password: "",
        salary: 0,
        hired_date: "",
        role_id: "",
      });
    }
  }, [staffToEdit]);

  useEffect(() => {
    getAllRoles()
      .then((res) => setRoles(res.data))
      .catch(console.error);
  }, []);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  console.log(input._id);
  console.log(input);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dataToSend: Partial<Staff> = { ...input };

    // Remove hired_date on update

    if (staffToEdit) {
      const { hired_date, ...rest } = dataToSend;
      dataToSend = rest;
    }

    console.log("dataToSend", dataToSend);
    try {
      let response
     if (staffToEdit) {
       response = await UpdateStaff(dataToSend, input._id);
     } else {
       response = await createStaff(input);
     }
console.log("response",response)
     // Show success only if backend confirms
     if (response && response.msg) {
       toast.success(response.msg);
     } else {
       toast.success("Operation completed successfully.");
     }
    } catch (error: any) {
      const message =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message ||
        "Server Error";

      toast.error(`Update failed:Fail`);
      console.log("Update failed:", message);
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
              {staffToEdit ? "Update Staff" : "Add new Staff"}
            </DialogTitle>
            <DialogDescription>
              {staffToEdit
                ? " Update the staff information and click update ."
                : "Add new  staff information and  click save."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-2">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={input.full_name}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={input.password}
                onChange={handleOnchange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={input.salary}
                onChange={handleOnchange}
              />
            </div>

            {!staffToEdit && (
              <div className="grid gap-2">
                <Label htmlFor="hired_date">Hired Date</Label>
                <Input
                  id="hired_date"
                  name="hired_date"
                  type="date"
                  value={input.hired_date}
                  onChange={!staffToEdit ? handleOnchange : undefined}
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="role_id">Role</Label>
              <select
                id="role_id"
                name="role_id"
                value={input.role_id as string}
                className="border rounded px-3 py-2 w-full"
                onChange={handleOnchange}
              >
                <option value="">Select a role</option>
                {roles.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.role_name}
                  </option>
                ))}
              </select>
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
              {staffToEdit ? "Update Staff" : "Add new Staff"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffPopup;
