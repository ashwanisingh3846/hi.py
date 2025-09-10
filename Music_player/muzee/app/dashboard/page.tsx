
"use client";
import dynamic from "next/dynamic";
const DashboardClient = dynamic(() => import("./DashboardClient"), {
    ssr: false,
});

export default function Page() {
    return(
        <div className="pt-16 bg-purple-700 min-h-screen text-white">
    <DashboardClient />
        </div>
);
}
