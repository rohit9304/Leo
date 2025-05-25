import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LearnerComparisonChart = () => {
  const [chartData, setChartData] = useState([]);

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

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LearnerComparisonChart;
