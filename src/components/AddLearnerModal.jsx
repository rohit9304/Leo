import React, { useState } from "react";
import axios from "axios";

const AddLearnerModal = ({ cohort, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    cnum: "",
    doj: "",
    jrs: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8080/api/associates`, {
        ...formData,
        cohortId: cohort.id,
      });
      onAdd(res.data); // update learners in parent
    } catch (error) {
      console.error("Error adding learner:", error);
      alert("Failed to add learner. Check console for details.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Learner</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Cohort</label>
            <input
              type="text"
              value={cohort.cohortName}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CNUM</label>
            <input
              type="text"
              name="cnum"
              value={formData.cnum}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Joining</label>
            <input
              type="date"
              name="doj"
              value={formData.doj}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">JRS</label>
            <input
              type="text"
              name="jrs"
              value={formData.jrs}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Learner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLearnerModal;
