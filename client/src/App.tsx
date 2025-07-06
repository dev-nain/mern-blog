import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./Routes";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
