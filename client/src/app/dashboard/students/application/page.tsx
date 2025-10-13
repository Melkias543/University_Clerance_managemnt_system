"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaAngleDown } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { BounceLoader } from "react-spinners";
import { fetchservices } from "../../../../Api/clearnceServicesApi";
import { servicetype } from "@/types/service";
import { toast } from "react-toastify";
import { SubmitApplication } from "@/Api/applyForClearanceApi";
import { useAuth } from "@/context/authContext";
const applications = [
  { id: 1, name: "Department/Program Head" },
  { id: 2, name: "Bookstore" },
  { id: 3, name: "Library" },
  { id: 4, name: "Dormitory" },
  { id: 5, name: "Cafeteria" },
  { id: 6, name: "Sport Academy" },
  { id: 7, name: "Student Loan" },
  { id: 8, name: "Registral Office" },
  { id: 9, name: "Student Descipline" },
];

const Page = () => {
  const [application, setAppliation] = useState<servicetype[]>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {});
  
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  // console.log(application);
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchservices();
        // console.log(data);
        if (data.status) {
          setAppliation(data?.data);
          setLoading(false);
        }
        if (!data.status) {
          setError(data?.msg || "Fail to fetch.");
          toast.error(data?.msg || "Fail to fetch.");
          setLoading(false);
        }
      } catch (error: any) {
        console.log("fail ");
        setError(error?.AxiosError.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  // console.log(application);

  const { applicantData, setapplicantData, user } = useAuth();

  // console.log("user", user);
  console.log("aplicant", applicantData?.data?.full_name);
  const handleApplication = async (to: string, id: string) => {
    // console.log("ID", to);

    setLoadingStates((prev) => ({ ...prev, [to]: true }));

    const updatedApplicant = {
      ...applicantData,
      application_id: id,
    };
    
    setapplicantData(updatedApplicant); // still updates state
    // console.log(object)
    try {
      const response = await SubmitApplication(to, updatedApplicant);
      console.log("Start loading for:", to);

      console.log("triger", updatedApplicant);
      if (response?.status) {
        toast.success(`${response?.msg} TO ${to}`);
      } else {
        toast.warning(`Unexpected response for ${to}`);
      }
      setLoadingStates((prev) => ({ ...prev, [to]: false }));

      console.log(response);
    } catch (error: any) {
      console.log(error?.response.data);
      setLoadingStates((prev) => ({ ...prev, [to]: false }));
      toast.warning(`${error?.response.data.msg}  TO ${to}`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [to]: false }));
    }
  };
  // console.log(applicantData)
  if (!applicantData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-white rounded-lg shadow-md border border-gray-200 space-y-4">
        <BounceLoader color="#0A6372" size={50} />
        <p className="text-gray-700 font-medium text-lg text-center">
          Loading your application...
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="font-bold text-3xl text-gray-800">
          Student Application Dashboard
        </h1>
        {applicantData ? (
          <p className="bg-gradient-to-r from-green-700 to-cyan-200 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg shadow-md inline-block ">
            {applicantData?.data?.full_name}
          </p>
        ) : (
          <Button className="bg-[#0A6372] text-white px-5 py-2 rounded hover:bg-[#084f57] transition">
            Apply For Clearance
          </Button>
        )}
      </div>

      <p className="text-gray-600 mb-6 px-1">Students can apply here!</p>
      <h2 className="text-[#253D90] font-semibold text-2xl mb-4 px-1">
        List of Student Applications
      </h2>
      {error && (
        // Use a wrapper div with flex properties
        <div className="flex justify-center w-full">
          <p className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded-md my-4 max-w-lg w-75 text-center">
            {error}
          </p>
        </div>
      )}

      {loading ? (
        <p className="flex items-center justify-center m-auto text-lg font-semibold text-gray-700 animate-pulse bg-gray-100 rounded-xl shadow-sm px-6 py-3 w-fit">
          <svg
            className="w-5 h-5 mr-2 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </p>
      ) : (
        <div className="grid gap-4 ">
          {application?.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition pb-4 justify-content-center "
            >
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-gray-1000 font-medium">{app.title}</h3>
                  {openId === app._id && (
                    <p className="mt-2 text-gray-600">{app.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {/* <Button
                    onClick={() => handleApplication(app.title, app._id)}
                    className="bg-[#0A6372] text-white px-4 py-2 rounded hover:bg-[#084f57] transition cursor-pointer"
                    disabled={loadingStates[app.title]}
                  >
                    {loadingStates[app.title] ? (
                      <>
                        <ClipLoader size={18} color="#fff" />
                        <span className=" text-cyan-200">Submitting...</span>
                      </>
                    ) : (
                      applicantData?.approvals?.find(
                        (appr: any) =>
                          appr.office.replace("_", " ") === app.title
                      )?.status || `Apply to ${app.title}`
                    )}
                  </Button> */}

                  <Button
                    onClick={() => handleApplication(app.title, app._id)}
                    className={`px-4 py-2 rounded transition cursor-pointer ${
                      // determine color based on status
                      (() => {
                        const status = applicantData?.approvals?.find(
                          (appr: any) =>
                            appr.office.replace("_", " ") === app.title
                        )?.status;

                        if (status === "Aproved")
                          return "bg-green-500 text-white hover:bg-green-600";
                        if (status === "Pending")
                          return "bg-yellow-400 text-white hover:bg-yellow-500";
                        if (status === "Rejected")
                          return "bg-red-500 text-white hover:bg-red-600";
                        if (status === "Aprove")
                          return "bg-blue-500 text-white hover:bg-blue-600";
                        return "bg-[#0A6372] text-white hover:bg-[#084f57]"; // default
                      })()
                    }`}
                    disabled={
                      loadingStates[app.title] ||
                      !!applicantData?.approvals?.find(
                        (appr: any) =>
                          appr.office.replace("_", " ") === app.title
                      ) // disable if already approved/rejected/pending
                    }
                  >
                    {loadingStates[app.title] ? (
                      <>
                        <ClipLoader size={18} color="#fff" />
                        <span className="ml-2 text-cyan-200">
                          Submitting...
                        </span>
                      </>
                    ) : (
                      // show status or default
                      applicantData?.approvals?.find(
                        (appr: any) =>
                          appr.office.replace("_", " ") === app.title
                      )?.status ||
                      `Apply to ${app.title}` ||
                      "Pending"
                    )}
                  </Button>

                  <Button
                    onClick={() =>
                      setOpenId(openId === app._id ? null : app._id)
                    }
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition cursor-pointer"
                  >
                    {openId === app._id ? "Hide details" : "Show details"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
