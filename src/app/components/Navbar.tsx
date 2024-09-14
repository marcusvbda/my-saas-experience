import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ isLogged = false }: any) {
  return (
    <header className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href={isLogged ? "/application" : "/"} className="cursor-pointer">
          <h1 className="text-2xl font-bold">My SaaS</h1>
        </Link>
        <ul className="flex space-x-4">
          {!isLogged && (
            <>
              <li>
                <Link href="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-indigo-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-indigo-400">
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/auth/login" className="hover:text-indigo-400">
              {isLogged ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
