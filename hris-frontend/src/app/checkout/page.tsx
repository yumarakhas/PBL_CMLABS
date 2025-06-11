"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") ?? "Starter";
  const price = parseInt(searchParams.get("price") ?? "0");

  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [branches, setBranches] = useState(0);
  const [addonEmployees, setAddonEmployees] = useState(0);

  const branchPrice = 50000;
  const employeeAddonUnit = 5000;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const employeePerUnit = 1; // karena di figma langsung 40 × 5.000

  const subtotal =
    price + branches * branchPrice + addonEmployees * employeeAddonUnit;
  const tax = 0.1 * subtotal;
  const total = subtotal + tax;

  // Fetch data perusahaan dari API Laravel
  useEffect(() => {
    import("@/lib/api").then(({ default: api }) => {
      api
        .get("/companies")
        .then((res) => {
          // kalau cuma satu data di DB, ambil data[0]
          const companyData = Array.isArray(res.data)
            ? res.data[0] || {}
            : res.data || {};
          setCompany({
            name: companyData.name || "",
            email: companyData.email || "",
            phone: companyData.head_office_phone || "",
          });
        })
        .catch((err) => console.error("Failed to fetch company:", err));
    });
  }, []);

  // Tambahkan daftar packagePlans untuk deskripsi dinamis
  const packagePlans = [
    {
      title: "Free Trial",
      features: ["14 days access", "Up to 25 employees", "Head Office only"],
    },
    {
      title: "Starter",
      features: ["1 month access", "Up to 50 employees", "Head Office only"],
    },
    {
      title: "Growth",
      features: [
        "3 month access",
        "Up to 250 employees",
        "Head Office with 2 branch offices",
      ],
    },
    {
      title: "Pro",
      features: [
        "6 month access",
        "Up to 500 employees",
        "Head Office with 3 branch offices",
      ],
    },
    {
      title: "Enterprise",
      features: [
        "12 month access",
        "Up to 1000 employees",
        "Head Office with 4 branch offices",
      ],
    },
  ];

  // Ambil fitur dari package yang dipilih
  const selectedPlan = packagePlans.find(
    (p) => p.title.toLowerCase() === plan.toLowerCase()
  );
  const featureDesc = selectedPlan
    ? `Upgrade to ${plan} for ${selectedPlan.features
        .map((f, idx) => {
          if (idx === selectedPlan.features.length - 1 && idx !== 0) {
            return "and " + f;
          }
          return f;
        })
        .join(", ")
        .replace(", and", " and")}`
    : `Upgrade to ${plan}`;

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col md:flex-row gap-8 font-sans">
      {/* LEFT: Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{plan}</h2>
        <p className="text-sm font-semibold text-gray-600 mb-1">
          {featureDesc}
        </p>
        <button
          onClick={() => router.push("/package-plans")}
          className="text-sm text-blue-600 underline mb-6 inline-block cursor-pointer"
        >
          Change plan
        </button>

        {/* Company Info */}
        <label className="block text-sm font-semibold text-black mb-1">
          Company Name
        </label>
        <input
          type="text"
          value={company.name}
          readOnly
          className="w-full mb-4 border rounded px-3 py-2 bg-gray-100 text-black"
        />
        <label className="block text-sm font-semibold text-black mb-1">
          Email
        </label>
        <input
          type="email"
          value={company.email}
          readOnly
          className="w-full mb-4 border rounded px-3 py-2 bg-gray-100 text-black"
        />
        <label className="block text-sm font-semibold text-black mb-1">
          Phone Number
        </label>
        <input
          type="text"
          value={company.phone}
          readOnly
          className="w-full mb-4 border rounded px-3 py-2 bg-gray-100 text-black"
        />

        {/* Add Branch */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label className="block text-sm font-semibold text-black">
              Add Branch
            </label>
            <p className="text-xs text-gray-500">Rp 50.000/branch</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBranches(Math.max(0, branches - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <input
              type="number"
              min={0}
              value={branches}
              onChange={(e) =>
                setBranches(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-16 text-center border rounded px-2 py-1"
            />
            <button
              onClick={() => setBranches(branches + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Add Employees */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <label className="block text-sm font-semibold text-black">
              Add Employees
            </label>
            <p className="text-xs text-gray-500">Rp 5.000/user</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddonEmployees(Math.max(0, addonEmployees - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <input
              type="number"
              min={0}
              value={addonEmployees}
              onChange={(e) =>
                setAddonEmployees(Math.max(0, parseInt(e.target.value) || 0))
              }
              className="w-16 text-center border rounded px-2 py-1"
            />
            <button
              onClick={() => setAddonEmployees(addonEmployees + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            router.push(
              `/payment?plan=${plan}&price=${total}&branches=${branches}&addonEmployees=${addonEmployees}`
            )
          }
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Continue to Payment
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <div className="bg-blue-100 rounded-xl shadow-lg p-6 w-full md:w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
        <ul className="text-sm text-black mb-4 space-y-2">
          <li className="flex justify-between">
            <span>Package</span>
            <span> {plan}</span>
          </li>
          <li className="flex justify-between">
            <span>Company Name</span>
            <span> {company.name}</span>
          </li>
          <li className="flex justify-between">
            <span>Email</span>
            <span> {company.email}</span>
          </li>
          <li className="flex justify-between">
            <span>Phone Number</span>
            <span> {company.phone}</span>
          </li>
          <li className="flex justify-between">
            <span>Base Price</span>
            <span> Rp {price.toLocaleString()}</span>
          </li>
          <li className="flex justify-between">
            <span>Add Branch</span>
            <span> {branches} × 50.000</span>
          </li>
          <li className="flex justify-between">
            <span>Add Employee</span>
            <span> {addonEmployees} × 5.000</span>
          </li>
        </ul>

        <hr className="border-gray-400 my-4" />

        <div className="text-sm space-y-2 text-black mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>
              Rp{" "}
              {(
                (price +
                  branches * branchPrice +
                  addonEmployees * employeeAddonUnit) *
                0.1
              ).toLocaleString()}
            </span>
          </div>
          <hr className="border-gray-400 my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total at renewal</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
