"use client";

import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import ClearancePopup from "@/components/appplicationpopup";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/authContext";

const DashboardContent = () => {
  const [showPopup, setShowPopup] = useState(false);

  
const {applicantData,user}= useAuth()
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back! Here’s your clearance overview.
          </p>
        </div>
        {/* :Button triggers popup8{" "} */}
        {/* {applicantData ? (
          <p className="bg-gradient-to-r from-green-700 to-cyan-200 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg shadow-md inline-block ">
            {user?.full_name}
          </p>
        ) : ( */}
        <div className="flex justify-end items-center justify-top  bg-white shadow-sm sticky  z-50">
          <Button
  onClick={() => setShowPopup(true)}
  className="
    flex items-center justify-center gap-2 
    bg-teal-700 hover:bg-teal-800 text-white 
    px-4 py-2 rounded-md font-medium 
    text-sm sm:text-base md:text-lg 
    w-full sm:w-auto 
    transition-all duration-200
  "
>
  <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
  <span className="hidden sm:inline">Apply for Clearance</span>
  <span className="sm:hidden">Apply</span>
</Button>
</div>
        {/* )} */}
      </div>

      {/* Popup Component */}
      <ClearancePopup open={showPopup} onClose={() => setShowPopup(false)} />

      {/* Mentor Info */}
      <div className=" mb-8 ">
        <Card className=" text-start shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Name of Student </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-800">Sarah Wilson</p>
          </CardContent>
        </Card>

        
        
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-sm ">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="">
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="p-2 bg-gray-50 rounded">
                • Your clearance request has been submitted successfully{" "} <br />
                <span className="text-xs text-gray-400">2 hours ago</span>
              </li>
              <li className="p-2 bg-gray-50 rounded">
                • registral  is reviewing your payment status{" "} <br />
                <span className="text-xs text-gray-400">1 hour ago</span>
              </li>
              <li className="p-2 bg-gray-50 rounded">
                • Supervisor left a comment on your application{" "}  <br />
                <span className="text-xs text-gray-400">2 hours ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
              <span>
                . head is not approve your application<br />
                <span className="text-xs text-gray-400">Due: Tomorrow</span>
              </span>
              
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
              <span>
                library not approved <br />
                <span className="text-xs text-gray-400">Due: Friday</span>
              </span>
             
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-gray-900 text-white w-full">New application</Button>
            <Button className="bg-blue-600 text-white w-full">
              submit application
            </Button>
            <Button variant="secondary" className="w-full">
              view status
            </Button>
            <Button variant="secondary" className="w-full">
             wait for approval
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
