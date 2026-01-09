
import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Initialize GoogleGenAI using a named parameter and process.env.API_KEY directly as per guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getRecommendations(prompt: string): Promise<{ description: string; tracks: Partial<Track>[] }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert music DJ. Based on the user's mood or request: "${prompt}", recommend 5 conceptual tracks. 
        Return a JSON object with a brief description of why you chose these and a list of track objects.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              tracks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    artist: { type: Type.STRING },
                    genre: { type: Type.STRING },
                    duration: { type: Type.STRING }
                  },
                  required: ["title", "artist", "genre"]
                }
              }
            },
            required: ["description", "tracks"]
          }
        }
      });

      // Fix: Access response text using .text property as per guidelines
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        description: "I'm having trouble connecting to the musical hive mind, but here are some classics.",
        tracks: []
      };
    }
  }

  async generateDJSpeech(currentTrack: Track): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a cool, laid-back AI DJ named 'G-Mix'. Provide a 1-sentence intro for the track "${currentTrack.title}" by "${currentTrack.artist}". Make it sound like a radio host.`,
    });
    // Fix: Access response text using .text property as per guidelines
    return response.text || "Next up, a great track for you.";
  }
}
