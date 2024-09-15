import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { createClient } from "../../../utils/supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar isLogged userEmail={user?.email} />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 mt-10">Welcome to my SaaS!</h1>
          <p className="text-lg mb-6">
            It looks like you haven't set up your system yet. Shall we get
            started?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Section for Goals */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
              <p className="mb-4">
                There are no goals set yet. How about defining some to start
                achieving your objectives?
              </p>
              <Link
                href="/application/goals"
                className="text-indigo-400 hover:underline"
              >
                Set Goals
              </Link>
            </div>

            {/* Section for Plan */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Subscription Plan</h2>
              <p className="mb-4">
                You haven't selected a plan yet. Choose one to access all
                features.
              </p>
              <Link
                href="/application/subscribe"
                className="text-indigo-400 hover:underline"
              >
                Choose Plan
              </Link>
            </div>

            {/* Section for Profile Setup */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Set Up Profile</h2>
              <p className="mb-4">
                Customize your profile for a more complete experience.
              </p>
              <Link
                href="/application/profile"
                className="text-indigo-400 hover:underline"
              >
                Set Up Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
