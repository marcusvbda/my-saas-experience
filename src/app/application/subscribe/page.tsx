"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getPrincingData } from "@/app/pricing/actions";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number | null;
}

const Subscribe = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [step, setStep] = useState(1); // Step 1 = Select Plan, Step 2 = Payment

  const router = useRouter();

  // Fetch pricing plans from the database
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true); // Set loading to true while fetching plans
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

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setStep(2); // Move to the payment step
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while processing payment
    setError(null);
    setSuccessMessage(null);

    if (!creditCard || !expiryDate || !cvc) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      setRedirecting(true);
      setTimeout(() => {
        setSuccessMessage("Payment successful, subscription activated!");
        setTimeout(() => {
          router.push("/application");
        }, 2000);
      }, 1500);
    } catch (error) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar isLogged />
      <main className="flex-grow container mx-auto p-4">
        {step === 1 ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 mt-10">
              Choose Your Plan
            </h1>
            {loading && (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="spinner"></div>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col md:flex-row gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer w-full"
                  onClick={() => handlePlanSelect(plan)}
                >
                  <h2 className="text-2xl font-bold mb-4">{plan.name} Plan</h2>
                  <p className="text-lg mb-4">
                    {plan.price ? `$${plan.price}/month` : "Contact us"}
                  </p>
                  <p className="mb-4">{plan.description}</p>
                  <button className="bg-indigo-600 py-2 px-4 rounded hover:bg-indigo-500">
                    {loading ? (
                      <div className="spinner !size-4"></div>
                    ) : (
                      "Select Plan"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Payment for {selectedPlan?.name}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}

            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label htmlFor="creditCard" className="block mb-2">
                  Credit Card Number
                </label>
                <input
                  type="text"
                  id="creditCard"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="expiryDate" className="block mb-2">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cvc" className="block mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="w-full p-2 bg-gray-700 rounded"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-600 py-2 px-4 rounded hover:bg-gray-500"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className={`bg-indigo-600 py-2 px-4 rounded flex items-center justify-center ${
                    loading || redirecting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={loading || redirecting}
                >
                  {loading || redirecting ? (
                    <>
                      <div className="spinner !size-6 mr-2"></div>
                      {redirecting ? "Redirecting..." : "Processing..."}
                    </>
                  ) : (
                    "Submit Payment"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Subscribe;
