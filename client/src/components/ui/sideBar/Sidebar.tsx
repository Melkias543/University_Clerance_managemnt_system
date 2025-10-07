"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../button";

export default function Sidebar() {
  return (
    <div>
      <div className="w-64 bg-gray-100 p-6 border-r">
        <h2 className="text-lg font-bold mb-6">Clearance System</h2>
        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className=" hover:bg-gray-900 cursor-pointer p-2 rounded"
          >
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/users">
            <Button variant="ghost" className="w-full justify-start">
              Users
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
