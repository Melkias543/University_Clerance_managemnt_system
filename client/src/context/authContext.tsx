"use client";
import { getData } from "@/Api/applyForClearanceApi";
import AuthContextType from "@/types/context";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
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
  

const router = useRouter()
  useEffect(() => {
    if (!user?.userId) return;
    // console.log("from context",user.role)
    const fetchApplicantData = async () => {
      try {
        console.log("user?.userId", user?.userId);
        const data = await getData(user.userId);
        if (data) {
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
        }
      } catch (err: any) {
        console.log(err?.response?.data?.msg);
      }
    };

    fetchApplicantData();
  }, [user?.userId]);
  
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setToken(null);
  setapplicantData(null);
  setUser(null);
   
  router.push("/auth/login");
};

   
  
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
        logout,
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
