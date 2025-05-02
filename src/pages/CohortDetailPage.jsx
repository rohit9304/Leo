import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const CohortDetailPage = () => {
  const { cohortId } = useParams();
  const [cohort, setCohort] = useState(null);
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cohorts/${cohortId}/learners`)
      .then((res) => {
        setCohort(res.data.cohort);
        setLearners(res.data.learners);
        console.log(res.data);
      })
      .catch((error) => console.error("Error fetching cohort details:", error));
  }, [cohortId]);

  if (!cohort) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Associates Onboarding - CIC India
          </h2>

          <div className="border p-4 rounded mb-6 bg-gray-50">
            <p>
              <strong>Cohort Name:</strong> {cohort.cohortName}
            </p>
            <p>
              <strong>Start Date:</strong> {cohort.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {cohort.endDate}
            </p>
            <p>
              <strong>Enrolled:</strong> {learners.length}
            </p>
            <p>
              <strong>Edn Manager:</strong> {cohort.educationManager}
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3">Learners</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">
                    Learner ID
                  </th>
                  <th className="px-4 py-2 text-left font-medium">
                    Learner Name
                  </th>
                  <th className="px-4 py-2 text-left font-medium">DoJ</th>
                  <th className="px-4 py-2 text-left font-medium">JRS</th>
                  <th className="px-4 py-2 text-left font-medium">Select</th>
                </tr>
              </thead>
              <tbody>
                {learners.map((learner) => (
                  <tr key={learner.cnum} className="border-t">
                    <td className="px-4 py-2">{learner.cnum}</td>
                    <td className="px-4 py-2">{learner.name}</td>
                    <td className="px-4 py-2">
                      {learner.doj || "23-Sept-2024"}
                    </td>
                    <td className="px-4 py-2">{learner.jrs}</td>
                    <td className="px-4 py-2">
                      Modify | Change JRS | UnEnroll
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Send to DEF
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Send Reminders
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CohortDetailPage;
