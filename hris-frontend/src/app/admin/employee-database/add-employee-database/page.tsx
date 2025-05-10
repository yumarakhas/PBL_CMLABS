"use client";
import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEmployeePage() {
  const { setTitle } = usePageTitle();
  const router = useRouter();
  const [dob, setDob] = useState<Date | null>(null);

  useEffect(() => {
    setTitle("Employee");
  }, [setTitle]);

  const [photo, setPhoto] = useState<File | null>(null);
  const [FirstName, setFirstName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Gender, setGender] = useState("");
  const [PlaceOfBirth, setPlaceOfBirth] = useState("");
  const [Position, setPosition] = useState("");
  const [ContractType, setContractType] = useState("");
  const [Bank, setBank] = useState("");
  const [BankAccountHolderName, setBankAccountHolderName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Nik, setNIK] = useState("");
  const [LasEducation, setLastEducation] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [Branch, setBranch] = useState("");
  const [Grade, setGrade] = useState("");
  const [BankAccountNumber, setBankAccountNmber] = useState("");
  const [SPType, setSPType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data submitted!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow ">
      <h2 className="text-xl font-semibold mb-6">Add Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6">
        {/* Photo */}
        <div className="md:col-span-2 flex items-start gap-6 mb-6">
          <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border text-gray-400 text-sm">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              "No Photo"
            )}
          </div>
          <div className="flex flex-col justify-center h-32">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <label className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer text-sm inline-block">
              Upload Photo
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]); // simpan file ke state
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* KIRI */}
        <div className="flex flex-col space-y-4">
          {/* FirstName */}
          <div>
            <label className="block mb-1 font-medium">FirstName</label>
            <input
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter the first name"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Phone Number */}

          <div>
            <label className="block mb-1 font-medium"> Mobile Number</label>
            <input
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter the mobile number"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border px-3 py-2">
              <option>Choose Gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block mb-1 font-medium">Place Of Birth</label>
            <input
              value={PlaceOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder="Enter the place of birth"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block mb-1 font-medium">Position</label>
            <input
              value={Position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter your position"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* contract type */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Contract Type</label>
            <RadioGroup
              name="contractType"
              value={ContractType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContractType(e.target.value)
              }
              options={["Permanent", "Contract", "Freelance"]}
            />
          </div>

          {/* Bank */}
          <div>
            <label className="block mb-1 font-medium">Bank</label>
            <select
              value={Bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full border px-3 py-2">
              <option>Choose Bank</option>
              <option>BCA</option>
              <option>Mandiri</option>
              <option>BRI</option>
              <option>BNI</option>
              <option>BTN</option>
            </select>
          </div>

          {/* Bank account holder name */}
          <div>
            <label className="block mb-1 font-medium">
              Bank Account Holder Name
            </label>
            <input
              value={BankAccountHolderName}
              onChange={(e) => setBankAccountHolderName(e.target.value)}
              placeholder="Enter your bank account holder name"
              className="w-full border px-3 py-2"
            />
          </div>
        </div>

        {/* Kanan */}
        <div className="flex flex-col space-y-4">
          {/* LastName */}
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* NIK */}
          <div>
            <label className="block mb-1 font-medium">NIK</label>
            <input
              value={Nik}
              onChange={(e) => setNIK(e.target.value)}
              placeholder="Enter your NIK"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Last Education */}
          <div>
            <label className="block mb-1 font-medium">Last Education</label>
            <select
              value={LasEducation}
              onChange={(e) => setLastEducation(e.target.value)}
              className="w-full border px-3 py-2">
              <option>Choose Last Education</option>
              <option>SD</option>
              <option>SMP</option>
              <option>SMA</option>
              <option>S1</option>
              <option>S2</option>
              <option>S3</option>
            </select>
          </div>

          {/* Date Of Birth */}
          <div>
            <label className="block mb-1 font-medium">Date Of Birth</label>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select your birth date"
              className="w-full border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              wrapperClassName="w-full"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block mb-1 font-medium">Branch</label>
            <input
              value={Branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Enter your branch"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block mb-1 font-medium">Grade</label>
            <input
              value={Grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter your grade"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* Bank Account Number */}
          <div>
            <label className="block mb-1 font-medium">
              Bank Account Number
            </label>
            <input
              value={BankAccountNumber}
              onChange={(e) => setBankAccountNmber(e.target.value)}
              placeholder="Enter your bank account number"
              className="w-full border px-3 py-2"
            />
          </div>

          {/* SP Type */}
          <div>
            <label className="block mb-1 font-medium">SP Type</label>
            <select
              value={SPType}
              onChange={(e) => setSPType(e.target.value)}
              className="w-full border px-3 py-2">
              <option>Choose SP</option>
              <option>none</option>
              <option>SP 1</option>
              <option>SP 2</option>
              <option>SP 3</option>
            </select>
          </div>
        </div>

        {/* Tombol */}
        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/employee-database")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
type RadioGroupProps = {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function RadioGroup({ name, value, options, onChange }: RadioGroupProps) {
  return (
    <div>
      <div className="flex gap-x-10 mt-2">
        {options.map((opt: string) => (
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
