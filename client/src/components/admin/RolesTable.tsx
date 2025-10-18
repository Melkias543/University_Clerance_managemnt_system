// RolesTable.tsx
import React from "react";
import type { Role } from "@/types/role"; // ✅ Import your real Role type

interface RolesTableProps {
  data: Role[]; // ✅ Use it here
}

export default function RolesTable({ data }: RolesTableProps) {
  return (
    <table className="min-w-full border border-gray-200 text-sm text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b">#</th>
          <th className="px-4 py-2 border-b">Role Name</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((role, index) => (
            <tr key={role._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b font-semibold text-gray-700">
                {role.role_name}
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
    </table>
  );
}
