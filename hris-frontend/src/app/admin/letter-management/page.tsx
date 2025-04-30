"use client";
import { useEffect, useState } from "react";
import { usePageTitle } from "@/context/PageTitleContext";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
// import api from "@/lib/api"; implementasi backend nanti

interface Letter {
  id: number;
  title: string;
  type: string;
  content: string;
}

export default function LetterManagementPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    setTitle("Letter Management");

    // DATA DUMMY (sementara, ganti ke API nanti)
    setLetters([
      {
        id: 1,
        title: "Budi Santoso",
        type: "employment contract",
        content:
          "Surat Resmi Dari Kementerian Lingkungan",
      },
      {
        id: 2,
        title: "Andi Baskara",
        type: "employment contract",
        content:
          "Penghargaan Bakti Angkasa",
      },
      {
        id: 3,
        title: "Suyono",
        type: "employment contract",
        content:
          "Sertifikasi Google Loooker Studio",
      },
    ]);

    // Kalau mau fetch API nanti:
    // fetchLetters();
  }, [setTitle]);

  // integrasi ke backend
  // const fetchLetters = async () => {
  //   try {
  //     const res = await api.get("/api/letters");
  //     setLetters(res.data); // sesuaikan sesuai response backend
  //   } catch (error) {
  //     console.error("Gagal fetch surat:", error);
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Header + Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">List Of Letter</h2>
          <div className="flex gap-4">
            <div className="flex items-center border rounded-lg px-2 py-1 bg-white">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Employee"
                className="outline-none text-sm"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-[#D9D9D9] text-sm">
              <FiFilter /> Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-[#D9D9D9] text-sm">
              <FiDownload /> Export
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1 bg-[#BA3C54] text-white rounded-md text-sm hover:opacity-90"
              onClick={() => router.push("/dashboard/letter-management/add-letter")}
            >
              <FaPlus /> Add Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="pt-6 overflow-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-3 py-2">No.</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Type Of Letter</th>
                <th className="px-3 py-2">Content</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter, index) => (
                <tr
                  key={letter.id}
                  className="text-center border-t hover:bg-gray-50"
                >
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{letter.title}</td>
                  <td className="px-3 py-2">{letter.type}</td>
                  <td className="px-3 py-2">{letter.content}</td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FiTrash2 />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Dummy */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <label>
              Showing{" "}
              <select className="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white text-[#1C3D5A] border-[#1C3D5A]">&lt;</button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white">1</button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white">2</button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white text-[#1C3D5A] border-[#1C3D5A]">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
