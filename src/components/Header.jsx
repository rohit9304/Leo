import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("user-role");
    if (role === "Super User") {
      setIsSuperAdmin(true);
    }
  }, []);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-2xl font-bold px-1">
        Learning & Knowledge Onboarding
      </div>
      <nav className="space-x-4 text-gray-600 flex items-center">
        <a href="#" className="hover:text-black">
          Home
        </a>
        <a href="#" className="hover:text-black">
          About
        </a>
        <a href="#" className="hover:text-black">
          Contact
        </a>
        {isSuperAdmin && (
          <button
            onClick={() => navigate("/manage-user-roles")}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Manage User Roles
          </button>
        )}
      </nav>
    </header>
  );
}
