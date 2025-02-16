import { NextResponse } from "next/server";
import { GPT_API_KEY } from "@/constants";

export async function POST(request: Request) {
  const { description, card, position } = await request.json();

  const requestBody = {
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: `You are a Major Arcana Tarot reader. Client asks this question “${description}” and draws the “${card}” card in “${position}” position. Interpret to the client in no more than 100 words.`,
      },
    ],
  };

  const apiKey = GPT_API_KEY;
  const baseURL = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const readingResponse = await fetch(baseURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!readingResponse.ok) {
      throw new Error("Failed to fetch response from OpenAI");
    }

    const readingData = await readingResponse.json();
    return NextResponse.json(readingData);
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
