'use client';
import React, { useState, useEffect } from "react";
import { usePageTitle } from "@/context/PageTitleContext";
import { useRouter } from "next/navigation";

export default function AddCheckclock() {
  const { setTitle } = usePageTitle();
  const router = useRouter();   

  useEffect(() => {
    setTitle("Checkclock");
  }, [setTitle]);

  const [employee, setEmployee] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [proofUploaded, setProofUploaded] = useState(false);
  const [location, setLocation] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data submitted!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Add Checkclock</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* ========= KIRI ========= */}
        <div className="flex flex-col space-y-4">
          {/* Employee */}
          <div>
            <label className="block mb-1 font-medium">Employee</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Choose Employee</option>
              <option>Juanita</option>
              <option>Miles</option>
            </select>
          </div>

          {/* Type of Attendance */}
          <div>
            <label className="block mb-1 font-medium">Type of Attendance</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Choose Type of Attendance</option>
              <option>Clock In</option>
              <option>Clock Out</option>
              <option>Absent</option>
              <option>Annual Leave</option>
              <option>Sick Leave</option>
            </select>
          </div>

          {/* Upload Proof */}
          <div>
            <label className="block mb-1 font-medium">Upload Proof of Attendance</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md px-4 py-22 text-center text-gray-500 cursor-pointer"
              onClick={() => setProofUploaded(true)}
            >
              Drag n Drop here<br />or<br />Browse
            </div>
            <button
              type="button"
              className="mt-2 w-full py-2 bg-gray-300 text-white rounded-md disabled:opacity-50"
              disabled={!proofUploaded}
            >
              Upload Now
            </button>
          </div>
        </div>

        {/* ========= KANAN ========= */}
        <div className="flex flex-col space-y-4">
          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Choose Location</option>
              <option>Office A</option>
              <option>Remote</option>
            </select>
          </div>

          {/* Map Placeholder */}
          <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-600">[Map Placeholder]</span>
          </div>

          {/* Detail Address */}
          <div>
            <label className="block mb-1 font-medium">Detail Address</label>
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="Kota Malang, Jawa Timur"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Lat */}
          <div>
            <label className="block mb-1 font-medium">Lat</label>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Lat Location"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Long */}
          <div>
            <label className="block mb-1 font-medium">Long</label>
            <input
              type="text"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              placeholder="Long Location"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* ========= BUTTONS ========= */}
        <div className="col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/checkclock")}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
