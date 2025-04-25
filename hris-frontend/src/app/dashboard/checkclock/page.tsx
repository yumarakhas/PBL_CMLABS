"use client";
import React, { useState } from "react";
import { MdSearch, MdFilterList, MdAdd, MdCheck, MdClose } from "react-icons/md";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import {
  FiFilter,
  FiSearch,
  FiDownload,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface CheckclockRecord {
  id: number;
  name: string;
  position: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
  approved: boolean | null;
  status: string;
}

export default function CheckclockPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [records] = useState<CheckclockRecord[]>([
    { id: 1, name: 'Juanita', position: 'CEO', clockIn: '08.00', clockOut: '16.30', workHours: '10h 5m', approved: null, status: 'Waiting Approval' },
    { id: 2, name: 'Shane', position: 'OB', clockIn: '08.00', clockOut: '17.15', workHours: '9h 50m', approved: true, status: 'On Time' },
    { id: 3, name: 'Miles', position: 'Head of HR', clockIn: '09.00', clockOut: '16.45', workHours: '10h 30m', approved: true, status: 'On Time' },
    { id: 4, name: 'Flores', position: 'Manager', clockIn: '09.15', clockOut: '15.30', workHours: '6h 15m', approved: true, status: 'Late' },
    { id: 5, name: 'Henry', position: 'CPO', clockIn: '—', clockOut: '—', workHours: '0', approved: true, status: 'Annual Leave' },
    { id: 6, name: 'Marvin', position: 'OB', clockIn: '—', clockOut: '—', workHours: '0', approved: true, status: 'Absent' },
    { id: 7, name: 'Black', position: 'HRD', clockIn: '08.15', clockOut: '17.00', workHours: '9h 45m', approved: true, status: 'On Time' },
    { id: 8, name: 'Jacob Jones', position: 'Supervisor', clockIn: '—', clockOut: '—', workHours: '0', approved: false, status: 'Sick Leave' },
    { id: 9, name: 'Ronaldis Ricards', position: 'OB', clockIn: '08.00', clockOut: '16.00', workHours: '10h', approved: true, status: 'Late' },
    { id: 10, name: 'Leslie Alexander', position: 'OB', clockIn: '08.30', clockOut: '16.00', workHours: '8h 30m', approved: null, status: 'Waiting Approval' },
    { id: 11, name: 'Elisa', position: 'Admin', clockIn: '08.00', clockOut: '16.00', workHours: '8h', approved: null, status: 'Waiting Approval' },
    { id: 12, name: 'Kevin', position: 'Marketing', clockIn: '08.00', clockOut: '16.30', workHours: '8h 30m', approved: true, status: 'On Time' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CheckclockRecord | null>(null);

  const filtered = records.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filtered.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApprove = (record: CheckclockRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleReject = (record: CheckclockRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleConfirmApprove = () => {
    if (selectedRecord) {
      // Update status approve di sini
      alert(`Attendance of ${selectedRecord.name} approved!`);
      setShowModal(false);
    }
  };

  const handleConfirmReject = () => {
    if (selectedRecord) {
      // Update status reject di sini
      alert(`Attendance of ${selectedRecord.name} rejected!`);
      setShowModal(false);
    }
  };

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<CheckclockRecord | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Checklock Overview</h2>
        <div className="flex gap-4">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-2 py-1 bg-white">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Employee"
              className="outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            onClick={() => router.push("/dashboard/checkclock/add-checkclock")}
          >
            <FaPlus /> Add Data
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="pt-6 overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-500">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Employee Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Position</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Clock In</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Clock Out</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Work Hours</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-white">Approve</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-white">Status</th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-white">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.position}</td>
                <td className="px-4 py-2">{r.clockIn}</td>
                <td className="px-4 py-2">{r.clockOut}</td>
                <td className="px-4 py-2">{r.workHours}</td>
                <td className="px-4 py-2 text-center">
                  {r.approved === null ? (
                    <span className="inline-flex items-center space-x-2">
                      <button
                        onClick={() => handleApprove(r)}
                        className="p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
                      >
                        <MdCheck className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleReject(r)}
                        className="p-2 bg-red-500 rounded-md text-white hover:bg-red-600"
                      >
                        <MdClose className="text-sm" />
                      </button>
                    </span>
                  ) : r.approved ? (
                    <button
                      disabled
                      className="p-2 bg-green-500 rounded-md text-white disabled:opacity-50"
                    >
                      <MdCheck className="text-sm" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="p-2 bg-red-500 rounded-md text-white disabled:opacity-50"
                    >
                      <MdClose className="text-sm" />
                    </button>
                  )}
                </td>
                <td className="px-4 py-2">
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setSelectedDetail(r);
                      setShowDetailModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Approve&Reject*/}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Approve Attendance</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <div className="text-sm">
                Are you sure you want to approve attendance for{" "}
                <span className="font-semibold">{selectedRecord.name}</span>?
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleConfirmReject}
                  className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Reject
                </button>
                <button
                  onClick={handleConfirmApprove}
                  className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
