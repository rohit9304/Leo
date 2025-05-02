import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ActiveCohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [newCohort, setNewCohort] = useState({
    cohortName: "",
    startDate: "",
    endDate: "",
    educationManager: "",
    status: "",
  });
  const [showAddRow, setShowAddRow] = useState(false);
  const [editCohortId, setEditCohortId] = useState(null);
  const [editCohortData, setEditCohortData] = useState({});

  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cohorts");
      setCohorts(response.data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cohorts/${id}`);
      fetchCohorts();
    } catch (error) {
      console.error("Error deleting cohort:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCohort({ ...newCohort, [name]: value });
  };

  const handleAddCohort = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/cohorts", newCohort);
      setNewCohort({
        cohortName: "",
        startDate: "",
        endDate: "",
        educationManager: "",
        status: "",
      });
      setShowAddRow(false);
      fetchCohorts();
    } catch (error) {
      console.error("Error adding cohort:", error);
    }
  };

  const handleEditClick = (cohort) => {
    setEditCohortId(cohort.id);
    setEditCohortData({
      cohortName: cohort.cohortName,
      startDate: cohort.startDate,
      endDate: cohort.endDate,
      educationManager: cohort.educationManager,
      status: cohort.status,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCohortData({ ...editCohortData, [name]: value });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/cohorts/${id}`,
        editCohortData
      );
      setEditCohortId(null);
      fetchCohorts();
    } catch (error) {
      console.error("Error updating cohort:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCohortId(null);
  };

  return (
    <div className="p-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Cohort Name</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
            <th className="p-3">Edn Manager</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.length > 0 ? (
            cohorts.map((cohort) => (
              <tr key={cohort.id} className="border-b">
                {editCohortId === cohort.id ? (
                  <>
                    <td className="p-2">
                      <input
                        type="text"
                        name="cohortName"
                        value={editCohortData.cohortName}
                        onChange={handleEditInputChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        name="startDate"
                        value={editCohortData.startDate}
                        onChange={handleEditInputChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        name="endDate"
                        value={editCohortData.endDate}
                        onChange={handleEditInputChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        name="educationManager"
                        value={editCohortData.educationManager}
                        onChange={handleEditInputChange}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        name="status"
                        value={editCohortData.status}
                        onChange={handleEditInputChange}
                        className="border p-1 w-full"
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        onClick={() => handleSaveEdit(cohort.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">
                      <Link
                        to={`/cohort/${cohort.id}`} // Link to CohortDetails page with cohort ID
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {cohort.cohortName}
                      </Link>
                    </td>
                    <td className="p-3">{cohort.startDate}</td>
                    <td className="p-3">{cohort.endDate}</td>
                    <td className="p-3">{cohort.educationManager}</td>
                    <td className="p-3">{cohort.status}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => handleEditClick(cohort)}
                      >
                        Modify
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(cohort.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center">
                No cohorts available.
              </td>
            </tr>
          )}

          {/* Add New Cohort Row */}
          {showAddRow && (
            <tr className="border-b bg-gray-100">
              <td className="p-2">
                <input
                  type="text"
                  name="cohortName"
                  placeholder="Cohort Name"
                  value={newCohort.cohortName}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2">
                <input
                  type="date"
                  name="startDate"
                  value={newCohort.startDate}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2">
                <input
                  type="date"
                  name="endDate"
                  value={newCohort.endDate}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  name="educationManager"
                  placeholder="Edn Manager"
                  value={newCohort.educationManager}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                />
              </td>
              <td className="p-2">
                <select
                  name="status"
                  value={newCohort.status}
                  onChange={handleInputChange}
                  className="border p-1 w-full"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  onClick={handleAddCohort}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => setShowAddRow(false)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add New Cohort Button */}
      <div className="mt-6">
        {!showAddRow && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={() => setShowAddRow(true)}
          >
            Add New Cohort
          </button>
        )}
      </div>
    </div>
  );
}
