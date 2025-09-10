import { prismaClient } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const data = UpvoteSchema.parse(await req.json());

  try {
    // Check if the user already upvoted this stream
    const existing = await prismaClient.upvote.findUnique({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });

    if (existing) {
      // Toggle off → remove upvote
      await prismaClient.upvote.delete({
        where: {
          userId_streamId: {
            userId: user.id,
            streamId: data.streamId,
          },
        },
      });
      return NextResponse.json({ message: "Upvote removed" });
    } else {
      // Toggle on → add upvote
      await prismaClient.upvote.create({
        data: {
          userId: user.id,
          streamId: data.streamId,
        },
      });
      return NextResponse.json({ message: "Upvoted" });
    }
  } catch (e) {
    console.error("Upvote API error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
