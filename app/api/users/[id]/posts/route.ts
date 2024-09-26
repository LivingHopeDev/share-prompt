import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch all prompts" },
      { status: 500 }
    );
  }
};
