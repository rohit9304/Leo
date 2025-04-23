import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewJoinee from "./pages/NewJoinee";
import SpecialityLearningPaths from "./pages/SpecialityLearningPaths";
import Cohorts from "./pages/Cohorts";

function App() {
  console.log(1);
  return (
    <div>
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<SpecialityLearningPaths />} />
          {/* <Route path="/program-summary" element={<ProgramSummary />} /> */}
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/new-joinees" element={<NewJoinee />} />
          {/* <Route path="/speciality-config" element={<SpecialityConfig />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
