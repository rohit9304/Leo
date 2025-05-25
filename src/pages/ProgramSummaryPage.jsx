import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LearnerComparisonChart from "../components/LearnerComparisonChart";

const ProgramSummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Program Summary Page
          </h1>
          <LearnerComparisonChart />
        </main>
      </div>
    </div>
  );
};

export default ProgramSummaryPage;
