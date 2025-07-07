import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { User } from "../services/types";
import { getToken, removeToken, isTokenExpired } from "../services/session";
import { getProfile } from "../services/api";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getToken() && !isTokenExpired()) {
      getProfile()
        .then((res) => {
          setUser(res.user);
        })
        .catch(() => {
          setUser(null);
          removeToken();
        })
        .finally(() => setIsLoading(false));
    } else {
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
