// import React from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Staff } from "@/types/staff";

// interface StaffPopoverProps {
//   open: boolean;
//   onClose: () => void;
//   staff: Staff | null;
// }

// const SIngleStaffPopover: React.FC<StaffPopoverProps> = ({
//   open,
//   onClose,
//   staff,
// }) => {
//   if (!staff) return null;

//   return (
//     <Popover open={open} onOpenChange={onClose}>
//       <PopoverTrigger asChild>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-200">
//           View Staff
//         </button>
//       </PopoverTrigger>

//       <PopoverContent className="w-80 p-6 bg-white shadow-xl border border-gray-200 rounded-lg">
//         <div className="flex flex-col space-y-3">
//           <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
//             Staff Details
//           </h2>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Full Name:</span>
//             <span className="text-gray-900">{staff.full_name}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Email:</span>
//             <span className="text-gray-900">{staff.email}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Salary:</span>
//             <span className="text-gray-900">${staff.salary}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Hired Date:</span>
//             <span className="text-gray-900">
//               {staff.hired_date.split("T")[0]}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Role:</span>
//             <span className="text-gray-900">
//               {typeof staff.role_id === "object"
//                 ? staff.role_id.role_name
//                 : staff.role_id}
//             </span>
//           </div>

//           <button
//             onClick={onClose}
//             className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow-sm transition-colors duration-200"
//           >
//             Close
//           </button>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default SIngleStaffPopover;
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Staff } from "@/types/staff";

interface StaffDialogProps {
  open: boolean;
  onClose: () => void;
  staff: Staff | null;
}

const SingleStaffDialog: React.FC<StaffDialogProps> = ({
  staff,
  open,
  onClose,
}) => {
  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Staff Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Detailed information about this staff member.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{staff.full_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{staff.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Salary:</span>
            <span>${staff.salary}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Hired Date:</span>
            <span>{staff.hired_date.split("T")[0]}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>
              {typeof staff.role_id === "object"
                ? staff.role_id.role_name
                : staff.role_id}
            </span>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SingleStaffDialog;
