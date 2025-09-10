    "use client"
import {  signIn, signOut, useSession } from "next-auth/react";
import * as React from 'react';
import  Button  from "@mui/material/Button";
import { useSocket } from "./roomContext";
export let roomId:string;
export default function Appbar() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen]= React.useState(false)
  const joinRoom = useSocket().joinRoom;
  const id = inputRef.current?.value as string;
      const session = useSession();

    
      function toggle(){
          setOpen(!open)
      }
  
    return (
      <div className="bg-gradient-to-r from-purple-700 to-purple-400 fixed top-0 left-0 w-full z-50">
  <div className="flex justify-between items-center px-6 py-4 text-white">
    <h1 className="text-xl font-bold">Play Music</h1>
    
    <div className="space-x-4 flex">
      <div>
        {!roomId ? <Button variant="contained"
            onClick={toggle}
            color="primary">
          create room
          </Button>:<Button variant="contained"
            onClick={toggle}
            color="primary">
            Join Room
            </Button>}
            {open&&!roomId&& <div className="bg-gray-800 w-60 h-30 flex flex-col gap-2 rounded-2xl p-4 mt-2">
            <input className="px-4 py-2 bg-white rounded  mt-2 text-black" ref={inputRef} type="text" placeholder="Space Name">
            </input>
            <Button  variant="contained" color="primary"  onClick={()=>joinRoom(id)}>create</Button>
    </div>}
        {roomId && <div className="bg-gray-800 w-60 h-30 flex flex-col gap-2 rounded-2xl p-4 mt-2">
          <input className="px-4 py-2 bg-white rounded  mt-2 text-black" ref={inputRef} type="text" placeholder="Space Name">
          </input>
        </div>}
      </div>
      {session?.data?.user ? (
        <Button variant="contained" color="primary" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </div>
  </div>
</div>
  )
}