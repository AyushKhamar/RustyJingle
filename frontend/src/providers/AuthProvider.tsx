import React, { ReactNode, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { axiosInstance } from "@/lib/axios.ts";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore.ts";
// todo since we are wrapping this component around all the other, each request will go through this and then will be sent to the backend
const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};
const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) await checkAdminStatus();
      } catch (error) {
        updateApiToken(null);
        console.log("some error in auth provider", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [getToken]);
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="text-emerald-500 size-8 animate-spin"></Loader>
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
