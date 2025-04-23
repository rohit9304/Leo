import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r min-h-screen">
      <nav className="flex flex-col gap-4 text-blue-600 font-medium">
        <Link to="/" className="hover:underline">
          Program Summary
        </Link>
        <Link to="/cohorts" className="hover:underline">
          Cohorts
        </Link>
        <Link to="/new-joinees" className="hover:underline">
          New Joinees
        </Link>
        <a to="#" className="hover:underline">
          Speciality Config
        </a>
      </nav>
    </aside>
  );
}
