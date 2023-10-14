"use client";
import Link from "next/link";
import SignOut from "@/components/sign-out";
import { getServerSession, unstable_getServerSession } from "next-auth/next";

import React, { useEffect, useState } from "react";
const links = [
  { href: "/protected", label: "Protected" },
  { href: "/about", label: "About" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Navigation = () => {
  const [isUser, setIsUser] = useState(false);

  return (
    <nav className="ml-auto text-sm font-medium space-x-6">
      <div className="flex items-center flex-shrink-0 mr-6">
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

        <div className="text-sm sm:flex-grow">
          <Link href="/" className="block mt-4 sm:inline-block sm:mt-0 mr-4">
            Home
          </Link>

          {links.map(({ key, href, label }) => (
            <Link
              key={key}
              href={href}
              className="block mt-4 sm:inline-block sm:mt-0 mr-4"
            >
              {label}
            </Link>
          ))}
          {isUser ? (
            <button
              onClick={() => logout()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              LogOut {user.email}
            </button>
          ) : (
            <Link
              href="login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-teal-500 hover:bg-gray mt-4 sm:mt-0"
            >
              Login
            </Link>
          )}
        </div>
    </nav>
  );
};

export default Navigation;
