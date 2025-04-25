import React from "react";
import Link from "next/link";

const seatPlans = [
  {
    title: "Basic",
    price: "Rp 10.000",
    unit: "/user/month",
    description: "Deskripsi"
  },
  {
    title: "Basic",
    price: "Rp 10.000",
    unit: "/user/month",
    description: "Deskripsi"
  },
  {
    title: "Basic",
    price: "Rp 10.000",
    unit: "/user/month",
    description: "Deskripsi"
  },
  {
    title: "STANDARD",
    price: "Rp 15.000",
    unit: "/user/month",
    description: "This package for 1 until 50 employee"
  },
  {
    title: "PREMIUM",
    price: "Rp 17.000",
    unit: "/user/month",
    description: "This package for 51 until 100 employee"
  },
  {
    title: "ULTRA",
    price: "Rp 19.000",
    unit: "/user/month",
    description: "Deskripsi"
  }
];

export default function SeatPlanPage() {
  return (
    <div className="min-h-screen bg-[#D9D9D9] px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">HRIS Pricing Plans</h1>
          <p className="text-[#595959] mb-6 text-sm md:text-base max-w-3xl mx-auto">
            Choose the plan that best suits your business! This HRIS offers both subscription and pay-as-you-go payment options, available in the following packages:
          </p>
          <div className="inline-flex rounded-xl overflow-hidden border border-gray-300">
            <Link href="/packagePlans">
              <button className="bg-[#1E3A5F] text-white px-6 py-2 font-medium text-sm md:text-base">Package</button>
            </Link>
            <button className="bg-[#7CA5BF] text-white px-6 py-2 font-medium text-sm md:text-base">Seat</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {seatPlans.map((plan, index) => (
            <div
              key={index}
              className="rounded-md p-6 shadow-md bg-[#B4D0DC] transform transition duration-300 hover:bg-[#7CA5BF] hover:scale-105 hover:shadow-lg cursor-pointer">
              <div>
                <h2 className="text-lg font-bold text-[#595959] mb-2">{plan.title}</h2>
                <p className="text-2xl font-semibold text-[#595959]">
                  {plan.price}{" "}
                  <span className="text-sm font-normal text-[#595959]">{plan.unit}</span>
                </p>
                <p className="text-[#595959] text-sm mt-2">{plan.description}</p>
              </div>
              <button className="mt-6 w-full bg-[#577A9E] text-white py-2 rounded-md font-medium hover:bg-[#1E3A5F] transition">
                Upgrade Package →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
