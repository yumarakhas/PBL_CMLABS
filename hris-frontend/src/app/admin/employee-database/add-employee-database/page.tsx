"use client";

import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmployeeForm from "@/components/EmployeeForm";
import api from "@/lib/api";
import { createEmployee } from "@/lib/services/employee";
import { buildEmployeeFormData } from "@/lib/utils/formData";

export default function AddEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  useEffect(() => {
    setTitle("Employee");
  }, [setTitle]);

  const handleAdd = async (formDataObj: any) => {
    try {
      const data = buildEmployeeFormData(formDataObj);

      for (const pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

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
