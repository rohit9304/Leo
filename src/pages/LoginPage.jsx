import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const navigate = useNavigate();

  const handleFetchRoles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user-roles/email/${email}`
      );
      setUserRoles(response.data);
    } catch (error) {
      alert("No roles found or error fetching roles.");
      console.error(error);
    }
  };

  const handleLogin = () => {
    // Redirect based on role + program
    const userObj = userRoles.find(
      (u) => u.role === selectedRole && u.program === selectedProgram
    );
    console.log(userObj);
    localStorage.setItem("market", userObj.market);
    localStorage.setItem("user-role", userObj.role);
    console.log("apple", userObj);
    if (selectedProgram === "EAI Onboarding") {
      navigate("/cohorts"); // or any route based on your logic
    } else {
      alert("No route configured for this program.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={handleFetchRoles}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Fetch Roles
        </button>

        {userRoles.length > 0 && (
          <>
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {[...new Set(userRoles.map((u) => u.role))].map((role, idx) => (
                <option key={idx} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option value="">Select Program</option>
              {[...new Set(userRoles.map((u) => u.program))].map(
                (program, idx) => (
                  <option key={idx} value={program}>
                    {program}
                  </option>
                )
              )}
            </select>

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-2 rounded"
              disabled={!selectedRole || !selectedProgram}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
