 export default interface AuthContextType {
   user: any;
   setUser: React.Dispatch<React.SetStateAction<any>>;
   token: string | null;
   setToken: React.Dispatch<React.SetStateAction<string | null>>;
   isLogged: boolean;
   setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
   applicantData:any;
   setapplicantData: React.Dispatch<React.SetStateAction<any>>;
 }
