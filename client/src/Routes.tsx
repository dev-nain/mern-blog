import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/auth";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<>Home Page</>} />
          <Route>
            <Route path="sign-up" element={<Auth type="signup" />} />
            <Route path="sign-in" element={<Auth type="signin" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
