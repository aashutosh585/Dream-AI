import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedSite } from '../../types';
import.meta.env;

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const SITE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    html: {
      type: Type.STRING,
      description: "The complete, valid HTML5 code for the index.html file. It MUST start with <!DOCTYPE html> and include the <html>, <head>, and <body> tags. It should include a viewport meta tag and link to 'style.css' and 'script.js'. It MUST include a semantic footer.",
    },
    css: {
      type: Type.STRING,
      description: "The complete CSS styles for style.css. Modern, responsive, and aesthetic.",
    },
    javascript: {
      type: Type.STRING,
      description: "Functional JavaScript code for script.js to add interactivity. Do not include markdown backticks.",
    },
    explanation: {
      type: Type.STRING,
      description: "A very brief (one sentence) summary of what was built or changed.",
    }
  },
  required: ["html", "css", "javascript"],
};

export const generateWebsite = async (prompt: string): Promise<GeneratedSite> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert AI Web Developer. 
      Create a fully functional, responsive, and modern website based on the following user request: "${prompt}".
      
      Requirements:
      1. HTML: Return the FULL source code for index.html. It must start with <!DOCTYPE html>. Include <head> with meta tags, title, and <link rel="stylesheet" href="style.css">. Include <body> with semantic tags (<header>, <main>, <footer>) and <script src="script.js"></script>.
      2. CSS: Use modern CSS (Flexbox/Grid). Make it look professional and polished.
      3. JS: Add meaningful interactivity appropriate for the requested site type.
      4. Footer: Ensure the website has a proper footer section.
      5. Output: Return the code for the three files (index.html, style.css, script.js) in the JSON format specified.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: SITE_SCHEMA,
        temperature: 0.7, 
      }
    });

    if (!response.text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(response.text) as GeneratedSite;
    return data;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const updateWebsite = async (currentSite: GeneratedSite, userPrompt: string): Promise<GeneratedSite> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert AI Web Developer. The user wants to update their existing website.
      
      CURRENT CODE:
      
      --- HTML ---
      ${currentSite.html}
      
      --- CSS ---
      ${currentSite.css}
      
      --- JS ---
      ${currentSite.javascript}
      
      USER REQUEST: "${userPrompt}"
      
      INSTRUCTIONS:
      1. Modify the code to satisfy the user's request.
      2. Return the FULL updated code for all three files (HTML, CSS, JS). Do not return partial snippets.
      3. Maintain the existing structure unless explicitly asked to change it.
      4. Ensure the output matches the JSON schema provided.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: SITE_SCHEMA,
        temperature: 0.7, 
      }
    });

    if (!response.text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(response.text) as GeneratedSite;
    return data;

  } catch (error) {
    console.error("Gemini Update Error:", error);
    throw error;
  }
};