import { useAuth } from "../../context/auth-context";
import { Link, Outlet } from "react-router";
import { LinkButton } from "../Common/Button";
import { PencilIcon } from "lucide-react";

const MainLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <header>
        <nav className="flex justify-between px-[5vw] md:px-[7vw] py-2 border-b border-b-grey">
          <Link to="/">
            <img src="/logo.png" alt="Brand Image" className="size-8" />
          </Link>
          <ul className="flex items-center space-x-2">
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
            <li>
              <LinkButton to="/sign-up" variant="secondary">
                Sign up{" "}
              </LinkButton>
            </li>
            <li>
              <LinkButton to="/sign-in">Login</LinkButton>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

function LoadingScreen() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-grey-50 to-indigo-100"></div>

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
