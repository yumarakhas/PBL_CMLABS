"use client"; // WAJIB kalau pakai useRouter dan usePathname

import { useRouter, usePathname } from "next/navigation";
import React from "react";

const packagePlans = [
  {
    title: "Standard",
    subtitle: "Best for growing business",
    features: [
      "List fitur",
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

export default function TabSwtch() {
  const router = useRouter(); 
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#D9D9D9] px-6 py-10 font-sans">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
          HRIS Pricing Plans
        </h1>
        <p className="text-[#595959] mb-6">
          Choose the plan that best suits your business! This HRIS offers both subscription and pay-as-you-go payment options, available in the following packages:
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
              pathname === "/seat-plans"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packagePlans.map((plan, idx) => (
            <div
              key={idx}
              className="rounded-md p-6 shadow-md bg-[#B4D0DC] transform transition duration-300 hover:bg-[#7CA5BF] hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#595959] mb-1">{plan.title}</h2>
              <p className="text-sm text-[#595959] mb-4">{plan.subtitle}</p>
              <ul className="text-[#595959] text-sm mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#2D8EFF] mr-2 mt-1">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/seat-plans")}
                className="w-full bg-[#577A9E] text-white py-2 rounded-md font-medium hover:bg-[#1E3A5F] transition cursor-pointer"
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
