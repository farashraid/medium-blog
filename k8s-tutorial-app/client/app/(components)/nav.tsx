"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../auth/_context/provider";

function Nav() {
  const ctx = useContext(AuthContext);

  let navContent = (
    <section className="flex justify-between w-[13rem]">
      <li className="transition-all hover:transform hover:scale-110">
        <Link href="/auth/login">
          Log In
        </Link>
      </li>
      <li className="transition-all hover:transform hover:scale-110">
        <Link href="/auth/signup">
          Sign Up
        </Link>
      </li>
    </section>
  );

  const logoutHandler = async () => {
    ctx.setIsLoggedIn(false);
  };

  if (ctx.isLoggedIn) {
    navContent = (
      <section className="flex justify-between w-[13rem]">
        <li className="transition-all hover:transform hover:scale-110">
          <Link
            href="/"
            onClick={logoutHandler}
          >
            Log Out
          </Link>
        </li>
      </section>
    );
  }

  return (
    <nav className="w-full h-[5rem] text-xl z-10">
      <ul className="flex justify-between items-center w-full h-full">
        <li>
          <Link href="">Home</Link>
        </li>
        <section className="flex justify-between w-[13rem]">
          <li className="transition-all hover:transform hover:scale-110">
            <Link href="/auth/login">
              Log In
            </Link>
          </li>
          <li className="transition-all hover:transform hover:scale-110">
            <Link href="/auth/signup">
              Sign Up
            </Link>
          </li>
        </section>
      </ul>
    </nav>
  );
}

export default Nav;