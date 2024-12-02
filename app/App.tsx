import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Cookies from "universal-cookie";
import { useUserContext } from "./context/useUserContext";
import { jwtDecode } from "jwt-decode";
import User from "./types/User";
function App({ children }: { children: React.ReactNode }) {
  const cookies = new Cookies();
  const { setUser } = useUserContext();

  useEffect(() => {
    const authToken = cookies.get("auth-token");
    if (authToken) {
      const decodedUser =   jwtDecode(authToken) as User
      console.log(decodedUser);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);
  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
}

export default App;