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

interface LetterType {
  id: number;
  title: string;
  type: string;
  content: string;
}

export default function LetterManagementPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = letters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentLetters = letters.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    setTitle("Letter Management");

    // DATA DUMMY (sementara, ganti ke API nanti)
    setLetters([
      {
        id: 1,
        title: "Budi Santoso",
        type: "employment contract",
        content: "Surat Resmi Dari Kementerian Lingkungan",
      },
      {
        id: 2,
        title: "Andi Baskara",
        type: "employment contract",
        content: "Penghargaan Bakti Angkasa",
      },
      {
        id: 3,
        title: "Suyono",
        type: "employment contract",
        content: "Sertifikasi Google Loooker Studio",
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

  const [searchTerm, setSearchTerm] = useState("");

  const filteredLetters = letters.filter((emp) =>
    emp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Header + Actions */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">List Of Letter</h2>
          <div className="flex gap-4">
            {/* Search */}
            <div className="flex items-center border rounded-lg px-2 py-1 bg-white">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Letters"
                className="outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() =>
                router.push("/admin/letter-management/add-letter")
              }>
              <FaPlus /> Add Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="relative pt-6 overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                  No.
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Type Of Letter
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                  Content
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLetters.map((letter, index) => (
                <tr
                  key={letter.id}
                  className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-left">{letter.title}</td>
                  <td className="px-4 py-2 text-left">{letter.type}</td>
                  <td className="px-4 py-2 text-center">{letter.content}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex h-full items-center justify-center gap-2">
                      <button className="text-blue-500 hover:text-blue-700 text-xl">
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700 text-xl">
                        <FiTrash2 />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        onClick={() => {
                          setSelectedLetter(letter);
                          setShowModal(true);
                        }}>
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4 text-sm">
          {/* Left: Items per page */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1">
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Middle: Showing x to y of z */}
          <div>
            Showing {startIndex + 1} to {endIndex} of {totalItems} records
          </div>

          {/* Right: Page Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50">
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}>
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
