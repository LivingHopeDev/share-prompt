import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
};
