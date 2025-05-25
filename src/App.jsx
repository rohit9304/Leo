import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewJoinee from "./pages/NewJoinee";
import SpecialityLearningPaths from "./pages/SpecialityLearningPaths";
import Cohorts from "./pages/Cohorts";
import CohortDetailPage from "./pages/CohortDetailPage";
import ProgramSummaryPage from "./pages/ProgramSummaryPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/program-summary" element={<ProgramSummaryPage />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/new-joinees" element={<NewJoinee />} />
          <Route path="/associates/:cohortId" element={<CohortDetailPage />} />
          <Route
            path="/speciality-config"
            element={<SpecialityLearningPaths />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
