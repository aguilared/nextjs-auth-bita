import Link from "next/link";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import axios from "axios";
const links = [
  { href: "/bitacora", label: "AdminBitacoras" },
  { href: "/bitacora/bitacoras", label: "ListBitacoras" },
  { href: "/bitacora/bita_events/bitaEventsAdmin", label: "AdminBitaEventos" },
  { href: "/bitacora/bita_events/bitaEvents", label: "ListBitaEventos" },
  { href: "/bitacora/bita_events/bitaEventsCard", label: "ListBitaEventsCard" },
  { href: "/bitacora/tipo_events/", label: "AdminTipoEvents" },
  { href: "/bitacora/events/", label: "AdminEvents" },
  { href: "/users", label: "Users" },
  { href: "/dashboard", label: "Dasho" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => {
  const router = useRouter();

  const { isUser, loadUser, clearUser, user } = useUser(); //to Global
  console.log("USER", user);
  const logout = async () => {
    console.error("HacendoLogout");
    try {
      await axios.get("/api/auth/logout");
      clearUser();
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="flex rounded items-center justify-between flex-wrap bg-gray-700 p-2 py-1">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Person Bitacora
        </span>
      </div>
      <div className="block sm:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="w-full block flex-grow sm:flex sm:items-center sm:w-auto">
        <div className="text-sm sm:flex-grow">
          <Link
            href="/"
            className="block mt-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4"
          >
            Home
          </Link>

          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              className="block mt-4 sm:inline-block sm:mt-0 text-white hover:text-white mr-4"
            >
              {label}
            </Link>
          ))}
          {isUser ? (
            <button
              onClick={() => logout()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              LogOut {user.email}
            </button>
          ) : (
            <Link
              href="login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
