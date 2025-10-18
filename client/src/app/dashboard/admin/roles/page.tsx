"use client";
import { IoIosClose } from "react-icons/io";

import { deleteRole, editRole, getAllRoles, sendRole } from "@/Api/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Role } from "@/types/role";
import { strict } from "assert";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Roles() {
  const [input, seInput] = useState<Partial<Role>>({ role_name: "" });
  const [role, setRoles] = useState<Role[]>([]);
  const [edit, setEdit] = useState<Partial<Role>>({
    _id: "",
    role_name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // console.log(role);

  useEffect(() => {
    roles();
  }, []);

  // console.log(input);
  const roles = async () => {
    try {
      console.log("object");
      const data = await getAllRoles();
      // console.log(data.data);
      setRoles(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const submit = await sendRole(input);
      if (submit.msg) {
        toast.success(submit.msg);
      }
      // console.log(submit.msg);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  const handleDelete = async (role_id: string) => {
    try {
      console.log("from page", role_id);
      const deleted = await deleteRole(role_id);
      toast.success(deleted.msg);
      // console.log(deleted);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(edit);
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("from page", edit._id, edit.role_name);
    if (!edit._id) return;
if (!edit.role_name) {
  toast.error("Role name is missing!");
  return;
}
    try {
      const updated = await editRole(edit._id, edit.role_name!);
      console.log(updated.data.msg);
      toast.success(updated.data.msg);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  // console.log(role)
  return (
    <div>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Roles Section */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              List of Roles
            </h2>
            <p className="text-sm text-gray-500">
              Manage all system roles and permissions.
            </p>
          </div>
          {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow">
            Add New Role
          </Button> */}
          {!isEditing && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-emerald-400 text-bg-success"
                >
                  Add new Role
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-10 bg-white p-6 rounded-lg shadow-md max-w-md"
                >
                  {/* Role Name Field */}
                  <div className="flex flex-col space-y-2">
                    <Label
                      htmlFor="role_name"
                      className="text-gray-700 font-semibold"
                    >
                      Role Name
                    </Label>
                    <Input
                      id="role_name"
                      placeholder="Enter role name"
                      // value={input.role_name}
                      onChange={(e) =>
                        seInput({ ...input, role_name: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg mt-3"
                  >
                    Save Role
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          )}
          {isEditing && (
            <div className="w-80">
            
              <span onClick={()=>setIsEditing(false)} className="flex items-end m-auto justify-end text-red-600 hover:cursor-pointer">
                <IoIosClose  size={30} />
              </span>
              <form
                onSubmit={handleEdit}
                className="mt-6 flex flex-col gap-10 bg-white p-6 rounded-lg shadow-md max-w-md"
              >
                {/* Role Name Field */}
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="role_name"
                    className="text-gray-700 font-semibold"
                  >
                    Update Role
                  </Label>
                  <Input
                    id="role_name"
                    placeholder="Enter role name"
                    value={edit.role_name || ""}
                    onChange={(e) =>
                      setEdit({ ...edit, role_name: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg mt-3"
                >
                  Update
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Example table or list container */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <table className="min-w-full border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Role Name</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {role && role.length > 0 ? (
                role.map((role, index) => (
                  <tr key={role._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b font-semibold text-gray-700">
                      {role.role_name}
                    </td>
                    <td className="flex gap-4 items-center">
                      <button
                        onClick={() => {
                          setEdit({
                            _id: role._id,
                            role_name: role.role_name,
                          });
                          setIsEditing(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                      >
                        Edit Role
                      </button>
                      <button
                        onClick={() => handleDelete(role._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                      >
                        Delete Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-4 text-center text-gray-500 italic"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}
