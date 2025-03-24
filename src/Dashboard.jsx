import { useState } from "react";
import { FaUpload, FaSignOutAlt } from "react-icons/fa";
import supabase from "./supabaseClient";
import React from "react";


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const { data, error } = await supabase.storage
      .from("uploads") 
      .upload(`files/${file.name}`, file);

    if (error) {
      alert("File upload failed: " + error.message);
    } else {
      alert("File uploaded successfully!");
      setFile(null);
      closeModal();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-gray-200 mb-6">Dashboard</h2>

        <button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-4 py-2 rounded w-full mb-2">
          <FaUpload /> Upload Files
        </button>

        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 flex items-center gap-2 px-4 py-2 rounded w-full">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Upload File</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full bg-gray-700 text-white rounded"
            />
            <div className="flex justify-end mt-4">
              <button onClick={handleUpload} className="bg-green-600 hover:bg-green-700 mr-2 px-4 py-2 rounded">
                Upload
              </button>
              <button onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}