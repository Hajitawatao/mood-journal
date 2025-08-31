import React from "react";

function MoodList() {
  const moods = JSON.parse(localStorage.getItem("moods")) || [];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>History</h2>
      {moods.length === 0 && <p>No moods logged yet.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {moods.map((mood) => (
          <li key={mood.id} style={{ marginBottom: "8px" }}>
            <strong>{mood.date}</strong> - {mood.emoji} - {mood.note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodList;
