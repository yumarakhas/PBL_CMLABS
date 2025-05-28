"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const [countdown, setCountdown] = useState(24 * 60 * 60);
  const [plan, setPlan] = useState("Basic");
  const [pricePerUser, setPricePerUser] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState("1");
  const [employees, setEmployees] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const billingPeriods = [
    { label: "1 Bulan", value: "1" },
    { label: "6 Bulan", value: "6" },
    { label: "12 Bulan", value: "12" },
  ];

  useEffect(() => {
    const planParam = searchParams.get("plan");
    const priceParam = searchParams.get("price");
    const totalParam = searchParams.get("total");
    const periodParam = searchParams.get("period");
    const employeeParam = searchParams.get("employees");

    // Set parameters with default values if not present in URL
    setPlan(planParam || "Basic");
    setBillingPeriod(periodParam || "1");
    setEmployees(employeeParam ? parseInt(employeeParam) : 1);

    // Calculate price per user if "price" is missing
    if (priceParam) {
      setPricePerUser(parseInt(priceParam));
    } else if (totalParam && periodParam && employeeParam) {
      const total = parseInt(totalParam);
      const period = parseInt(periodParam);
      const employees = parseInt(employeeParam);
      setPricePerUser(total / (employees * period));
    }
  }, [searchParams]);

  const total = pricePerUser * employees * parseInt(billingPeriod);

  const handlePayment = () => {
    alert("Pembayaran berhasil! Anda akan diarahkan ke halaman status.");
    router.push("/user/subscription-status");
  };

  const handleClose = () => {
    router.push(
      `/billing?plan=${encodeURIComponent(plan)}&price=${encodeURIComponent(pricePerUser)}`
    );
  };

  const formatCountdown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
          aria-label="Close"
        >
          x
        </button>

        <h1 className="text-2xl font-bold text-center mb-2">Checkout Pembayaran</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Silakan selesaikan pembayaran Anda</p>

        <div className="bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md p-4 mb-4 text-center">
          <p className="font-medium">Waktu Tersisa:</p>
          <p className="text-lg font-bold">{formatCountdown(countdown)}</p>
        </div>

        {/* Ringkasan Pesanan */}
        <div className="bg-gray-50 border rounded-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-black">Ringkasan Pesanan</h2>

          <div className="flex justify-between text-sm mb-1 text-black">
            <span>Paket:</span>
            <span>{plan}</span>
          </div>

          <div className="flex justify-between text-sm mb-1 text-black">
            <span>Periode:</span>
            <span>
              {billingPeriods.find((opt) => opt.value === billingPeriod)?.label || "Single"}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-1 text-black">
            <span>Jumlah Karyawan:</span>
            <span>{employees}</span>
          </div>

          <div className="flex justify-between text-sm mb-1 text-black">
            <span>Harga per Karyawan:</span>
            <span>Rp {pricePerUser.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm font-bold pt-2 border-t mt-2 text-black">
            <span>Total:</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Bayar dengan Xendit
        </button>
      </div>
    </div>
  );
}
