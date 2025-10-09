import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const adminProfile = () => {
  return (
    <div>
      <div className=" font-bold text-3xl text-gray-800">
        <h1 className="font-bold text-3xl text-gray-800">
          Admin profile
        </h1>
         </div>
        <p className="text-gray-600 pb-4">Manage and view admin profiles here.</p>
     
      <div className="bg-white text-gray-800 p-4 rounded justify-between rounded-lg shadow-sm pb-6">
        
       <div className="flex items-center justify-between gap-6 mb-6">
  <div className="flex items-center gap-4">
    <FaUserCircle className="w-16 h-16" />
    <div>
      <h2 className="text-gray-900">John Doe</h2>
      <p className="text-gray-400">johndoe@gmail.com</p>
    </div>
  </div>

  {/* Right side (button) */}
  <Button className="bg-[#0A6372] text-white p-4 rounded text-white px-4 py-2  hover:cursor-pointer">
    Edit Profile
  </Button>
</div>

        {/* form */}
        <div>
          <form action="" className=" rounded-md">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="batch" className="block text-gray-700 font-medium mb-1">
          Batch
        </label>
        <input
          type="text"
          id="batch"
          placeholder="Batch"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          University Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="University Email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="universityId" className="block text-gray-700 font-medium mb-1">
          University ID
        </label>
        <input
          type="text"
          id="universityId"
          placeholder="University ID"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-gray-700 font-medium mb-1">
          Department
        </label>
        <input
          type="text"
          id="department"
          placeholder="Department"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
</form>

          <div className="flex justify-center pt-6">
  <Button className="bg-[#0A6372] text-white p-4 py-2 rounded hover:bg-blue-600 transition">
    Save Changes
  </Button>
</div>

        </div>
      </div>
    </div>
  );
};

export default adminProfile ;
