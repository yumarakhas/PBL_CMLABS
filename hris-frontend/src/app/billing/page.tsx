"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Billing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const price = parseInt(searchParams.get("price") ?? "0");

  // Billing period options
  const billingPeriods = [
    { label: "1 Bulan", value: "1", months: 1 },
    { label: "6 Bulan", value: "6", months: 6 },
    { label: "12 Bulan", value: "12", months: 12 },
  ];

  // Employee count options
  const employeeOptions = [
    { label: "< 50", value: "<50", count: 50 },
    { label: "51 - 100", value: "51-100", count: 100 },
    { label: "101 - 150", value: "101-150", count: 150 },
    { label: "> 150", value: ">150", count: 151 },
  ];

  const [billingPeriod, setBillingPeriod] = useState("1");
  const [employeeRange, setEmployeeRange] = useState("<50");
  const [paymentType, setPaymentType] = useState("lunas"); // lunas or payg
  const [employees, setEmployees] = useState(1);

  // Calculate price per user (dummy logic, adjust as needed)
  const pricePerUser = price;
  const months = parseInt(billingPeriod);
  const total =
    paymentType === "lunas"
      ? employees * pricePerUser * months
      : employees * pricePerUser;

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col md:flex-row gap-8 font-sans">
      {/* Left Side */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
        <h2 className="text-2xl font-bold text-black mb-1">{plan}</h2>
        <p className="text-sm font-medium text-[#595959] mb-4">
          Upgrade to {plan}
        </p>
        <button
          onClick={() => router.push("/package-plans")}
          className="text-sm text-blue-600 underline mb-6 inline-block cursor-pointer"
        >
          Change plan
        </button>

        {/* Billing Period */}
        <h3 className="text-sm font-semibold mb-2 text-black">Billing Period</h3>
        <select
          className="w-full mb-6 border rounded px-3 py-2"
          value={billingPeriod}
          onChange={e => setBillingPeriod(e.target.value)}
        >
          {billingPeriods.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Employee Range */}
        <h3 className="text-sm font-semibold mb-2 text-black">Size Matters</h3>
        <select
          className="w-full mb-6 border rounded px-3 py-2"
          value={employeeRange}
          onChange={e => setEmployeeRange(e.target.value)}
        >
          {employeeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Number of Employees */}
        <h3 className="text-sm font-semibold mb-2 text-black">
          Number of Employees
        </h3>
        <div className="flex items-center gap-4 mb-6 text-[#595959]">
          <button
            onClick={() => setEmployees(Math.max(1, employees - 1))}
            className="px-2 py-1 bg-gray-300 rounded text-black"
          >
            -
          </button>
          <input
            type="number"
            value={employees}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                setEmployees(Math.max(1, value));
              }
            }}
            className="w-16 text-center px-2 py-1 rounded border border-gray-300 text-black appearance-none [appearance:textfield]"
            min={1}
          />

          <button
            onClick={() => setEmployees(employees + 1)}
            className="px-2 py-1 bg-gray-300 rounded text-black"
          >
            +
          </button>
        </div>

        <button
          onClick={() =>
            router.push(
              `/checkout?plan=${encodeURIComponent(plan ?? "")}` +
                `&period=${encodeURIComponent(billingPeriod)}` +
                `&employees=${encodeURIComponent(employees)}` +
                `&total=${encodeURIComponent(total)}` +
                `&paymentType=${encodeURIComponent(paymentType)}` +
                `&employeeRange=${encodeURIComponent(employeeRange)}`
            )
          }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer">
          Continue to Payment
        </button>
      </div>

      {/* Right Side - Summary */}
      <div className="bg-blue-100 rounded-xl shadow-lg p-6 w-full md:w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
        <ul className="text-sm text-black mb-4 space-y-2">
          <li className="flex justify-between">
            <span>Package</span>
            <span>{plan}</span>
          </li>
          <li className="flex justify-between">
            <span>Billing Period</span>
            <span>
              {
                billingPeriods.find(opt => opt.value === billingPeriod)?.label
              }
            </span>
          </li>
          <li className="flex justify-between">
            <span>Size Matters</span>
            <span>{employeeRange}</span>
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
            <span>
              Rp {paymentType === "lunas"
                ? (pricePerUser * employees * months).toLocaleString()
                : (pricePerUser * employees).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Rp 0</span>
          </div>
          <hr className="border-gray-400 my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>

        
      </div>
    </div>
  );
}
