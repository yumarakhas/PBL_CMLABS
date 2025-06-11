"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Company = {
  name: string;
  email: string;
  head_office_phone: string;
  head_office_phone_backup: string;
  head_office_address: string;
  description: string;
};

export default function AdminProfile() {
  const [company, setCompany] = useState<Company | null>(null);

  // Dummy payment data
  const payments = [
    {
      id: 1,
      orderDate: "2025-05-01",
      package: "Pro",
      period: "6 months",
      total: "Rp 3.600.000",
      status: "Unpaid",
    },
    {
      id: 2,
      orderDate: "2025-03-31",
      package: "Starter",
      period: "1 month",
      total: "Rp 500.000",
      status: "Paid",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    import("@/lib/api").then(({ default: api }) => {
      api
        .get("/companies/1")
        .then((res) => setCompany(res.data))
        .catch((error) => {
          console.error("Failed to fetch company:", error);
        });
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Admin Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Admin Profile</h1>
        <p className="text-gray-600">
          Details about your subscription and company
        </p>
      </div>

      {/* Subscription Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
        <p className="text-sm text-gray-600 mb-1">Current Package:</p>
        <p className="font-bold text-blue-600">Free Trial</p>
        <p className="text-sm mb-4">
          Complete HR management with document system
        </p>
        <button
          onClick={() => router.push("/package-plans")}
          className="px-2 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
        >
          Change Package
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <table className="w-full text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">No.</th>
              <th className="p-2">Date</th>
              <th className="p-2">Package</th>
              <th className="p-2">Period</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item) => (
              <tr key={item.id} className="even:bg-gray-100">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.orderDate}</td>
                <td className="p-2">{item.package}</td>
                <td className="p-2">{item.period}</td>
                <td className="p-2">{item.total}</td>
                <td className="p-2 text-sm">
                  <span
                    className={
                      item.status === "Paid" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2">
                  {item.status === "Unpaid" && (
                    <button className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition">
                      Bayar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Company Information</h2>
        </div>
        {company ? (
          <div className="space-y-1 text-sm">
            <p>
              <strong>Name:</strong> {company.name}
            </p>
            <p>
              <strong>Email:</strong> {company.email}
            </p>
            <p>
              <strong>Phone:</strong> {company.head_office_phone}
            </p>
            <p>
              <strong>Backup Phone:</strong> {company.head_office_phone_backup}
            </p>
            <p>
              <strong>Address:</strong> {company.head_office_address}
            </p>
            <p>
              <strong>Description:</strong> {company.description}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Company data not loaded yet.</p>
        )}
      </div>
    </div>
  );
}
