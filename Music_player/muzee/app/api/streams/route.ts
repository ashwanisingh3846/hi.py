import { prismaClient } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { GetVideoDetails } from "youtube-search-api";

const YT_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
    });

    const DeleteStreamSchema = z.object({
    id: z.string(),
    });
    export async function POST(req: NextRequest) {
    const data = CreateStreamSchema.parse(await req.json());

    if (!YT_REGEX.test(data.url)) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const extractedId = data.url.match(YT_REGEX)![1];
    const res = await GetVideoDetails(extractedId);
    const thumbs = res.thumbnail.thumbnails;
    thumbs.sort((a: { width: number }, b: { width: number }) => a.width - b.width);

    const stream = await prismaClient.stream.create({
        data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        title: res.title ?? "Untitled",
        bigThumbnail: thumbs.pop()?.url ?? "",
        smallThumbnail: thumbs.pop()?.url ?? "",
        active: true,
        },
    });

    return NextResponse.json({ stream });
    }

    // DELETE: Remove a stream by ID
    export async function DELETE(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = DeleteStreamSchema.parse(body);
        const deleted = await prismaClient.stream.delete({
        where: { id },
        });

        return NextResponse.json({ success: true, deleted });
    } catch (err) {
        console.error("Failed to delete stream:", err);
        return NextResponse.json({ error: "Failed to delete stream" }, { status: 500 });
    }
}
