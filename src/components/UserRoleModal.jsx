import React, { useState, useEffect } from "react";

export default function UserRoleModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    emailId: "",
    role: "",
    program: "",
    status: "",
    market: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else
      setFormData({
        emailId: "",
        role: "",
        program: "",
        status: "",
        market: "",
      });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit" : "Add"} User Role
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Email ID"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            placeholder="Program"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="market"
            value={formData.market}
            onChange={handleChange}
            placeholder="Market"
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
