type ImageData = {
  created: number;
  data: ImageItem[];
};

type ImageItem = {
  revised_prompt: string;
  url: string;
};

import { env } from "@/env.mjs";
import errorHandler from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import { APIError } from "openai/error";

export interface TextRequestBody {
  prompt?: string;
}

export const config = {
  runtime: "edge",
};

async function handler(req: NextRequest) {
  const { prompt } = (await req.json()) as TextRequestBody;

  let result = null;
  try {
    const apiUrl = "https://api.openai.com/v1/images/generations";

    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_TOKEN}`,
      },
      body: JSON.stringify({
        model: "dall-e-2", // "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "256x256", // "512x512",
      }),
    });

    if (resp.ok) {
      const json: ImageData = (await resp.json()) as ImageData;
      console.log("🚀 ~ file: generatePicture.ts:126 ~ handler ~ json:", json);
      result = { url: json.data[0]?.url, ok: true };
    } else {
      const json: APIError = await resp.json();
      result = { ...json, ok: false };
    }
  } catch (e) {
    console.log(e);
  }

  console.log("🚀 ~ file: vision.ts:81 ~ handler ~ result:", result);
  return NextResponse.json(result);
}

export default errorHandler(handler);
