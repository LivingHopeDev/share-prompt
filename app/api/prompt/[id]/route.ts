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
    const existinPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existinPrompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      );
    }
    existinPrompt.prompt = prompt;
    existinPrompt.tag = tag;
    await existinPrompt.save();
    return new NextResponse(JSON.stringify(existinPrompt), { status: 200 });
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
