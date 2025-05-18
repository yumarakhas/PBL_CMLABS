"use client";

import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmployeeForm from "@/components/EmployeeForm";
import api from "@/lib/api";
import { createEmployee } from "@/lib/services/employee";

export default function AddEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  useEffect(() => {
    setTitle("Employee");
  }, [setTitle]);

  const handleAdd = async (formData: any) => {
    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") return;

        // Handle date
        if (value instanceof Date) {
          data.append(key, value.toISOString().split("T")[0]);
        }
        // Handle file (photo)
        else if (value instanceof File) {
          data.append(key, value);
        }
        // Handle number
        else if (typeof value === "number") {
          data.append(key, value.toString());
        }
        // Default: string
        else {
          data.append(key, value as string);
        }
      });

      await createEmployee(data);
      router.push("/admin/employee-database");
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Add Employee</h2>
      <EmployeeForm mode="add" onSubmit={handleAdd} />
    </div>
  );
}
