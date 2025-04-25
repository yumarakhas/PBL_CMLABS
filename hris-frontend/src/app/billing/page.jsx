"use client"

import React, { useState } from "react";

export default function CheckoutPage() {
  const [employees, setEmployees] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState("");
  const [teamSize, setTeamSize] = useState("0");

  const pricePerUser = billingPeriod ? 17000 : 0;
  const total = employees * pricePerUser;

  return (
    <div className="min-h-screen bg-[#D9D9D9] p-10 flex flex-col md:flex-row gap-8">
      {/* Left Side */}
      <div className="bg-white rounded-lg shadow-md p-6 flex-1">
        <h2 className="text-2xl font-semibold text-black mb-1">Premium</h2>
        <p className="text-sm font-semibold text-black mb-4">Upgrade to Premium</p>
        <a href="#" className="text-sm text-blue-600 underline mb-6 inline-block">Change plan</a>

        {/* Billing Period */}
        <h3 className="text-sm font-semibold mb-1 text-black">Billing Period</h3>
        <div className="flex gap-2 mb-6">
          <label className={`text-sm px-3 py-2 rounded border cursor-pointer ${
            billingPeriod === "single" ? "bg-gray-300 text-black border-gray-600" : "bg-white text-[#595959] border-gray-300"
          }`}>
            <input
              type="radio"
              name="billing"
              value="single"
              className="hidden"
              checked={billingPeriod === "single"}
              onChange={() => setBillingPeriod("single")}
            />
            Single Payment - Rp 17.000 / User
          </label>
          <label className={`text-sm px-3 py-2 rounded border cursor-pointer ${
            billingPeriod === "monthly" ? "bg-gray-300 text-black border-gray-600" : "bg-white text-[#595959] border-gray-300"
          }`}>
            <input
              type="radio"
              name="billing"
              value="monthly"
              className="hidden"
              checked={billingPeriod === "monthly"}
              onChange={() => setBillingPeriod("monthly")}
            />
            Monthly - Rp 17.000 / User
          </label>
        </div>

        {/* Size Matters */}
        <h3 className="text-sm font-semibold mb-1 text-black">Size Matters</h3>
        <p className="text-sm text-gray-600 mb-2">Choose the right fit for your team!</p>
        <div className="flex gap-6 mb-6">
          <label className="flex items-center space-x-2 cursor-pointer text-[#595959]">
            <input
              type="radio"
              name="teamSize"
              value="1-50"
              checked={teamSize === "1-50"}
              onChange={() => setTeamSize("1-50")}
              className="accent-blue-600"
            />
            <span>1 - 50</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer text-[#595959]">
            <input
              type="radio"
              name="teamSize"
              value="51-100"
              checked={teamSize === "51-100"}
              onChange={() => setTeamSize("51-100")}
              className="accent-blue-600"
            />
            <span>51 - 100</span>
          </label>
        </div>

        {/* Number of Employees */}
        <h3 className="text-sm font-semibold mb-1 text-black">Number of Employees</h3>
        <div className="flex items-center gap-4 mb-6 text-[#595959]">
          <button
            onClick={() => setEmployees(Math.max(0, employees - 1))}
            className="px-2 py-1 bg-gray-300 rounded text-[#595959]"
          >
            -
          </button>
          <span>{employees}</span>
          <button
            onClick={() => setEmployees(employees + 1)}
            className="px-2 py-1 bg-gray-300 rounded text-[#595959]"
          >
            +
          </button>
        </div>

        <button className="w-full bg-white text-black border border-black py-2 rounded font-semibold hover:bg-gray-200 transition">
          Continue to Payment
        </button>
      </div>

      {/* Right Side - Summary */}
      <div className="bg-blue-200 rounded-lg shadow-md p-6 w-full md:w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
        <ul className="text-sm text-black mb-4 space-y-2">
          <li className="flex justify-between">
            <span>Package</span>
            <span>Premium</span>
          </li>
          <li className="flex justify-between">
            <span>Billing Period</span>
            <span>{billingPeriod ? (billingPeriod === "single" ? "Single Payment" : "Monthly") : "-"}</span>
          </li>
          <li className="flex justify-between">
            <span>Team Size</span>
            <span>{teamSize}</span>
          </li>
          <li className="flex justify-between">
            <span>Number of Employees</span>
            <span>{employees}</span>
          </li>
          <li className="flex justify-between">
            <span>Price per User</span>
            <span>Rp {pricePerUser.toLocaleString()}</span>
          </li>
        </ul>

        <hr className="border-gray-400 my-4" />

        <div className="text-sm space-y-2 text-black mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {pricePerUser.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rp 0</span>
          </div>
          <hr className="border-gray-400 my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total at renewal</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition">
          Confirm and Upgrade
        </button>
      </div>
    </div>
  );
}
