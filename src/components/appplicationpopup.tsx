"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ClearancePopupProps {
  open: boolean;
  onClose: () => void;
}

const ClearancePopup: React.FC<ClearancePopupProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    universityId: "",
    department: "",
    yearBatch: "",
    reason: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Apply for Clearance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="University ID"
              name="universityId"
              value={formData.universityId}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="University Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Year / Batch"
              name="yearBatch"
              value={formData.yearBatch}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <Textarea
            placeholder="Reason for withdrawal"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="h-24"
          />

          <DialogFooter className="flex justify-between">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Proceed to Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClearancePopup;
