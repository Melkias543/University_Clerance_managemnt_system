"use client";
import { getData } from "@/Api/applyForClearanceApi";
import AuthContextType from "@/types/context";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);




export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [applicantData, setapplicantData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
    useEffect(() => {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");

      if (token) localStorage.setItem("token", token);
      else localStorage.removeItem("token");
    }, [user, token]);
  


  useEffect(() => {
    if (!user) return;
  console.log("from context",user)
    const fetchApplicantData = async () => {
      try {
        const data = await getData(user.userId);
        if (data.status) {
          setapplicantData({
            data: {
              full_name: data.data.full_name,
              university_email: data.data.university_email,
              university_id: data.data.university_id,
              department: data.data.department,
              year_batch: data.data.year_batch,
              reason_for_withdrawal: data.data.reason_for_withdrawal,
              clearance_date: data.data.clearance_date,
            },
            application_id: "",
            student: data.data.student,
            approvals: data.data.approvals,
          });
          console.log("aplicant from context",applicantData)
          // toast.dismiss();
          // toast.success("Applicant Loaded!");
        }
      } catch (err: any) {

        console.log(err?.response?.data?.msg);
      }
    };
  
    fetchApplicantData();
  }, [user]);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLogged,
        setIsLogged,
        applicantData,
        setapplicantData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
