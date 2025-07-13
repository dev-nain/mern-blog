import { Route, Routes } from "react-router";
import { AnimatePresence } from "motion/react";

// Pages Imports
import Auth from "@/pages/Auth";
import NewStoryPage from "@/pages/new-story";
import HomePage from "./pages/Home";
import FollowingPage from "./pages/Following";
import StoriesPage from "./pages/Stories";
import SettingsPage from "./pages/Settings";

// Components Imports
import MainLayout from "@/components/Layout/main-layout";
import ProtectedRoute from "./components/Layout/protected-route";
import LibraryPage from "./pages/Library";
import ProfilePage from "./pages/Profile";

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="sign-up" element={<Auth type="signup" />} />
        <Route path="sign-in" element={<Auth type="signin" />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/me/following" element={<FollowingPage />} />
          <Route path="/me/lists" element={<LibraryPage />} />
          <Route path="/me/stories/:type" element={<StoriesPage />} />
          <Route path="/me/setting" element={<SettingsPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Route>
        <Route
          path="new-story"
          element={
            <ProtectedRoute>
              <NewStoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
