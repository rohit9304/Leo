import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewJoineeTable = () => {
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedLearners, setSelectedLearners] = useState([]);
  const [learners, setLearners] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLearners();
    fetchCohorts();
  }, []);

  const fetchLearners = () => {
    axios
      .get("http://localhost:8080/api/learners")
      .then((res) => {
        console.log("Learners:", res.data);
        setLearners(res.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching learners:", error));
  };

  const fetchCohorts = () => {
    axios
      .get("http://localhost:8080/api/cohorts")
      .then((res) => {
        console.log("Cohorts:", res.data);
        setCohorts(res.data);
      })
      .catch((error) => console.error("Error fetching cohorts:", error));
  };

  const filteredLearners = learners.filter(
    (learner) =>
      learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.cnum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLearnerSelection = (id) => {
    setSelectedLearners((prev) =>
      prev.includes(id)
        ? prev.filter((learnerId) => learnerId !== id)
        : [...prev, id]
    );
  };

  const assignToCohort = async () => {
    if (selectedCohort && selectedLearners.length > 0) {
      const learnersToAssign = learners.filter((learner) =>
        selectedLearners.includes(learner.cnum)
      );

      const payload = {
        cohortId: selectedCohort,
        learners: learnersToAssign,
      };

      try {
        await axios.post(
          "http://localhost:8080/api/associates/assign",
          payload
        );
        navigate(`/associates/${selectedCohort}`);
      } catch (error) {
        console.error("Error assigning learners to cohort:", error);
        alert("Failed to assign learners. Please try again.");
      }
    } else {
      alert("Please select at least one learner and a cohort.");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">New Joinees</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-medium">Learner ID</th>
              <th className="px-4 py-2 text-left font-medium">Learner Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Band</th>
              <th className="px-4 py-2 text-left font-medium">JRS</th>
              <th className="px-4 py-2 text-left font-medium">Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredLearners.map((learner) => (
              <tr key={learner.id} className="border-t">
                <td className="px-4 py-2">{learner.cnum}</td>
                <td className="px-4 py-2">{learner.name}</td>
                <td className="px-4 py-2">{learner.internetEmail}</td>
                <td className="px-4 py-2">{learner.bandCd}</td>
                <td className="px-4 py-2">{learner.jrs}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedLearners.includes(learner.cnum)}
                    onChange={() => toggleLearnerSelection(learner.cnum)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <label htmlFor="cohort" className="block mb-2 font-medium">
          Select Cohort
        </label>
        <select
          id="cohort"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
        >
          <option value="">Select Cohort</option>
          {cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.id}>
              {cohort.cohortName}
            </option>
          ))}
        </select>

        <button
          onClick={assignToCohort}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Assign Learners to Cohort
        </button>
      </div>
    </div>
  );
};

export default NewJoineeTable;
