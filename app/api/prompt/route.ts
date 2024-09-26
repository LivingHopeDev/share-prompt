import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new NextResponse(JSON.stringify(prompts));
  } catch (error) {
    return NextResponse.json(
      { message: "failled to fetch all prompts" },
      { status: 500 }
    );
  }
};
