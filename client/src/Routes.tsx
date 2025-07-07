import { Route, Routes } from "react-router";
import Auth from "./pages/auth";
import MainLayout from "./components/Layout/MainLayout";
import { AnimatePresence } from "motion/react";

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<>Home Page</>} />
          <Route>
            <Route path="sign-up" element={<Auth type="signup" />} />
            <Route path="sign-in" element={<Auth type="signin" />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
