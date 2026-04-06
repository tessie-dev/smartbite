type SuggestMealRequestBody = {
  question?: string;
};

type Suggestion = {
  title: string;
  reason: string;
  estimatedCalories?: number;
};

type SuggestMealResponseBody = {
  summary: string;
  suggestions: Suggestion[];
};

export const suggestMeal = async (req: any, res: any) => {
  if (req.method && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as SuggestMealRequestBody;
  const question = body.question?.trim();

  if (!question) {
    return res.status(400).json({ error: "question is required" });
  }

  const response: SuggestMealResponseBody = {
    summary:
      "A lighter high-protein meal would be a solid next choice based on your request.",
    suggestions: [
      {
        title: "Grilled chicken salad",
        reason: "High protein and moderate calories make it a safe balanced next meal.",
        estimatedCalories: 420,
      },
      {
        title: "Salmon rice bowl",
        reason: "This gives you a more filling option with protein, carbs, and healthy fats.",
        estimatedCalories: 520,
      },
      {
        title: "Greek yogurt fruit bowl",
        reason: "A good option if you want something lighter or more snack-sized.",
        estimatedCalories: 280,
      },
    ],
  };

  return res.status(200).json(response);
};
