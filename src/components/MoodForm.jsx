import React, { useState } from "react";

function MoodForm() {
  const [emoji, setEmoji] = useState("😊");
  const [note, setNote] = useState("");

  const addMood = () => {
    if (!note) return alert("Please write a note!");

    const newEntry = {
      id: Date.now(),
      emoji,
      note,
      date: new Date().toLocaleDateString(),
    };

    const saved = JSON.parse(localStorage.getItem("moods")) || [];
    localStorage.setItem("moods", JSON.stringify([...saved, newEntry]));

    setNote("");
    // quick and simple: refresh so list/chart read localStorage
    window.location.reload();
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
        <option>😊</option>
        <option>😢</option>
        <option>😡</option>
        <option>😴</option>
        <option>😎</option>
      </select>
      <input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ marginLeft: "10px", padding: "5px" }}
      />
      <button onClick={addMood} style={{ marginLeft: "10px" }}>
        Add
      </button>
    </div>
  );
}

export default MoodForm;
