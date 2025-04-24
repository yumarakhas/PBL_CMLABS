"use client";
import { useEffect } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

export default function LetterManagementPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Letter Management");
  }, [setTitle]);

  return <div>Ini halaman Letter Management</div>;
}
