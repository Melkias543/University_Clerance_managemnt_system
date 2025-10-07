import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
export default function StudentApply() {
  return (
    <div>
      <div className=" w-150  flex bg-gray-50 justify-content-center ">
        <div className="justify-content-center w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-20 p-4 m-5 bg-blue-400 text-violet-50 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Dormitory</p>

            <div className="flex gap-3">
              <Button className="bg-emerald-400 hover:cursor-pointer hover:bg-amber-300 transition-colors px-4 py-2 rounded-md">
                Apply
              </Button>

              {/* Example status states */}
              {/* <p className="bg-red-400 text-white px-3 py-1 rounded-md text-sm">Rejected</p>
    <p className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm">Pending</p>
    <p className="bg-emerald-400 text-white px-3 py-1 rounded-md text-sm">Approved</p> */}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-20 p-4 m-5 bg-blue-400 text-violet-50 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Dormitory</p>

            <div className="flex gap-3">
              <Button className="bg-emerald-400 hover:cursor-pointer hover:bg-amber-300 transition-colors px-4 py-2 rounded-md">
                Apply
              </Button>

              {/* Example status states */}
              {/* <p className="bg-red-400 text-white px-3 py-1 rounded-md text-sm">Rejected</p>
    <p className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm">Pending</p>
    <p className="bg-emerald-400 text-white px-3 py-1 rounded-md text-sm">Approved</p> */}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 sm:gap-20 p-4 m-5 bg-blue-400 text-violet-50 rounded-lg ">
            <p className="text-lg font-semibold">Dormitory</p>

            <div className="flex gap-3">
              <Button className="bg-emerald-400 hover:cursor-pointer hover:bg-emerald-300 transition-colors px-4 py-2 rounded-md">
                Apply
              </Button>

              {/* Example status states */}
              {/* <p className="bg-red-400 text-white px-3 py-1 rounded-md text-sm">Rejected</p>
    <p className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm">Pending</p>
    <p className="bg-emerald-400 text-white px-3 py-1 rounded-md text-sm">Approved</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
