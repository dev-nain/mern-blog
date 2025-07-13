import { Route, Routes } from "react-router";
import { AnimatePresence } from "motion/react";

// Pages Imports
import Auth from "@/pages/auth";
import NewStoryPage from "@/pages/new-story";

// Components Imports
import MainLayout from "@/components/Layout/MainLayout";

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<>Home Page</>} />

          <Route path="sign-up" element={<Auth type="signup" />} />
          <Route path="sign-in" element={<Auth type="signin" />} />
        </Route>
        <Route path="new-story" element={<NewStoryPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
