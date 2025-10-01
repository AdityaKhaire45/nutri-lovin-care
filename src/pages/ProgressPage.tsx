import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { addProgress, fetchProgress } from "@/lib/supabase-queries";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProgressPage = () => {
  const { user } = useAuth();
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProgress();
    // eslint-disable-next-line
  }, []);

  async function loadProgress() {
    setLoading(true);
  const { data } = await fetchProgress({ user });
    setProgress(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const today = new Date().toISOString().split("T")[0];
  const { error } = await addProgress({ user, date: today, weight_kg: parseFloat(weight), notes });
    if (error) setMessage("Error saving weight");
    else {
      setMessage("Weight saved!");
      setWeight("");
      setNotes("");
      loadProgress();
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Progress</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required
          className="border rounded px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="border rounded px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Save</button>
      </form>
      {message && <div className="mb-4 text-green-700">{message}</div>}
      <h3 className="font-semibold mb-2">Weight Progress</h3>
      {loading ? (
        <div>Loading...</div>
      ) : progress.length === 0 ? (
        <div>No progress data yet.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progress.slice().reverse()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[dataMin => Math.floor(dataMin - 2), dataMax => Math.ceil(dataMax + 2)]} />
            <Tooltip />
            <Line type="monotone" dataKey="weight_kg" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProgressPage;
