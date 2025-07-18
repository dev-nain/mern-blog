import React, { useEffect, type ComponentType } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate("/sign-in");
      }
    }, [user, navigate]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
