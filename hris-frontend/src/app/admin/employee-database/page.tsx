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
import { getEmployees } from "@/lib/services/employee";
import { deleteEmployee } from "@/lib/services/employee";

type AvatarProps = {
  src?: string;
  alt: string;
};

function EmployeeAvatar({ src, alt }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const baseUrl = "http://localhost:8000/storage/";

  const fullSrc = src?.startsWith("http") ? src : `${baseUrl}${src}`;

  if (!src || imgError) {
    return (
      <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto border border-gray-300" />
    );
  }

  return (
    <img
      src={fullSrc}
      alt={alt}
      onError={() => setImgError(true)}
      className="w-20 h-20 rounded-full object-cover mx-auto border border-gray-300"
    />
  );
}

type EmployeeType = {
  id: number;
  photo?: string;
  Gender: "Male" | "Female";
  PhoneNumber: string;
  Branch: string;
  Position: string;
  Division: string;
  Status: "Aktif" | "Non Aktif";
  FirstName: string;
  LastName: string;
  NIK: string;
  LastEducation: string;
  PlaceOfBirth: string;
  BirthDate: string;
  ContractType: string;
  Bank: string;
  BankAccountNumber: string;
  BankAccountHolderName: string;
  Address: string;
};

export default function EmployeeDatabasetPage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const [summary, setSummary] = useState({
    period: "",
    totalEmployees: 0,
    newHires: 0,
    fullTime: 0,
  });
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentEmployees = employees.slice(startIndex, endIndex);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("are you sure to delete this employee?");
    if (!confirmDelete) return;

    try {
      await deleteEmployee(id); 
      fetchEmployees(); 
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };
  const [imgError, setImgError] = useState(false);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((emp) =>
    emp.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
      setSummary((prev) => ({
        ...prev,
        totalEmployees: res.data.length,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    setTitle("Employee Database");
    fetchEmployees();
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
                router.push("/admin/employee-database/add-employee-database")
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
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  No.
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                  Avatar
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Gender
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Phone Number
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Branch
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Position
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Division
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  Status
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-white text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <EmployeeAvatar
                      src={employee.photo}
                      alt={employee.FirstName}
                    />
                  </td>
                  <td className="px-4 py-2">
                    {employee.FirstName} {employee.LastName}
                  </td>
                  <td className="px-4 py-2">{employee.Gender}</td>
                  <td className="px-4 py-2">{employee.PhoneNumber}</td>
                  <td className="px-4 py-2">{employee.Branch}</td>
                  <td className="px-4 py-2">{employee.Position}</td>
                  <td className="px-4 py-2">{employee.Division}</td>
                  <td className="px-4 py-2 text-center">{employee.Status}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex h-full items-center justify-center gap-2">
                      <button
                        onClick={() => router.push(`/admin/employee-database/edit-employee-database/${employee.id}`)}
                        className="text-blue-500 hover:text-blue-700 text-xl
                      ">
                        <FiEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700 text-xl">
                        <FiTrash2 />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 text-xl"
                        onClick={() => {
                          setSelectedEmployee(employee);
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

        {showModal && selectedEmployee && (
          // backdrop
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40">
            {/* modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-xl border border-gray-200">
                <h2 className="text-lg font-bold mb-4 text-center">
                  Employee Details
                </h2>

                {/* Foto di Tengah */}
                <div className="flex justify-center mb-6">
                  <EmployeeAvatar
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.FirstName}
                  />
                </div>

                {/* Data */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <p>
                    <strong>First Name:</strong> {selectedEmployee.FirstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {selectedEmployee.LastName}
                  </p>
                  <p>
                    <strong>NIK:</strong> {selectedEmployee.NIK}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedEmployee.Gender}
                  </p>
                  <p>
                    <strong>Last Education:</strong>{" "}
                    {selectedEmployee.LastEducation}
                  </p>
                  <p>
                    <strong>Place Of Birth:</strong>{" "}
                    {selectedEmployee.PlaceOfBirth}
                  </p>
                  <p>
                    <strong>Date Of Birth:</strong>{" "}
                    {selectedEmployee.BirthDate}
                  </p>
                  <p>
                    <strong>Branch:</strong> {selectedEmployee.Branch}
                  </p>
                  <p>
                    <strong>Position:</strong> {selectedEmployee.Position}
                  </p>
                  <p>
                    <strong>Contract Type:</strong>{" "}
                    {selectedEmployee.ContractType}
                  </p>
                  <p>
                    <strong>Division:</strong> {selectedEmployee.Division}
                  </p>
                  <p>
                    <strong>Bank:</strong> {selectedEmployee.Bank}
                  </p>
                  <p>
                    <strong>Bank Account Number:</strong>{" "}
                    {selectedEmployee.BankAccountNumber}
                  </p>
                  <p>
                    <strong>Account Holder Name:</strong>{" "}
                    {selectedEmployee.BankAccountHolderName}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedEmployee.Address}
                  </p>
                </div>

                <div className="mt-6 text-right">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
