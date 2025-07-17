
import { prismaClient } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

const CreateUpvoteSchema = z.object({
        streamId : z.string(),
});
export async function POST(req: NextRequest) {
            const session = await  getServerSession();
            const user = await prismaClient.user.findFirst({
                where : {
                    email : session?.user?.email ?? ""
                }
            })

            if(!user){
                return NextResponse.json({error:"User not found",
                    status:400
                });
            }
            
        try{
            const data = CreateUpvoteSchema.parse(await req.json());
            await prismaClient.upvote.delete({
                where: {
                    userId_streamId : {
                    userId : user.id,
                    streamId : data.streamId
                    }
                }
            })
        }
        catch(error){
            return NextResponse.json({error});
        }
}
