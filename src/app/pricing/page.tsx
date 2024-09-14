"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getPrincingData } from "./actions";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number | null;
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPrincingData();
        if (!res.ok) {
          throw new Error("Failed to fetch pricing data");
        }
        setPlans(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6">Pricing Plans</h2>
          {loading && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="spinner"></div>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full"
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-lg mb-4">
                  {plan.price ? `$${plan.price}/month` : "Contact us"}
                </p>
                <p className="mb-4">{plan.description}</p>
                <Link
                  href={plan.price ? "/auth/ssignup" : "/contact"}
                  className="px-6 py-3 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-500 transition"
                >
                  {plan.price ? "Sign Up" : "Contact Us"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
