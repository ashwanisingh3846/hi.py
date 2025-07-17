    "use client"
import {  signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react';
import  Button  from "@mui/material/Button";
export default function Appbar() {
    const session = useSession();
    return (
        <div className="sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 py-2 text-white  h-20 posion-fixed top-10 left-0 right-0 z-50">
            <h1 className="text-xl font-bold ">
                Play Music
            </h1>
        <div>
        {session?.data?.user && <Button variant="contained" color="primary"  
            onClick={()=>signOut()}
            >Logout</Button>}
            {!session?.data?.user && <Button 
            variant="contained" color="primary"  onClick={()=>signIn()}>Login</Button>
            }
        </div>
        </div> 
        </div>
    )
}