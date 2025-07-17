"use client"
import { useState } from "react"
import { useEffect } from "react"
export default function Dashboard(){
    const [res,setRes] = useState(null)
    async function handler(){
        const response = await fetch("api/streams" ,
            {
                method :"POST",
                    url:"https://www.youtube.com/watch?v=vsWxs1tuwDk&list=RDcl0a3i2wFcc&index=2"
                })
            
        setRes(await response.json())
}
    useEffect(()=>{
        handler();
    }, [])
    return (
        <div className="flex flex-col gap-10 items-center">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <input className=" px-4 py-2 rounded border-2 border-black" type="text" placeholder="url"/>
            <button onClick={ ()=> handler()} className=" px-8 py-2 rounded border-2 border-black">Submit</button>
        </div>
    )
}