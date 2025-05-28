'use client';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

const packagePlans = [
  {
    title: "Free",
    subtitle: "Best for growing business",
    features: [
      "GPS-based attendance validation",
      "Employee data management",
      "Leave & time-off requests",
      "Overtime management (government regulations)",
      "Fixed work schedule management",
      "Automatic tax calculation"
    ]
  },
  {
    title: "Standard",
    subtitle: "Best for growing business",
    features: [
      "GPS-based attendance validation",
      "Employee data management",
      "Leave & time-off requests",
      "Overtime management (government regulations)",
      "Fixed work schedule management",
      "Automatic tax calculation"
    ]
  },
  {
    title: "Premium",
    subtitle: "Best for growing business",
    features: [
      "All Standard features",
      "Clock-in & clock-out attendance",
      "Fingerprint integration",
      "Employee document management",
      "Sick leave & time-off settings",
      "Shift management",
      "Comprehensive reports",
      "Overtime management (government & custom regulation)"
    ]
  },
  {
    title: "Ultra",
    subtitle: "Best for growing business",
    features: [
      "All Premium features",
      "Face Recognition",
      "Automated check-out attendance",
      "Employee turnover dashboard",
      "Custom dashboard for statistics & analysis"
    ]
  }
];

export default function PackagePlanPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 font-sans">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
          HRIS Pricing Plans
        </h1>
          <p className="text-[#595959] mb-4 text-sm md:text-base max-w-3xl mx-auto">
            Choose the plan that best suits your business! This HRIS offers both
            subscription and pay-as-you-go payment options, available in the
            following packages:
          </p>

        {/* Tabs */}
        <div className="inline-flex rounded-xl overflow-hidden border border-gray-300 mb-10">
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
              pathname === "/package-plans/seat-plans"
                ? "bg-[#1E3A5F] text-white"
                : "bg-[#7CA5BF] text-white hover:bg-[#5c8aa6]"
            }`}
          >
            Seat
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {packagePlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl text-sm"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-700">{plan.title}</h3>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/seat-plans")}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
              >
                Select a Package →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
