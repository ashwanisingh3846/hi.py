import { prismaClient } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { GetVideoDetails } from "youtube-search-api";
var YT_REGEX =  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
const CreateStreamSchema = z.object({
        creatorId : z.string(),
        url : z.string()  
});
export async function POST(req: NextRequest) {
            const data =  CreateStreamSchema.parse(await req.json());
            console.log(data.url)
            const isYtb = YT_REGEX.test(data.url);
            console.log("this is the "+isYtb)
            if(isYtb){
                const extractedId = data.url.split("?v=")[1];
                const res =  await GetVideoDetails(extractedId);
                const thumbnail = res.thumbnail.thumbnails;
                thumbnail.sort((a: { width: number }, b: { width: number }) => a.width - b.width);
                    const stream = await prismaClient.stream.create({
                    data : {
                        userId : data.creatorId,
                        url : data.url,
                        type : "Youtube",
                        extractedId : extractedId,
                        title : res.title ?? "Cant find title",
                        BigThumbnail :(thumbnail[thumbnail.length - 1]).url ?? "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJ8ZW58MHx8MHx8fDA%3D",
                        SmallThumbnail :(thumbnail.length > 1 ? (thumbnail[thumbnail.length - 2]).url : (thumbnail[thumbnail.length - 1]).url) ?? "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cml2ZXJ8ZW58MHx8MHx8fDA%3D"
                    }
                })
                return NextResponse.json({
                    message:"Stream created successfully",
                    id : stream.id,
                });
            }
            else{
                return NextResponse.json({error:"Invalid URL",
                    status:400
            });
        }
    }
export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    if(!creatorId){
        return NextResponse.json({error:"creatorId not found",
            status:400
        });
    }
    const streams = await prismaClient.stream.findMany({
        where : {
            userId : creatorId
        }
    })
    return NextResponse.json({streams});
}
