import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../utils/Loading";

export default function LearningPathTable() {
  const [learningPaths, setLearningPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jrs: "",
    learningPathName: "",
    url: "",
    planId: "",
    status: "",
  });

  const fetchLearningPaths = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/learningPath")
      .then((response) => {
        setLearningPaths(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/learningPath", formData);
      setShowForm(false);
      setFormData({
        jrs: "",
        learningPathName: "",
        url: "",
        planId: "",
        status: "",
      });
      fetchLearningPaths();
    } catch (error) {
      console.error(error);
      alert("Failed to add data");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">JRS</th>
            <th className="p-3">Learning Path Name</th>
            <th className="p-3">URL</th>
            <th className="p-3">Plan ID</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {learningPaths.map((path, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{path.jrs}</td>
              <td className="p-3">{path.learningPathName}</td>
              <td className="p-3 text-blue-600 underline">
                <a href={path.url} target="_blank" rel="noopener noreferrer">
                  {path.url}
                </a>
              </td>
              <td className="p-3">{path.planId}</td>
              <td className="p-3">{path.status}</td>
            </tr>
          ))}

          {showForm && (
            <tr className="border-t bg-gray-50">
              <td className="p-2">
                <input
                  name="jrs"
                  value={formData.jrs}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                  placeholder="Enter JRS"
                />
              </td>
              <td className="p-2">
                <input
                  name="learningPathName"
                  value={formData.learningPathName}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                  placeholder="Learning Path Name"
                />
              </td>
              <td className="p-2">
                <input
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                  placeholder="URL"
                />
              </td>
              <td className="p-2">
                <input
                  name="planId"
                  value={formData.planId}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                  placeholder="Plan ID"
                />
              </td>
              <td className="p-2 flex gap-2">
                <input
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border px-2 py-1 w-full"
                  placeholder="Status"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!showForm && (
        <div className="mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New
          </button>
        </div>
      )}
    </div>
  );
}
