import { prismaClient } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "zod";

const DownvoteSchema = z.object({
  streamId: z.string(),
});

export async function DELETE(req: NextRequest) {
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

  const data = DownvoteSchema.parse(await req.json());

  try {
    // check if downvote already exists
    const existing = await prismaClient.downvote.findUnique({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });

    if (existing) {
      // remove downvote (toggle off)
      await prismaClient.downvote.delete({
        where: {
          userId_streamId: {
            userId: user.id,
            streamId: data.streamId,
          },
        },
      });
      return NextResponse.json({ message: "Downvote removed" });
    } else {
      // create new downvote
      await prismaClient.downvote.create({
        data: {
          userId: user.id,
          streamId: data.streamId,
        },
      });
      return NextResponse.json({ message: "Downvoted" });
    }
  } catch (e) {
    console.error("Downvote API error:", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
