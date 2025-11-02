
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: { type: Type.STRING, description: "The name of the recipe." },
        description: { type: Type.STRING, description: "A brief, enticing description of the dish." },
        difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'], description: "The cooking difficulty." },
        prepTime: { type: Type.STRING, description: "Estimated preparation and cooking time, e.g., '45 mins'." },
        calories: { type: Type.INTEGER, description: "Estimated calorie count per serving." },
        ingredients: {
          type: Type.ARRAY,
          description: "List of ingredients for the recipe.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              quantity: { type: Type.STRING },
              inFridge: { type: Type.BOOLEAN, description: "True if the ingredient is likely visible in the user's photo, false otherwise." }
            },
            required: ["name", "quantity", "inFridge"]
          }
        },
        instructions: {
          type: Type.ARRAY,
          description: "Step-by-step cooking instructions.",
          items: { type: Type.STRING }
        },
        dietaryTags: {
            type: Type.ARRAY,
            description: "A list of relevant dietary tags, like 'Vegetarian', 'Gluten-Free', etc.",
            items: { type: Type.STRING }
        }
      },
      required: ["recipeName", "description", "difficulty", "prepTime", "calories", "ingredients", "instructions"]
    }
};


export async function getRecipesFromImage(imageDataUrl: string, filters: string[]): Promise<Recipe[]> {
  const base64Data = imageDataUrl.split(',')[1];

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Data,
    },
  };

  const filterText = filters.length > 0 ? `The user has specified the following dietary preferences: ${filters.join(', ')}. All suggested recipes MUST adhere to these restrictions.` : 'Provide a variety of recipes.';

  const prompt = `
    You are an expert culinary assistant. Analyze the ingredients in this photo of a refrigerator.
    Based ONLY on the visible ingredients, suggest 3 to 5 creative recipes.
    For each recipe, provide a detailed plan. If a common staple ingredient (like oil, salt, pepper) isn't visible but is essential, assume the user has it and mark 'inFridge' as true. For all other non-visible ingredients, mark 'inFridge' as false.
    ${filterText}
    Return the recipes in a valid JSON array format according to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: recipeSchema,
      }
    });

    const jsonText = response.text.trim();
    const recipes = JSON.parse(jsonText);
    return recipes as Recipe[];

  } catch (error) {
    console.error("Error generating recipes from Gemini:", error);
    throw new Error("Failed to parse recipes from AI response.");
  }
}
