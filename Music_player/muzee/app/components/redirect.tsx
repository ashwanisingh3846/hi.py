
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default  function Redirect(){

    const session = useSession();
    const router = useRouter();
    useEffect(()=>{
        if(session?.data?.user){
            router.push("/dashboard")
        }
    },[session?.data?.user])
    return (
        <div>
        </div>
    )
}