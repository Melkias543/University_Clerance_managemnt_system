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
const {applicantData}= useAuth()
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Staff Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back! Here’s your clearance overview.
          </p>
        </div>
        :{/* Button triggers popup */} 
        {applicantData ? (
          <p className="bg-gradient-to-r from-green-700 to-cyan-200 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg shadow-md inline-block ">
            {/* {applicantData?.data?.full_name} */}
            Staff Dashboard
          </p>
        ) : (
          <Button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-4"
          >
            <FiSend /> Apply for Clearance
          </Button>
        )}
      </div>

      {/* Popup Component */}
      <ClearancePopup open={showPopup} onClose={() => setShowPopup(false)} />

      {/* Mentor Info */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Card className="w-48 text-center shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-800">Sarah Wilson</p>
          </CardContent>
        </Card>

        <Card className="w-48 text-center shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Supervisor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-800">Dr. Smith</p>
          </CardContent>
        </Card>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="p-2 bg-gray-50 rounded">
                • New feedback received for Week 2 report{" "}
                <span className="text-xs text-gray-400">2 hours ago</span>
              </li>
              <li className="p-2 bg-gray-50 rounded">
                • Week 3 report due tomorrow{" "}
                <span className="text-xs text-gray-400">1 hour ago</span>
              </li>
              <li className="p-2 bg-gray-50 rounded">
                • Meeting scheduled with mentor{" "}
                <span className="text-xs text-gray-400">2 hours ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span>
                Submit Week 3 Report <br />
                <span className="text-xs text-gray-400">Due: Tomorrow</span>
              </span>
              <Badge variant="destructive">High</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span>
                Mentor Meeting <br />
                <span className="text-xs text-gray-400">Due: Friday</span>
              </span>
              <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                Medium
              </Badge>
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
            <Button className="bg-gray-900 text-white w-full">New Task</Button>
            <Button className="bg-blue-600 text-white w-full">
              Submit Report
            </Button>
            <Button variant="secondary" className="w-full">
              Send Message
            </Button>
            <Button variant="secondary" className="w-full">
              Request Leave
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
