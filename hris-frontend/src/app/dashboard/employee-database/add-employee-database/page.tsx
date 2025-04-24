"use client";
import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

export default function AddEmployeePage() {
  const { setTitle } = usePageTitle();
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    NIK: "",
    Gender: "",
    LastEducation: "",
    PlaceOfBirth: "",
    DateOfBirth: "",
    Position: "",
    Branch: "",
    Grade: "",
    ContractType: "",
    Bank: "",
    BankAccountNumber: "",
    BankAccountHolderName: "",
    SPType: "",
    Avatar: null,
  });

  useEffect(() => {
    setTitle("Add Employee");
  }, [setTitle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setForm({ ...form, Avatar: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-[#1C3D5A]">
        Add Employee Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Avatar Upload */}
          <div className="md:col-span-2 flex items-start gap-6">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border text-gray-400 text-sm">
              {form.Avatar ? (
                <img
                  src={URL.createObjectURL(form.Avatar)}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                "No Avatar"
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Avatar
              </label>
              <label className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer text-sm inline-block">
                Upload Avatar
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <Input label="First Name" name="FirstName" value={form.FirstName} onChange={handleChange} />
          <Input label="Last Name" name="LastName" value={form.LastName} onChange={handleChange} />
          <Input label="Mobile Number" name="MobileNumber" value={form.MobileNumber} onChange={handleChange} />
          <Input label="NIK" name="NIK" value={form.NIK} onChange={handleChange} />
          <Select label="Gender" name="Gender" value={form.Gender} onChange={handleChange} options={["Male", "Female"]} />
          <Select label="Last Education" name="LastEducation" value={form.LastEducation} onChange={handleChange} options={["SMA", "D3", "S1", "S2"]} />
          <Input label="Place Of Birth" name="PlaceOfBirth" value={form.PlaceOfBirth} onChange={handleChange} />

          {/* Date Of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date Of Birth
            </label>
            <div className="relative mt-1">
              <input
                type="date"
                name="DateOfBirth"
                value={form.DateOfBirth}
                onChange={handleChange}
                className="block w-full border rounded-md p-2 text-sm shadow-sm appearance-none"
                style={{ backgroundImage: "none" }}
              />
            </div>
          </div>

          <Input label="Position" name="Position" value={form.Position} onChange={handleChange} />
          <Input label="Branch" name="Branch" value={form.Branch} onChange={handleChange} />

          {/* Grade & Contract Type (satu baris) */}
          <Input label="Grade" name="Grade" value={form.Grade} onChange={handleChange} />
          <RadioGroup label="Contract Type" name="ContractType" value={form.ContractType} onChange={handleChange} options={["Permanent", "Contract", "Freelance"]} />

          {/* Bank */}
          <Select 
          label="Bank" 
          name="Bank" value={form.Bank} 
          onChange={handleChange} 
          options={["BCA", "Mandiri", "BNI", "BRI"]} 
          />
          <Input label="Bank Account Number" name="BankAccountNumber" value={form.BankAccountNumber} onChange={handleChange} />
          <Input label="Bank Account Holder Name" name="BankAccountHolderName" value={form.BankAccountHolderName} onChange={handleChange} />
          <Select label="SP Type" name="SPType" value={form.SPType} onChange={handleChange} options={["SP1", "SP2", "SP3"]} />

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
}

/* Input, Select, RadioGroup Komponen */
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border rounded-md p-2 text-sm shadow-sm appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'18\' viewBox=\'0 0 24 24\' width=\'18\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')] bg-no-repeat bg-[right_0.75rem_center] pr-8"
      >
        <option value="">-- Select --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex gap-4 mt-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
            />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
