import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Box,
  Grid,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MOODS = ["😊", "😢", "😡", "😴", "😎"];

export default function App() {
  const [selectedMood, setSelectedMood] = useState("😊");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moods")) || [];
    setEntries(saved);
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(entries));
  }, [entries]);

  const addMood = () => {
    if (!note.trim()) return;
    const newEntry = {
      id: Date.now(),
      mood: selectedMood,
      note: note.trim(),
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
    setNote("");
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // Prepare data for chart
  const moodCounts = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(moodCounts).map((m) => ({ mood: m, count: moodCounts[m] }));

  return (
    <>
      {/* App Bar */}
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, #4a90e2, #6366f1)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mood Journal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Mood Input Card */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              How are you feeling today?
            </Typography>

            {/* Mood Selector */}
            <Box sx={{ mb: 2 }}>
              {MOODS.map((m) => (
                <Chip
                  key={m}
                  label={m}
                  color={selectedMood === m ? "primary" : "default"}
                  onClick={() => setSelectedMood(m)}
                  sx={{ mr: 1, mb: 1, fontSize: "1.2rem" }}
                />
              ))}
            </Box>

            <TextField
              label="Write a note..."
              variant="outlined"
              fullWidth
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={addMood}>
              Save Mood
            </Button>
          </CardContent>
        </Card>

        {/* Mood Chart */}
        <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Mood Overview
          </Typography>
          {chartData.length === 0 ? (
            <Typography textAlign="center" color="text.secondary">
              No data yet.
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mood" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Mood History */}
        <Grid container spacing={2}>
          {entries.map((entry) => (
            <Grid item xs={12} key={entry.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="h4" component="span" sx={{ mr: 2 }}>
                      {entry.mood}
                    </Typography>
                    <Typography variant="body1">{entry.note}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entry.date}
                    </Typography>
                  </Box>
                  <Button color="error" onClick={() => deleteEntry(entry.id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
