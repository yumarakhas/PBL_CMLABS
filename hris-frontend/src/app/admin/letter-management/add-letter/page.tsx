"use client";
import { useEffect, useState } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

export default function AddLetterManagementPage() {
  const { setTitle } = usePageTitle();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setTitle("Add Letter Management");
  }, [setTitle]);

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-4xl mx-auto space-y-4">
        <label className="block text-lg font-medium">Add Letter</label>
        <select
          className="w-1/4 border border-gray-300 rounded px-4 py-2"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">--None--</option>
          <option value="fill">Fill the document</option>
          <option value="upload">Upload Document</option>
        </select>

        {/* Fill the Document Form */}
        {selectedOption === "fill" && (
          <div className="border p-4 rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter the title"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Type Of Letter</label>
                <select className="w-full border border-gray-300 px-4 py-2 rounded">
                  <option value="">--Choose type of letter--</option>
                  <option value="invitation">Invitation</option>
                  <option value="notice">Notice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Content</label>
              <textarea
                placeholder="Enter the content"
                className="w-full h-40 border border-gray-300 px-4 py-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        )}

        {/* Upload Document Form */}
        {selectedOption === "upload" && (
          <div className="border p-4 rounded-md space-y-4">
            <div>
              <label className="block font-medium mb-1">Upload Document</label>
              <input
                type="file"
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button className="bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}