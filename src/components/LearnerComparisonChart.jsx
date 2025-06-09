import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartTypes = ["Bar", "Line", "Pie"];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const LearnerComparisonChart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("Bar");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [assignedRes, unassignedRes, allRes] = await Promise.all([
          axios.get("http://localhost:8080/api/associates"),
          axios.get("http://localhost:8080/api/learners"),
          axios.get("http://localhost:8080/api/learners/all"),
        ]);

        const assignedCount = assignedRes.data.length;
        const unassignedCount = unassignedRes.data.length;
        const totalCount = allRes.data.length;

        setChartData([
          { type: "Assigned Learners", count: assignedCount },
          { type: "Unassigned Learners", count: unassignedCount },
          { type: "Total Learners", count: totalCount },
        ]);
      } catch (error) {
        console.error("Error fetching learner data:", error);
      }
    };

    fetchCounts();
  }, []);

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        );
      case "Line":
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        );
      case "Pie":
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-2 rounded"
        >
          {chartTypes.map((type) => (
            <option key={type} value={type}>
              {type} Chart
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default LearnerComparisonChart;
