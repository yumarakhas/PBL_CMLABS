"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import EmployeeForm from "@/components/EmployeeForm";
import { usePageTitle } from "@/context/PageTitleContext";

export default function EditEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("Employee");

    const fetchData = async () => {
      try {
        if (!id) throw new Error("No ID provided");

        const response = await axios.get(`/api/employees/${id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
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
        if (value === null || value === undefined || value === "") return;

        if (value instanceof Date) {
          data.append(key, value.toISOString().split("T")[0]);
        } else if (value instanceof File) {
          data.append(key, value);
        } else if (typeof value === "number") {
          data.append(key, value.toString());
        } else {
          data.append(key, value as string);
        }
      });

      await axios.put('http://127.0.0.1:8000/api/employee/${id}', data);
      router.push("/admin/employee-database");
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Employee not found.</p>;

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
