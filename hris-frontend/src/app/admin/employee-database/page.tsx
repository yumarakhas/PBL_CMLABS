"use client";
import { useEffect, useState } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

import { MdClose } from "react-icons/md";
import {
  FiFilter,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
} from "react-icons/fi";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { getEmployees, deleteEmployee } from "@/lib/services/employee";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [summary, setSummary] = useState({
    period: "",
    totalEmployees: 0,
    activeEmployees: 0,
    Branch: 0,
    Division: 0,
  });
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

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
      const employees = res.data;
      const currentDate = new Date();

      const activeCount = employees.filter((emp: any) => {
        const status = String(emp.Status || "")
          .toLowerCase()
          .trim();
        return status === "aktif";
      }).length;

      const branchCount = new Set(employees.map((emp: any) => emp.Branch)).size;
      const divisionCount = new Set(employees.map((emp: any) => emp.Division))
        .size;

      const formattedPeriod = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      setEmployees(employees);
      setSummary((prev) => ({
        ...prev,
        period: formattedPeriod,
        totalEmployees: employees.length,
        activeEmployees: activeCount,
        Branch: branchCount,
        Division: divisionCount,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleExportToExcel = () => {
    const exportData = employees.map((emp) => ({
      FirstName: emp.FirstName,
      LastName: emp.LastName,
      Gender: emp.Gender,
      PhoneNumber: emp.PhoneNumber,
      Branch: emp.Branch,
      Position: emp.Position,
      Division: emp.Division,
      Status: emp.Status,
      NIK: emp.NIK,
      LastEducation: emp.LastEducation,
      PlaceOfBirth: emp.PlaceOfBirth,
      BirthDate: emp.BirthDate,
      ContractType: emp.ContractType,
      Bank: emp.Bank,
      BankAccountNumber: emp.BankAccountNumber,
      BankAccountHolderName: emp.BankAccountHolderName,
      Address: emp.Address,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const safePeriod = summary.period.replace(" ", "_"); // contoh: "May_2025"
    const fileName = `Employees_${safePeriod}.xlsx`;

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, fileName);
  };

  // type FilterCategory = "Branches" | "Positions" | "Divisions" | "Statuses";

  // type FilterOptions = {
  //   Branches: string[];
  //   Positions: string[];
  //   Divisions: string[];
  //   Statuses: string[];
  // };

  // type SelectedFilters = {
  //   Branches: string[];
  //   Positions: string[];
  //   Divisions: string[];
  //   Statuses: string[];
  // };

  // const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
  //   Branches: [],
  //   Positions: [],
  //   Divisions: [],
  //   Statuses: [],
  // });

  // const [filterOptions, setFilterOptions] = useState<FilterOptions>({
  //   Branches: [],
  //   Positions: [],
  //   Divisions: [],
  //   Statuses: [],
  // });

  // const toggleFilter = (category: FilterCategory, value: string) => {
  //   setSelectedFilters((prev) => {
  //     const current = prev[category];
  //     return {
  //       ...prev,
  //       [category]: current.includes(value)
  //         ? current.filter((v) => v !== value)
  //         : [...current, value],
  //     };
  //   });
  // };

  // const applyFilter = async () => {
  //   try {
  //     const query = new URLSearchParams();
  //     Object.entries(selectedFilters).forEach(([key, values]) => {
  //       values.forEach((val) => query.append(`${key}[]`, val));
  //     });

  //     const res = await fetch(`/api/employees?${query.toString()}`);
  //     if (!res.ok) throw new Error("Failed to fetch filtered employees");

  //     const data = await res.json();
  //     setEmployees(data);
  //   } catch (error) {
  //     console.error("Filter error:", error);
  //   }
  // };

  useEffect(() => {
    // const fetchFilters = async () => {
    //   const res = await fetch("/api/filters");
    //   const data = await res.json();
    //   setFilterOptions(data);
    // };

    // fetchFilters();
    setTitle("Employee Database");
    fetchEmployees();
  }, [setTitle]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Period", value: summary.period },
          { label: "Total Employee", value: summary.totalEmployees },
          { label: "Total Active Employees", value: summary.activeEmployees },
          { label: "Branch", value: summary.Branch },
          { label: "Division", value: summary.Division },
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
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-[#D9D9D9] text-sm">
              <FiFilter /> Filter
            </button>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-[#D9D9D9] text-sm">
              <FiDownload /> Export
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1 bg-[#BA3C54] text-white rounded-md text-sm hover:opacity-80"
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
            <thead className="bg-[#1E3A5F]">
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
                <tr key={employee.id} className=" hover:bg-gray-50">
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
                        onClick={() =>
                          router.push(
                            `/admin/employee-database/edit-employee-database/${employee.id}`
                          )
                        }
                        className="text-white bg-gray-600 px-2 py-2 rounded-md hover:opacity-70 text-xl">
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-white bg-red-700 px-2 py-2 rounded-md hover:opacity-70 text-xl">
                        <FiTrash2 />
                      </button>
                      <button
                        className="text-white bg-blue-700 px-2 py-2 rounded-md hover:opacity-70 text-xl"
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
        
        {showFilterModal && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
            <div className="w-full max-w-md h-full bg-white shadow-lg overflow-y-auto p-6">
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold">Filtering Data</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-500 hover:text-gray-700">
                  <MdClose className="text-2xl" />
                </button>
              </div>

              {/* Filter Sections */}
              <div className="space-y-6 text-sm">
                {/* Branch */}
                <div>
                  <h3 className="font-semibold mb-2">Branch</h3>
                  {/* {filterOptions.Branches.map((Branch) => {
                    const selected = selectedFilters.Branches.includes(Branch);
                    return (
                      <button
                        key={Branch}
                        onClick={() => toggleFilter("Branches", Branch)}
                        className={`border rounded-md py-1 px-2 text-center transition ${
                          selected
                            ? "bg-orange-200 font-semibold"
                            : "hover:bg-orange-100"
                        }`}>
                        {Branch}
                      </button>
                    );
                  })} */}
                </div>

                {/* Position */}
                <div>
                  <h3 className="font-semibold mb-2">Position</h3>
                  {/* {filterOptions.Positions.map((Position) => {
                    const selected =
                      selectedFilters.Positions.includes(Position);
                    return (
                      <button
                        key={Position}
                        onClick={() => toggleFilter("Positions", Position)}
                        className={`border rounded-md py-1 px-2 text-center transition ${
                          selected
                            ? "bg-orange-200 font-semibold"
                            : "hover:bg-orange-100"
                        }`}>
                        {Position}
                      </button>
                    );
                  })} */}
                </div>

                {/* Division */}
                <div>
                  <h3 className="font-semibold mb-2">Division</h3>
                  {/* {filterOptions.Divisions.map((Division) => {
                    const selected =
                      selectedFilters.Divisions.includes(Division);
                    return (
                      <button
                        key={Division}
                        onClick={() => toggleFilter("Divisions", Division)}
                        className={`border rounded-md py-1 px-2 text-center transition ${
                          selected
                            ? "bg-orange-200 font-semibold"
                            : "hover:bg-orange-100"
                        }`}>
                        {Division}
                      </button>
                    );
                  })} */}
                </div>

                {/* Status */}
                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  {/* {filterOptions.Statuses.map((Status) => {
                    const selected = selectedFilters.Statuses.includes(Status);
                    return (
                      <button
                        key={Status}
                        onClick={() => toggleFilter("Statuses", Status)}
                        className={`border rounded-md py-1 px-2 text-center transition ${
                          selected
                            ? "bg-orange-200 font-semibold"
                            : "hover:bg-orange-100"
                        }`}>
                        {Status}
                      </button>
                    );
                  })} */}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-6">
                  <button className="text-sm text-gray-500 hover:underline">
                    Reset
                  </button>
                  {/* <button onClick={applyFilter} className="...">
                    Apply
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white font-bold rounded-xl shadow-2xl p-6 w-full max-w-xl z-50 overflow-y-auto max-h-[90vh]">
              <h2 className="text-lg bg-[#1E3A5F] rounded-xl px-2 py-2 mb-4 text-center text-white">
                Detail Information
              </h2>

              {/* Header - Foto + Nama + Posisi */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <EmployeeAvatar
                    src={selectedEmployee.photo}
                    alt={selectedEmployee.FirstName}
                  />
                </div>
                <div>
                  <p className="text-xl font-semibold">{`${selectedEmployee.FirstName} ${selectedEmployee.LastName}`}</p>
                  <p className="text-gray-600">{selectedEmployee.Position}</p>
                  <p className="text-gray-600">{selectedEmployee.Division}</p>
                </div>
              </div>

              {/* Personal & Bank Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {/* Personal Info */}
                <div>
                  <h1 className="font-bold mb-3">Personal Information</h1>
                  <div className=" shadow-md rounded-xl p-4 bg-gray-50 text-black text-sm space-y-2 grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Place Of Birth</p>
                      <p className="font-medium">
                        {selectedEmployee.PlaceOfBirth}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date Of Birth</p>
                      <p className="font-medium">
                        {selectedEmployee.BirthDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Gender</p>
                      <p className="font-medium">{selectedEmployee.Gender}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">NIK</p>
                      <p className="font-medium">{selectedEmployee.NIK}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Education</p>
                      <p className="font-medium">
                        {selectedEmployee.LastEducation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank Info */}
                <div>
                  <h1 className="font-bold mb-3">Bank Information</h1>
                  <div className="shadow-md rounded-xl p-4 bg-gray-50 text-sm space-y-2">
                    <div>
                      <p className="text-gray-500">Bank</p>
                      <p className="font-medium">{selectedEmployee.Bank}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account Holder Name</p>
                      <p className="font-medium">
                        {selectedEmployee.BankAccountHolderName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account Number</p>
                      <p className="font-medium">
                        {selectedEmployee.BankAccountNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-2">
                <h1 className="font-bold mb-3 col-span-2">
                  Additional Information
                </h1>

                <div className="mb-3 shadow-md rounded-xl p-4 bg-gray-50 text-sm space-y-2 col-span-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-gray-500">Branch</p>
                      <p className="font-medium">{selectedEmployee.Branch}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Contract Type</p>
                      <p className="font-medium">
                        {selectedEmployee.ContractType}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium">{selectedEmployee.Status}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium">{selectedEmployee.Address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Close */}
              <div className="text-right">
                <button
                  className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800"
                  onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
