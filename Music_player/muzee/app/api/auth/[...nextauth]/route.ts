require("dotenv").config();
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "../../../lib/db";

export const authOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRETE ?? "",
        }),
    ],
    callbacks :{
        async signIn(params: any): Promise<boolean> {
            try{
                await prismaClient.user.create({
                data : {
                    email : params.user.email,
                    provider : "google"
                }
            })
            }catch(error){
                console.log(error);
            }
            return true
        }
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };