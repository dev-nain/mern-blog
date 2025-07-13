import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router";
import type { PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/sign-up");
  }

  return children;
};

export default ProtectedRoute;
