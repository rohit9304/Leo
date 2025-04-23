import React, { useState } from "react";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-items-center items-center">
      <div className="text-2xl font-bold px-1">
        Learning & Knowledge Onboarding
      </div>
      <nav className="space-x-4 text-gray-600">
        <a href="#" className="hover:text-black">
          Home
        </a>
        <a href="#" className="hover:text-black">
          About
        </a>
        <a href="#" className="hover:text-black">
          Contact
        </a>
      </nav>
    </header>
  );
}
