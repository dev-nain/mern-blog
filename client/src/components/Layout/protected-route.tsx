import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/sign-up");
    }
  }, [user, navigate]);
  if (!user) {
    return null; // or a loading spinner
  }
  return children;
};
export default ProtectedRoute;
