import React, { useState, useEffect } from "react";
import { addWaterLog, fetchWaterLogs } from "@/lib/supabase-queries";
import { useAuth } from "@/context/AuthContext";

const DAILY_GOAL_ML = 2000; // 2 liters
const GLASS_SIZE = 250; // ml

const WaterTracker = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line
  }, []);

  async function loadLogs() {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const { data } = await fetchWaterLogs({ user, day: today });
    setLogs(data || []);
    setTotal((data || []).reduce((sum, l) => sum + (l.amount_ml || 0), 0));
    setLoading(false);
  }

  async function handleAddGlass() {
    setMessage("");
    const { error } = await addWaterLog({ user, amount_ml: GLASS_SIZE });
    if (error) setMessage("Error adding glass");
    else {
      setMessage("+1 glass added!");
      loadLogs();
    }
  }

  const percent = Math.min(100, Math.round((total / DAILY_GOAL_ML) * 100));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Water Tracker</h2>
      <button onClick={handleAddGlass} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        +1 Glass ({GLASS_SIZE}ml)
      </button>
      <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
        <div
          className="bg-blue-500 h-6 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mb-2">Total: {total} ml / {DAILY_GOAL_ML} ml</div>
      {message && <div className="text-green-700 mb-2">{message}</div>}
      <h3 className="font-semibold mb-2">Today's Water Logs</h3>
      {loading ? (
        <div>Loading...</div>
      ) : logs.length === 0 ? (
        <div>No water logs yet.</div>
      ) : (
        <ul className="space-y-1">
          {logs.map((log) => (
            <li key={log.id} className="text-sm">
              {log.amount_ml} ml at {new Date(log.logged_at).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaterTracker;
