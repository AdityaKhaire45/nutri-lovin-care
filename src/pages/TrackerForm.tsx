import React, { useState } from "react";
import { addMeal, addWaterLog } from "@/lib/supabase-queries";
import { useAuth } from "@/context/AuthContext";

function TrackerForm({ onSave }: { onSave?: () => void }) {
  const [meal, setMeal] = useState({ description: "", calories: "", mealTime: "" });
  const [water, setWater] = useState({ amount_ml: "", logged_at: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleMealChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleWaterChange = (e) => {
    setWater({ ...water, [e.target.name]: e.target.value });
  };

  const handleMealSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await addMeal({
      user,
      description: meal.description,
      calories: Number(meal.calories),
      mealTime: meal.mealTime || new Date().toISOString(),
    });
    setLoading(false);
    if (error) setMessage("Error saving meal log");
    else {
      setMessage("Meal log saved!");
      setMeal({ description: "", calories: "", mealTime: "" });
      if (onSave) onSave();
    }
  };

  const handleWaterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await addWaterLog({
      user,
      amount_ml: Number(water.amount_ml)
    });
    setLoading(false);
    if (error) setMessage("Error saving water log");
    else {
      setMessage("Water log saved!");
      setWater({ amount_ml: "", logged_at: "" });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, background: "#f8f8f8", borderRadius: 12 }}>
      <h2>Track Your Meal</h2>
      <form onSubmit={handleMealSubmit} style={{ marginBottom: 32 }}>
        <input
          name="description"
          placeholder="Meal Description"
          value={meal.description}
          onChange={handleMealChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          name="calories"
          type="number"
          placeholder="Calories"
          value={meal.calories}
          onChange={handleMealChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          name="mealTime"
          type="datetime-local"
          value={meal.mealTime}
          onChange={handleMealChange}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Saving..." : "Save Meal Log"}
        </button>
      </form>

      <h2>Track Your Water</h2>
      <form onSubmit={handleWaterSubmit}>
        <input
          name="amount_ml"
          type="number"
          placeholder="Amount (ml)"
          value={water.amount_ml}
          onChange={handleWaterChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          name="logged_at"
          type="datetime-local"
          value={water.logged_at}
          onChange={handleWaterChange}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Saving..." : "Save Water Log"}
        </button>
      </form>
      {message && <div style={{ marginTop: 16, color: "#333" }}>{message}</div>}
    </div>
  );
}

export default TrackerForm;
