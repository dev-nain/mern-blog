import { useAuth } from "../../context/auth-context";
import { Link, Outlet } from "react-router";
import { Button, LinkButton } from "../Common/Button";
import { BellIcon, PanelsTopLeftIcon, PencilIcon } from "lucide-react";
import { ProfileDropdown } from "./profile-dropdown";
import { Sidebar } from "./sidebar";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const { isLoading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSidebarIconClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <header>
        <nav className="flex justify-between px-10 py-2 border-b border-b-gray-200">
          <div className="flex space-x-2">
            <Button
              onClick={handleSidebarIconClick}
              variant={"naked"}
              className="lg:hidden"
            >
              <PanelsTopLeftIcon className="w-5 h-5 text-zinc-900" />
            </Button>

            <AppLogo />
          </div>

          <ul className="flex items-center space-x-1">
            <li>
              <LinkButton
                to="/new-story"
                variant="naked"
                size="sm"
                className="hover:bg-transparent "
              >
                <PencilIcon size={14} className="mr-2" />
                Write
              </LinkButton>
            </li>
            {!user && (
              <>
                <li>
                  <LinkButton to="/sign-up" variant="secondary">
                    Sign up{" "}
                  </LinkButton>
                </li>
                <li>
                  <LinkButton to="/sign-in">Login</LinkButton>
                </li>
              </>
            )}

            {user && (
              <>
                <li>
                  <LinkButton to="/notification" variant={"naked"}>
                    <BellIcon className="size-5 text-gray-500" />
                  </LinkButton>
                </li>
                <li>
                  <ProfileDropdown user={user} />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="flex overflow-hidden h-[calc(100vh-3.5rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onClose={handleSidebarClose}
        />
        <div className="overflow-y-scroll w-full hide-scrollbar p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;

function LoadingScreen() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-100"></div>

      <img
        src="/logo.png"
        alt="Brand Logo"
        className="w-20 h-20 mb-6 animate-pulse"
      />

      <p className="mt-4 text-dark-grey text-sm animate-pulse">
        Loading, please wait...
      </p>
    </main>
  );
}

export function AppLogo() {
  return (
    <Link to="/" className="space-x-2 flex items-center font-gelasio ">
      <img src="/logo.png" alt="Brand Image" className="size-8" />
      <span className="text-zinc-800 font-bold tracking-widest">DevBlog</span>
    </Link>
  );
}
