"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const packagePlans = [
  { title: "Free Trial", price: 0 },
  { title: "Starter", price: 500000 },
  { title: "Growth", price: 1800000 },
  { title: "Pro", price: 3600000 },
  { title: "Enterprise", price: 7200000 },
];

export default function CheckoutPage() {
  const [plan, setPlan] = useState("Basic");
  const [price, setPrice] = useState(0);
  const [branches, setBranches] = useState(0);
  const [addonEmployees, setAddonEmployees] = useState(0);
  const [companies, setCompanies] = useState({ name: "", email: "", phone: "" });
  const [total, setTotal] = useState(0);

  const [countdown, setCountdown] = useState(24 * 60 * 60); 
  const router = useRouter();
  const searchParams = useSearchParams();

useEffect(() => {
  setPlan(searchParams.get("plan") ?? "Basic");
  setPrice(parseInt(searchParams.get("price") ?? "0"));
  setBranches(parseInt(searchParams.get("branches") ?? "0"));
  setAddonEmployees(parseInt(searchParams.get("addonEmployees") ?? "0"));
  setTotal(parseInt(searchParams.get("total") ?? "0"));

  // Fetch company from API
  fetch("http://localhost:8000/api/companies")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCompanies({
          name: data[0].name,
          email: data[0].email,
          phone: data[0].head_office_phone,
        });
      }
    })
    .catch((err) => {
      console.error("Failed to fetch company data", err);
      setCompanies({
        name: "N/A",
        email: "N/A",
        phone: "N/A",
      });
    });
}, [searchParams]);


  const basePrice = packagePlans.find((p) => p.title === plan)?.price ?? 0;
  const branchPrice = branches * 50000;
  const employeePrice = addonEmployees * 5000;
  const subtotal = basePrice + branchPrice + employeePrice;
  const tax = subtotal * 0.1;
  const totalFinal = subtotal + tax;

  const handleClose = () => {
    const selectedPlan = packagePlans.find((p) => p.title === plan);
    const price = selectedPlan?.price ?? 0;

    const params = new URLSearchParams({
      plan,
      price: price.toString(),
    });

    router.push(`/checkout?${params.toString()}`);
  };

  const handlePayment = () => {
    alert("Pembayaran berhasil! Anda akan diarahkan ke halaman status.");
    router.push("/user/subscription-status");
  };

  const formatCountdown = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-md p-6">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold text-center mb-2">Checkout Pembayaran</h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Silakan selesaikan pembayaran Anda
        </p>

        <div className="bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md p-4 mb-4 text-center">
          <p className="font-medium">Waktu Tersisa:</p>
          <p className="text-lg font-bold">{formatCountdown(countdown)}</p>
        </div>

        <div className="bg-gray-50 border rounded-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">Ringkasan Pesanan</h2>
          <ul className="text-sm text-black space-y-1">
            <li className="flex justify-between">
              <span>Package</span>
              <span> {plan}</span>
            </li>
            <li className="flex justify-between">
              <span>Company Name</span>
              <span> {companies.name}</span>
            </li>
            <li className="flex justify-between">
              <span>Email</span>
              <span> {companies.email}</span>
            </li>
            <li className="flex justify-between">
              <span>Phone Number</span>
              <span> {companies.phone}</span>
            </li>
            <li className="flex justify-between">
              <span>Base Price</span>
              <span>
                 Rp {basePrice.toLocaleString("id-ID")}
              </span>
            </li>
            {branches > 0 && (
              <li className="flex justify-between">
                <span>Add Branch</span>
                <span>
                   Rp {branchPrice.toLocaleString("id-ID")}
                </span>
              </li>
            )}
            {addonEmployees > 0 && (
              <li className="flex justify-between">
                <span>Add Employee</span>
                <span>
                   Rp {employeePrice.toLocaleString("id-ID")}
                </span>
              </li>
            )}
            <li className="flex justify-between">
              <span>Tax (10%)</span>
              <span> Rp {tax.toLocaleString("id-ID")}</span>
            </li>
            <li className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span> Rp {totalFinal.toLocaleString("id-ID")}</span>
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Payment
        </button>
      </div>
    </div>
  );
}
