"use client";

import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Branch {
  id?: number;
  company_id?: number;
  name: string;
  branch_address: string;
  branch_phone: string;
  branch_phone_backup?: string;
  description?: string;
}

interface Division {
  id?: number;
  branch_id: number;
  name: string;
  description?: string;
}

interface Position {
  id?: number;
  division_id: number;
  name: string;
  description?: string;
}

export default function CompanyDetailPage() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      name: "",
      branch_address: "",
      branch_phone: "",
      branch_phone_backup: "",
      description: "",
    },
  ]);
  const router = useRouter();

  const [divisions, setDivisions] = useState<Division[]>([
    { branch_id: 0, name: "", description: "" },
  ]);

  const [positions, setPositions] = useState<Position[]>([
    { division_id: 0, name: "", description: "" },
  ]);

  const handleBranchChange = (
    index: number,
    field: keyof Branch,
    value: string
  ) => {
    const updated = [...branches];
    (updated[index][field] as string | undefined) = value;
    setBranches(updated);
  };

  const handleDivisionChange = (
    index: number,
    field: keyof Division,
    value: string
  ) => {
    const updated = [...divisions];
    (updated[index][field] as string | number | undefined) = value;
    setDivisions(updated);
  };

  const handlePositionChange = (
    index: number,
    field: keyof Position,
    value: string | number
  ) => {
    const updated = [...positions];
    (updated[index][field] as string | number | undefined) = value;
    setPositions(updated);
  };

  const handleAdd = (type: "branch" | "division" | "position") => {
    if (type === "branch") {
      setBranches([
        ...branches,
        {
          name: "",
          branch_address: "",
          branch_phone: "",
          branch_phone_backup: "",
          description: "",
        },
      ]);
    } else if (type === "division") {
      setDivisions([...divisions, { branch_id: 0, name: "", description: "" }]);
    } else {
      setPositions([
        ...positions,
        { division_id: 0, name: "", description: "" },
      ]);
    }
  };

  const handleRemove = (
    type: "branch" | "division" | "position",
    index: number
  ) => {
    if (type === "branch") {
      setBranches(branches.filter((_, i) => i !== index));
    } else if (type === "division") {
      setDivisions(divisions.filter((_, i) => i !== index));
    } else {
      setPositions(positions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/company-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ branches, divisions, positions }),
      });

      if (response.ok) {
        alert("Company details saved successfully!");
        router.push("/admin/dashboard");
      } else {
        alert("Error saving company details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving company details");
    }
  };

  return (
    <div className="bg-[#e8f1fb] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Company Detail</h1>
          <p className="text-gray-600 mt-2">
            Complete your company details to finalize your HRIS setup
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          {["Company Profile", "Package", "Checkout", "Company Detail"].map(
            (label, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                      index === 3
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-400 border-gray-300"
                    }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm mt-2 text-gray-600 w-24 text-center font-medium">
                    {label}
                  </span>
                </div>
                {index < 3 && <div className="w-16 h-1 bg-gray-300 mx-4" />}
              </div>
            )
          )}
        </div>

        {/* Branch Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-5">
          <div className="px-4 py-3 rounded-t-md mb-4">
            <h2 className="font-bold text-lg mb-4">Branch Information</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-[#1E3A5F]">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      No.
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      Branch Name
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      Branch Address
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      Branch Phone
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      Backup Phone
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                      Description
                    </th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {branches.map((branch, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{i + 1}</td>
                      <td className="px-4 py-2">
                        <input
                          value={branch.name}
                          onChange={(e) =>
                            handleBranchChange(i, "name", e.target.value)
                          }
                          placeholder="Branch Name"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={branch.branch_address}
                          onChange={(e) =>
                            handleBranchChange(
                              i,
                              "branch_address",
                              e.target.value
                            )
                          }
                          placeholder="Address"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={branch.branch_phone}
                          onChange={(e) =>
                            handleBranchChange(
                              i,
                              "branch_phone",
                              e.target.value
                            )
                          }
                          placeholder="Phone"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={branch.branch_phone_backup}
                          onChange={(e) =>
                            handleBranchChange(
                              i,
                              "branch_phone_backup",
                              e.target.value
                            )
                          }
                          placeholder="Backup Phone"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={branch.description}
                          onChange={(e) =>
                            handleBranchChange(i, "description", e.target.value)
                          }
                          placeholder="Desc"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleRemove("branch", i)}
                          className="text-white bg-red-600 px-2 py-2 rounded-md hover:opacity-70 text-sm">
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add New Button */}
              <div className="px-4 py-4">
                <button
                  onClick={() => handleAdd("branch")}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <FaPlus size={14} className="mr-1" /> Add New Branch
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Position Information */}
          <div className="bg-white p-6 rounded-lg shadow mb-5">
            <div className="px-4 py-3 rounded-t-md mb-4">
              <h2 className="font-bold text-lg mb-4">Position Information</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-500">
                  <thead className="bg-[#1E3A5F]">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        No
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        Position
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        Description
                      </th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {positions.map((pos, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{i + 1}</td>
                        <td className="px-4 py-2">
                          <input
                            value={pos.name}
                            onChange={(e) =>
                              handlePositionChange(i, "name", e.target.value)
                            }
                            placeholder="Position Name"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={pos.description}
                            onChange={(e) =>
                              handlePositionChange(
                                i,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Description"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleRemove("position", i)}
                            className="text-white bg-red-600 px-2 py-2 rounded-md hover:opacity-70 text-sm">
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-4 py-4">
                  <button
                    onClick={() => handleAdd("position")}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <FaPlus size={14} className="mr-1" /> Add New Position
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Division Information */}
          <div className="bg-white p-6 rounded-lg shadow mb-5">
            <div className="px-4 py-3 rounded-t-md mb-4">
              <h2 className="font-bold text-lg mb-4">Division Information</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-500">
                  <thead className="bg-[#1E3A5F]">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        No
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        Division
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                        Description
                      </th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {divisions.map((div, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">{i + 1}</td>
                        <td className="px-4 py-2">
                          <input
                            value={div.name}
                            onChange={(e) =>
                              handleDivisionChange(i, "name", e.target.value)
                            }
                            placeholder="Division Name"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={div.description}
                            onChange={(e) =>
                              handleDivisionChange(
                                i,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Description"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => handleRemove("division", i)}
                            className="text-white bg-red-600 px-2 py-2 rounded-md hover:opacity-70 text-sm">
                            <FaTrash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-4 py-4">
                  <button
                    onClick={() => handleAdd("division")}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <FaPlus size={14} className="mr-1" /> Add New Division
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-medium">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
