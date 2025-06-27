"use client";

import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EmployeeForm from "@/components/EmployeeForm";
import { createEmployee } from "@/lib/services/employee";
import { buildEmployeeFormData } from "@/lib/utils/formData";

export default function AddEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  useEffect(() => {
    setTitle("Add New Employee");
  }, [setTitle]);

  const handleAdd = async (formDataObj: any) => {
    try {
      const dataToSend = buildEmployeeFormData(formDataObj);

      console.log("Sending data to server...");
      if (dataToSend instanceof FormData) {
        for (const pair of dataToSend.entries()) {
          console.log(pair[0], pair[1]);
        }
      }

      const response = await createEmployee(dataToSend);
      console.log("Success response:", response.data);

      alert("Employee added successfully!");
      router.push("/admin/employee-database");
    } catch (error: any) {
      console.error("Failed to add employee:", error);

      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        if (error.response.status === 422) {
          const validationErrors = Object.values(error.response.data.errors).flat().join('\n');
          errorMessage = `Validation failed:\n${validationErrors}`;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      } else {
        errorMessage = error.message;
      }

      alert(`Failed to add employee:\n${errorMessage}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Add New Employee</h2>
      <EmployeeForm mode="add" onSubmit={handleAdd} />
    </div>
  );
}
