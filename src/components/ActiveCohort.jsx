import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ActiveCohorts() {
  const [cohorts, setCohorts] = useState([]);
  const market1 = localStorage.getItem("market") || "ALL";
  const [market, setMarket] = useState(market1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCohort, setNewCohort] = useState({
    cohortName: "",
    geo: "",
    market: "",
    educationManager: "",
    endDate: "",
    startDate: "",
    status: "",
    indctionProjectedEndDate: "",
    indctionProjectedStartDate: "",
    specialityTrainingStartDate: "",
    essentialProjectedndDate: "",
    essentialStartDate: "",
    y1GrowthSurveyEndDate: "",
    y1GrowthSurveyStartDate: "",
    stayAheadEventEndDate: "",
    stayAHeadEventStartDate: "",
  });

  const [editCohortId, setEditCohortId] = useState(null);
  const [editCohortData, setEditCohortData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCohorts();
  }, []);

  const fetchCohorts = async (selectedMarket = "ALL") => {
    try {
      const url =
        selectedMarket === "ALL"
          ? "http://localhost:8080/api/cohorts"
          : `http://localhost:8080/api/cohorts?market=${selectedMarket}`;
      const response = await axios.get(url);
      setCohorts(response.data);
    } catch (error) {
      console.error("Error fetching cohorts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cohorts/${id}`);
      fetchCohorts(market);
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
      if (isEditMode) {
        await axios.put(
          `http://localhost:8080/api/cohorts/${editCohortData.id}`,
          editCohortData
        );
      } else {
        await axios.post("http://localhost:8080/api/cohorts", newCohort);
      }
      setShowAddModal(false);
      setIsEditMode(false);
      setNewCohort({
        cohortName: "",
        geo: "",
        market: "",
        educationManager: "",
        endDate: "",
        startDate: "",
        status: "",
        indctionProjectedEndDate: "",
        indctionProjectedStartDate: "",
        specialityTrainingStartDate: "",
        essentialProjectedndDate: "",
        essentialStartDate: "",
        y1GrowthSurveyEndDate: "",
        y1GrowthSurveyStartDate: "",
        stayAheadEventEndDate: "",
        stayAHeadEventStartDate: "",
      });
      fetchCohorts(market);
    } catch (error) {
      console.error("Error submitting cohort:", error);
    }
  };

  const handleEditClick = (cohort) => {
    setEditCohortData(cohort);
    setIsEditMode(true);
    setShowAddModal(true);
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
      fetchCohorts(market);
    } catch (error) {
      console.error("Error updating cohort:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCohortId(null);
  };

  const handleMarketChange = (e) => {
    setMarket(e.target.value);
    fetchCohorts(e.target.value);
  };

  return (
    <div className="p-6">
      {/* Market Filter */}
      <div className="mb-4 flex gap-4 items-center">
        <select
          value={market}
          onChange={handleMarketChange}
          className="border p-2 rounded"
        >
          <option value="ALL">All Markets</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="India">India</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      {/* Table */}
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
                        <option value="">Select</option>
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
                    <td className="p-3">{cohort.cohortName}</td>
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
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => navigate(`/associates/${cohort.id}`)}
                      >
                        View
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
        </tbody>
      </table>

      {/* Add New Cohort Button */}
      <div className="mt-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          Add New Cohort
        </button>
      </div>

      {/* Modal Form */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddCohort}
            className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Add New Cohort</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(isEditMode ? editCohortData : newCohort).map(
                ([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium capitalize mb-1">
                      {key}
                    </label>
                    <input
                      type={
                        key.toLowerCase().includes("date") ? "date" : "text"
                      }
                      name={key}
                      value={value}
                      onChange={
                        isEditMode ? handleEditInputChange : handleInputChange
                      }
                      className="w-full border px-3 py-1 rounded"
                    />
                  </div>
                )
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setIsEditMode(false);
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
