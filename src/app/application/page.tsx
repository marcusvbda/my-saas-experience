import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { createClient } from "../../../utils/supabase/server";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar isLogged />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <small className="text-lg">Welcome, {user?.email}</small>
      </main>
      <Footer />
    </div>
  );
}
