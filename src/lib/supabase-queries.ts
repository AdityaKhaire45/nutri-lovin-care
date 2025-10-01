import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Add a meal for the current user
export async function addMeal({ user, mealTime, description, calories }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("meals")
    .insert([
      {
        user_id: user.id,
        meal_time: mealTime, // ISO string
        description,
        calories,
      },
    ]);
  return { data, error };
}

// Fetch meals for the current user (optionally for a specific day)
export async function fetchMeals({ user, day }) {
  if (!user) throw new Error("Not authenticated");
  let query = supabase
    .from("meals")
    .select("*")
    .eq("user_id", user.id)
    .order("meal_time", { ascending: true });
  if (day) {
    query = query.gte("meal_time", `${day}T00:00:00.000Z`).lte("meal_time", `${day}T23:59:59.999Z`);
  }
  const { data, error } = await query;
  return { data, error };
}

// Add a water log for the current user
export async function addWaterLog({ user, amount_ml }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("water_logs")
    .insert([
      {
        user_id: user.id,
        amount_ml,
      },
    ]);
  return { data, error };
}

// Fetch water logs for the current user (optionally for a specific day)
export async function fetchWaterLogs({ user, day }) {
  if (!user) throw new Error("Not authenticated");
  let query = supabase
    .from("water_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("logged_at", { ascending: true });
  if (day) {
    query = query.gte("logged_at", `${day}T00:00:00.000Z`).lte("logged_at", `${day}T23:59:59.999Z`);
  }
  const { data, error } = await query;
  return { data, error };
}

// Add a badge for the current user
export async function addBadge({ badge_key }) {
  const { user } = useAuth();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("badges")
    .insert([
      {
        user_id: user.id,
        badge_key,
      },
    ]);
  return { data, error };
}

// Fetch badges for the current user
export async function fetchBadges() {
  const { user } = useAuth();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false });
  return { data, error };
}

// Add a progress entry for the current user
export async function addProgress({ user, date, weight_kg, notes }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("progress")
    .insert([
      {
        user_id: user.id,
        date,
        weight_kg,
        notes,
      },
    ]);
  return { data, error };
}

// Fetch progress for the current user
export async function fetchProgress({ user }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });
  return { data, error };
}

// Add a meal suggestion for the current user
export async function addMealSuggestion({ user, suggestion }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("meal_suggestions")
    .insert([
      {
        user_id: user.id,
        suggestion,
      },
    ]);
  return { data, error };
}

// Fetch meal suggestions for the current user
export async function fetchMealSuggestions({ user }) {
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("meal_suggestions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return { data, error };
}

// Add or update a streak for the current user
export async function upsertStreak({ type, current_streak, longest_streak }) {
  const { user } = useAuth();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("streaks")
    .upsert([
      {
        user_id: user.id,
        type,
        current_streak,
        longest_streak,
        updated_at: new Date().toISOString(),
      },
    ], { onConflict: "user_id,type" });
  return { data, error };
}

// Fetch streaks for the current user
export async function fetchStreaks() {
  const { user } = useAuth();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("streaks")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });
  return { data, error };
}
