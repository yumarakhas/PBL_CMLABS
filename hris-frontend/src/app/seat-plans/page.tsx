'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const seatPlans = [
  {
    title: "Free",
    price: "Rp 0",
    unit: "/14 days",
    description: "This package for unlimited employees",
  },
  {
    title: "Standard",
    price: "Rp 6.533",
    unit: "/user/month",
    description: "This package for 1-50 employees",
  },
  {
    title: "Premium",
    price: "Rp 15.867",
    unit: "/user/month",
    description: "This package for 51-100 employees",
  },
  {
    title: "Ultra",
    price: "Rp 19.867",
    unit: "/user/month",
    description: "This package for more than 100 employees",
  },
];

export default function SeatPlanPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center font-sans">
      <div className="mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            HRIS Pricing Plans
          </h1>
          <p className="text-[#595959] mb-4 text-sm md:text-base max-w-3xl mx-auto">
            Choose the plan that best suits your business! This HRIS offers both
            subscription and pay-as-you-go payment options, available in the
            following packages:
          </p>
          <div className="inline-flex rounded-xl overflow-hidden border border-gray-300 mb-6">
            <button
              onClick={() => router.push("/package-plans")}
              className={`px-6 py-2 font-medium ${
                pathname === "/package-plans"
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-[#7CA5BF] text-white hover:bg-[#5c8aa6]"
              }`}
            >
              Package
            </button>
            <button
              onClick={() => router.push("/seat-plans")}
              className={`px-6 py-2 font-medium ${
                pathname === "/seat-plans"
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-[#7CA5BF] text-white hover:bg-[#5c8aa6]"
              }`}
            >
              Seat
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-2 md:px-4">
          {seatPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl text-sm"
            >
              <div>
                <h2 className="text-lg font-bold text-[#595959] mb-2">
                  {plan.title}
                </h2>
                <p className="text-2xl font-semibold text-[#595959]">
                  {plan.price}{" "}
                  <span className="text-sm font-normal text-[#595959]">
                    {plan.unit}
                  </span>
                </p>
                <p className="text-[#595959] text-sm mt-2">{plan.description}</p>
              </div>
              <button
                onClick={() =>
                  router.push(
                    `/billing?plan=${encodeURIComponent(
                      plan.title
                    )}&price=${encodeURIComponent(
                      plan.price.replace(/[^\d]/g, "")
                    )}`
                  )
                }
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer mt-4"
              >
                Upgrade Package →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
