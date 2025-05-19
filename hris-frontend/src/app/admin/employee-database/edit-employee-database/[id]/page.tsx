"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import EmployeeForm from "@/components/EmployeeForm";
import { usePageTitle } from "@/context/PageTitleContext";
import { getEmployeeById, updateEmployee } from "@/lib/services/employee";

export default function EditEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const rawId = params?.id;
  const id =
    typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("Employee");

    const fetchData = async () => {
      try {
        if (!id) throw new Error("No ID provided");

        const response = await getEmployeeById(id);

        setInitialData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
        setErrorMessage("Failed to update employee. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setTitle]);

  const handleUpdate = async (formData: any) => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof Date) {
          data.append(key, value.toISOString().split("T")[0]);
        } else if (value instanceof File) {
          if (value.size > 0) {
            data.append(key, value);
          }
        } else {
          data.append(key, value ?? "");
        }
      });

      await updateEmployee(id, data);
      router.push("/admin/employee-database");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Edit Employee</h2>
      <EmployeeForm
        mode="edit"
        initialData={initialData}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
