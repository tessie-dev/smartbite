import { SuggestMealRequest, SuggestMealResponse } from "@/types";

const SUGGEST_MEAL_URL = process.env.EXPO_PUBLIC_SUGGEST_MEAL_URL;

export async function suggestMeal(
  question: string
): Promise<SuggestMealResponse> {
  if (!SUGGEST_MEAL_URL) {
    throw new Error("Missing EXPO_PUBLIC_SUGGEST_MEAL_URL");
  }

  const payload: SuggestMealRequest = { question };

  const res = await fetch(SUGGEST_MEAL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `suggestMeal request failed: ${res.status} ${errorText || "Unknown error"}`
    );
  }

  return (await res.json()) as SuggestMealResponse;
}
