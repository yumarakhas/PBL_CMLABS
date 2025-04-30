"use client";
import { useEffect, useState } from "react";
import { usePageTitle } from "@/context/PageTitleContext";
import {
  FiFilter,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  name: string;
  gender: string;
  phone: string;
  branch: string;
  position: string;
  grade: string;
  status: boolean;
}

export default function EmployeeDatabasetPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();

  const [summary, setSummary] = useState({
    period: "April 2025",
    totalEmployees: 0,
    newHires: 0,
    fullTime: 0,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setTitle("Employee Database");

    setSummary({
      period: "April 2025",
      totalEmployees: 127,
      newHires: 9,
      fullTime: 104,
    });

    setEmployees([
      {
        id: 1,
        name: "Jasmine Ayu",
        gender: "female",
        phone: "081234567890",
        branch: "Jakarta",
        position: "HR Manager",
        grade: "Senior",
        status: true,
      },
      {
        id: 2,
        name: "Budi Santoso",
        gender: "male",
        phone: "082112345678",
        branch: "Bandung",
        position: "Backend Developer",
        grade: "Mid",
        status: false,
      },
      {
        id: 3,
        name: "Siti Aminah",
        gender: "female",
        phone: "089876543210",
        branch: "Surabaya",
        position: "UI/UX Designer",
        grade: "Junior",
        status: true,
      },
      {
        id: 4,
        name: "Rizky Hidayat",
        gender: "male",
        phone: "083812345678",
        branch: "Medan",
        position: "Product Owner",
        grade: "Senior",
        status: true,
      },
    ]);
  }, [setTitle]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Period", value: summary.period },
          { label: "Total Employee", value: summary.totalEmployees },
          { label: "Total New Hire", value: summary.newHires },
          { label: "Full Time Employee", value: summary.fullTime },
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">{item.label}</h3>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Header + Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Employees Information</h2>
          <div className="flex gap-4">
            {/* Search */}
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
            <button className="flex items-center gap-1 px-3 py-1 bg-[#BA3C54] text-white rounded-md text-sm hover:opacity-90"
            onClick={() => router.push("/dashboard/employee-database/add-employee-database")}
            >
              <FaPlus /> Add Data
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="pt-6 overflow-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-3 py-2">No.</th>
                <th className="px-3 py-2">Avatar</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Gender</th>
                <th className="px-3 py-2">Phone Number</th>
                <th className="px-3 py-2">Branch</th>
                <th className="px-3 py-2">Position</th>
                <th className="px-3 py-2">Grade</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="text-center border-t hover:bg-gray-50">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto" />
                  </td>
                  <td className="px-3 py-2">{employee.name}</td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-1 bg-gray-200 rounded text-xs">
                      {employee.gender}
                    </span>
                  </td>
                  <td className="px-3 py-2">{employee.phone}</td>
                  <td className="px-3 py-2 text-blue-500 underline">
                    {employee.branch}
                  </td>
                  <td className="px-3 py-2">{employee.position}</td>
                  <td className="px-3 py-2">{employee.grade}</td>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm"
                      checked={employee.status}
                      readOnly
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex h-full items-center justify-center gap-2">
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <label>
              Showing{" "}
              <select className="border rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white text-[#1C3D5A] border-[#1C3D5A]">
              &lt;
            </button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white">
              1
            </button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white">
              2
            </button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white">
              3
            </button>
            <button className="px-3 py-1 hover:bg-[#1C3D5A] hover:text-white text-[#1C3D5A] border-[#1C3D5A]">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
