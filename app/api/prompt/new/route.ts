import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId, prompt, tag } = await req.json();

    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error) {
    console.error("Error creating a new prompt:", error);
    return NextResponse.json(
      { message: "Failed to create a new prompt" },
      { status: 500 }
    );
  }
};
