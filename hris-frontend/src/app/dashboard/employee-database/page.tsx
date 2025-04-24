"use client";
import { useEffect } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

export default function EmployeeDatabasetPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Employee Database");
  }, [setTitle]);

  return <div>Ini halaman Employee Database</div>;
}
