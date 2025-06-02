"use client";
import { usePageTitle } from "@/context/PageTitleContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEmployee } from "@/lib/services/employee";

type EmployeeFormProps = {
  mode: "add" | "edit";
  initialData?: any;
  onSubmit: (data: any) => void;
};

interface FileFromServer {
  id: number;
  name: string;
  url: string;
}

export default function AddEmployeePage({
  mode,
  initialData,
  onSubmit,
}: EmployeeFormProps) {
  const router = useRouter();
  const [dob, setDob] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [photo, setphoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [FirstName, setFirstName] = useState(initialData?.FirstName || "");
  const [PhoneNumber, setPhoneNumber] = useState(
    initialData?.PhoneNumber || ""
  );
  const [Gender, setGender] = useState(initialData?.Gender || "");
  const [PlaceOfBirth, setPlaceOfBirth] = useState(
    initialData?.PlaceOfBirth || ""
  );
  const [Position, setPosition] = useState(initialData?.Position || "");
  const [Division, setDivision] = useState(initialData?.Division || "");
  const [ContractType, setContractType] = useState(
    initialData?.ContractType || ""
  );
  const [Bank, setBank] = useState(initialData?.Bank || "");
  const [BankAccountHolderName, setBankAccountHolderName] = useState(
    initialData?.BankAccountHolderName || ""
  );
  const [LastName, setLastName] = useState(initialData?.LastName || "");
  const [NIK, setNIK] = useState(initialData?.NIK || "");
  const [LastEducation, setLastEducation] = useState(
    initialData?.LastEducation || ""
  );

  const [Branch, setBranch] = useState(initialData?.Branch || "");
  const [BankAccountNumber, setBankAccountNumber] = useState(
    initialData?.BankAccountNumber || ""
  );
  const [Address, setAddress] = useState(initialData?.Address || "");
  const [Status, setStatus] = useState(initialData?.Status || "");
  const [Notes, setNotes] = useState(initialData?.Notes || "");
  const [Achievements, setAchievements] = useState<File[]>([]);
  const initialAchievements =
    mode === "edit" && initialData ? initialData.achievement_files || [] : [];

  const [existingAchievements, setExistingAchievements] =
    useState<FileFromServer[]>(initialAchievements);

  const [newAchievements, setNewAchievements] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.FirstName || "");
      setPhoneNumber(initialData.PhoneNumber || "");
      setGender(initialData.Gender || "");
      setPlaceOfBirth(initialData.PlaceOfBirth || "");
      setPosition(initialData.Position || "");
      setDivision(initialData.Division || "");
      setContractType(initialData.ContractType || "");
      setBank(initialData.Bank || "");
      setBankAccountHolderName(initialData.BankAccountHolderName || "");
      setLastName(initialData.LastName || "");
      setNIK(initialData.NIK || "");
      setLastEducation(initialData.LastEducation || "");
      setBranch(initialData.Branch || "");
      setBankAccountNumber(initialData.BankAccountNumber || "");
      setAddress(initialData.Address || "");
      setStatus(initialData.Status || "");
      setNotes(initialData.Notes || "");
      setAchievements([]);
      setExistingAchievements(initialData?.achievement_files ?? []);

      if (initialData.photo_url) {
        setPhotoUrl(initialData.photo_url);
        setphoto(null);
      }

      if (initialData.BirthDate) {
        setDob(new Date(initialData.BirthDate));
      } else {
        setDob(null);
      }
    }
  }, [initialData]);

  function removeDuplicateFiles(files: File[]): File[] {
    const uniqueFiles: File[] = [];
    const fileMap = new Set<string>();

    files.forEach((file) => {
      const fileKey = `${file.name}_${file.size}_${file.type}`;
      if (!fileMap.has(fileKey)) {
        fileMap.add(fileKey);
        uniqueFiles.push(file);
      }
    });

    return uniqueFiles;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!FirstName.trim()) newErrors.FirstName = "First Name is required";
    if (!LastName.trim()) newErrors.LastName = "Last Name is required";

    if (!PhoneNumber.trim()) {
      newErrors.PhoneNumber = "Phone Number is required";
    } else if (!/^\d{12,}$/.test(PhoneNumber)) {
      newErrors.PhoneNumber = "Phone Number must be 12 digits and numeric";
    }

    if (!NIK.trim()) {
      newErrors.NIK = "NIK is required";
    } else if (!/^\d{16}$/.test(NIK)) {
      newErrors.NIK = "NIK must be 16 digits";
    }

    if (!Gender) newErrors.Gender = "Gender is required";
    if (!PlaceOfBirth) newErrors.PlaceOfBirth = "Place of Birth is required";
    if (!dob) newErrors.BirthDate = "Birth Date is required";

    if (!Position) newErrors.Position = "Position is required";
    if (!Division) newErrors.Division = "Division is required";
    if (!Status) newErrors.Status = "Status is required";
    if (!Branch) newErrors.Branch = "Branch is required";
    if (!ContractType) newErrors.ContractType = "Contract Type is required";
    if (!LastEducation) newErrors.LastEducation = "Last Education is required";

    if (!Bank) newErrors.Bank = "Bank is required";
    if (!BankAccountNumber.trim()) {
      newErrors.BankAccountNumber = "Bank Account Number is required";
    } else if (!/^\d+$/.test(BankAccountNumber)) {
      newErrors.BankAccountNumber = "Bank Account Number must be numeric";
    }

    if (!BankAccountHolderName)
      newErrors.BankAccountHolderName = "Account Holder Name is required";

    if (!Address || !Address.trim()) newErrors.Address = "Address is required";

    if (!photo && mode === "add") newErrors.Photo = "Photo is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      FirstName,
      LastName,
      PhoneNumber,
      NIK,
      Gender,
      PlaceOfBirth,
      Position,
      Division,
      ContractType,
      Bank,
      BankAccountHolderName,
      LastEducation,
      BirthDate: dob,
      Branch,
      BankAccountNumber,
      Status,
      Address,
      Notes,
      photo,
      Achievements,
      existingAchievements,
    };

    onSubmit(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setphoto(e.target.files[0]);
      setPhotoUrl(null);
    }
  };

  const handleAchievementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = removeDuplicateFiles([...Achievements, ...filesArray]);
      setAchievements(newFiles);
    }
  };

  const handleDropAchievement = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      const newFiles = removeDuplicateFiles([...Achievements, ...filesArray]);
      setAchievements(newFiles);
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingAchievement = (index: number) => {
    setExistingAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const getOriginalFileName = (fileNameWithTimestamp: string) => {
    const parts = fileNameWithTimestamp.split("_");
    if (parts.length < 2) return fileNameWithTimestamp; // fallback kalau gak sesuai format

    const timestampPart = parts.pop(); // ambil bagian timestamp.ext
    const timestampMatch = timestampPart?.match(/^(\d+)\.(\w+)$/);

    if (!timestampMatch) return fileNameWithTimestamp;

    const extension = timestampMatch[2];
    const originalName = parts.join("_");

    return `${originalName}.${extension}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow ">
      <form onSubmit={handleSubmit}>
        {/* Photo */}
        <div className="md:col-span-2 flex items-start gap-6 mb-6">
          <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border text-gray-400 text-sm">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Photo"
                className="w-full h-full object-cover"
              />
            ) : photo ? (
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
                    setphoto(e.target.files[0]); // simpan file ke state
                    setPhotoUrl(null); // reset photoUrl
                  }
                }}
                className="hidden"
              />
            </label>
            {errors.Photo && (
              <p className="text-red-500 text-sm mt-2">{errors.Photo}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6">
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
              {errors.FirstName && (
                <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full border px-3 py-2"
              />
              {errors.Address && (
                <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
              )}
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
              {errors.PhoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.FirstName}</p>
              )}
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
              {errors.Gender && (
                <p className="text-red-500 text-sm mt-1">{errors.Gender}</p>
              )}
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
              {errors.PlaceOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.PlaceOfBirth}
                </p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="block mb-1 font-medium">Position</label>
              <select
                value={Position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full border px-3 py-2">
                <option>Choose the Position</option>
                <option>Staff</option>
                <option>Head of SubDivision</option>
                <option>Head of Division</option>
              </select>
              {errors.Position && (
                <p className="text-red-500 text-sm mt-1">{errors.Position}</p>
              )}
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
              {errors.ContractType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ContractType}
                </p>
              )}
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
              {errors.Bank && (
                <p className="text-red-500 text-sm mt-1">{errors.Bank}</p>
              )}
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
              {errors.BankAccountHolderName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.BankAccountHolderName}
                </p>
              )}
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
              {errors.LastName && (
                <p className="text-red-500 text-sm mt-1">{errors.LastName}</p>
              )}
            </div>

            {/* NIK */}
            <div>
              <label className="block mb-1 font-medium">NIK</label>
              <input
                value={NIK}
                onChange={(e) => setNIK(e.target.value)}
                placeholder="Enter your NIK"
                className="w-full border px-3 py-2"
              />
              {errors.NIK && (
                <p className="text-red-500 text-sm mt-1">{errors.NIK}</p>
              )}
            </div>

            {/* Last Education */}
            <div>
              <label className="block mb-1 font-medium">Last Education</label>
              <select
                value={LastEducation}
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
              {errors.LastEducation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.LastEducation}
                </p>
              )}
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
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                wrapperClassName="w-full"
              />
              {errors.BirthDate && (
                <p className="text-red-500 text-sm mt-1">{errors.BirthDate}</p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label className="block mb-1 font-medium">Branch</label>
              <select
                value={Branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border px-3 py-2">
                <option>Choose the Branch</option>
                <option>Bekasi</option>
                <option>Surabaya</option>
                <option>Samarinda</option>
                <option>Solo</option>
              </select>
              {errors.Branch && (
                <p className="text-red-500 text-sm mt-1">{errors.Branch}</p>
              )}
            </div>

            {/* Division */}
            <div>
              <label className="block mb-1 font-medium">Division</label>
              <select
                value={Division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full border px-3 py-2">
                <option>Choose the Division</option>
                <option>Finance</option>
                <option>Human Resource</option>
                <option>Marketing</option>
                <option>Production</option>
              </select>
              {errors.Division && (
                <p className="text-red-500 text-sm mt-1">{errors.Division}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border px-3 py-2">
                <option>Choose Status</option>
                <option>Aktif</option>
                <option>Non Aktif</option>
              </select>
              {errors.Status && (
                <p className="text-red-500 text-sm mt-1">{errors.Status}</p>
              )}
            </div>

            {/* Bank Account Number */}
            <div>
              <label className="block mb-1 font-medium">
                Bank Account Number
              </label>
              <input
                value={BankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                placeholder="Enter your bank account number"
                className="w-full border px-3 py-2"
              />
              {errors.BankAccountNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.BankAccountNumber}
                </p>
              )}
            </div>
            {/* Achievement Document Upload */}
            <div
              onDrop={handleDropAchievement}
              onDragOver={(e) => e.preventDefault()}
              className="border border-dashed border-gray-400 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-600">
                Drag & drop files here or click to select
              </p>
              <input
                type="file"
                multiple
                onChange={handleAchievementChange}
                className="mt-2"
              />
            </div>
            {/* Preview for NEW Achievements */}
            <div className="grid grid-cols-2 gap-2">
              {Achievements.map((file, idx) => (
                <div
                  key={`${file.name}-${file.size}-${idx}`}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm">{file.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveAchievement(
                        Achievements.findIndex(
                          (f) => f.name === file.name && f.size === file.size
                        )
                      )
                    }
                    className="text-red-500 text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* EXISTING achievement preview */}
            {existingAchievements.map((file, index) => (
              <div
                key={file.id ?? index} // fallback ke index jika file.id null/undefined
                className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-blue-600">
                  {getOriginalFileName(file.name)}
                </a>

                <button
                  type="button"
                  onClick={() => handleRemoveExistingAchievement(index)}
                  className="text-red-500 text-xs">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Notes */}
        <div className="mt-5">
          <label className="block mb-1 font-medium ">Notes</label>
          <textarea
            value={Notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter additional notes"
            className="w-full border px-3 py-2 h-24"
          />
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
