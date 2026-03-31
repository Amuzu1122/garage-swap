import { Outlet, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  let [user, setUser] = useState<boolean>();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        setUser(true);
      } else {
        setUser(false);
      }
    }
    checkUser();
  }, []);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
