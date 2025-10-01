import React, { useEffect, useState } from "react";
import { addMeal, fetchMeals } from "@/lib/supabase-queries";
import { TrackerForm } from "@/components/TrackerForm";

const DailyFoodLog = () => {
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({ calories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const { data } = await fetchMeals({ user, day: today });
    setMeals(data || []);
    setTotals({
      calories: (data || []).reduce((sum, m) => sum + (m.calories || 0), 0),
    });
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Food Log</h2>
      <TrackerForm onSave={loadMeals} />
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Today's Meals</h3>
        {loading ? (
          <div>Loading...</div>
        ) : meals.length === 0 ? (
          <div>No meals logged yet.</div>
        ) : (
          <ul className="space-y-2">
            {meals.map((meal) => (
              <li key={meal.id} className="border rounded p-2 flex justify-between">
                <span>{meal.description}</span>
                <span>{meal.calories} kcal</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 font-bold">Total Calories: {totals.calories} kcal</div>
      </div>
      {/* TODO: Add Nutrition API search bar here */}
    </div>
  );
};

export default DailyFoodLog;
