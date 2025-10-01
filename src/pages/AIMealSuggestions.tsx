import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { addMealSuggestion, fetchMealSuggestions } from "@/lib/supabase-queries";

// Google Gemini API Key
const GOOGLE_API_KEY = "AIzaSyDT9R8maklkKUYXcLmNknYMLqWn_eDgn4k";

const AIMealSuggestions = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);


    async function handleSuggest() {
      setLoading(true);
      setSuggestion("");
      let aiSuggestion = "";
      let errorMsg = "";
      try {
        // Google Gemini 2.5 Flash-Lite API call
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" + GOOGLE_API_KEY,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                { parts: [ { text: `Suggest a healthy meal plan for this goal: ${goal}` } ] }
              ]
            })
          }
        );
        const data = await response.json();
        if (
          data &&
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text
        ) {
          aiSuggestion = data.candidates[0].content.parts[0].text;
        } else {
          errorMsg = data.error?.message || "No suggestion returned.";
        }
      } catch (err) {
        errorMsg = (err && err.message) || "Failed to fetch suggestion.";
      }
      if (aiSuggestion) {
        setSuggestion(aiSuggestion);
        if (user) {
          await addMealSuggestion({ user, suggestion: aiSuggestion });
          loadHistory();
        }
      } else {
        setSuggestion(errorMsg || "No suggestion available.");
      }
      setLoading(false);
    }

    async function loadHistory() {
      if (!user) return;
      const { data } = await fetchMealSuggestions({ user });
      setHistory(data || []);
    }

    React.useEffect(() => {
      loadHistory();
      // eslint-disable-next-line
    }, [user]);

    return (
      <div className="max-w-xl mx-auto mt-8 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-primary">AI Meal Suggestions</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
          <input
            className="flex-1 border-2 border-primary/40 focus:border-primary outline-none rounded-lg px-4 py-3 text-lg bg-zinc-50 dark:bg-zinc-800 transition-all shadow-sm"
            placeholder="What's your goal? (e.g. weight loss, muscle gain)"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleSuggest}
            className="bg-gradient-to-br from-primary to-accent text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || !goal}
          >
            {loading ? (
              <span className="flex items-center gap-2"><span className="animate-spin inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full"></span> Generating...</span>
            ) : (
              <span>Get Suggestion</span>
            )}
          </button>
        </div>       
        {suggestion && (
          <div className="mb-6 flex justify-center">
            <div className="max-w-lg bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-900 dark:text-green-100 rounded-xl px-6 py-4 shadow-inner border border-green-300 dark:border-green-700 animate-fade-in">
              <span className="font-semibold">AI Suggestion:</span>
              <div className="mt-2 whitespace-pre-line text-lg">{suggestion}</div>
            </div>
          </div>
        )}
        <h3 className="font-bold text-lg mb-3 text-primary">Suggestion History</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {history.length === 0 && <div className="text-zinc-500">No previous suggestions yet.</div>}
          {history.map((item) => (
            <div key={item.id} className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-800 dark:text-zinc-100 shadow-sm">
              {item.suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  };


export default AIMealSuggestions;
