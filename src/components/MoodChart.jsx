import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function MoodChart() {
  const moods = JSON.parse(localStorage.getItem("moods")) || [];

  // Count emojis
  const counts = moods.reduce((acc, mood) => {
    acc[mood.emoji] = (acc[mood.emoji] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map((emoji) => ({
    emoji,
    count: counts[emoji],
  }));

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h2>Mood Overview</h2>
      {data.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <BarChart width={400} height={250} data={data} style={{ margin: "auto" }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="emoji" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4a90e2" />
        </BarChart>
      )}
    </div>
  );
}

export default MoodChart;
