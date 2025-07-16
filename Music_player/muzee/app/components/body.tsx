
import Button from "@mui/material/Button";



export default function Body() {
  return (
    <div>
        <div className="w-full h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-center py-50   flex flex-col justify-between items-center">
            <h1 className="text-4xl font-bold p-10">
                Let choose your music by your fans
            </h1>
            <p>
                let choose your music by your fans And curate your own playlists . 
            </p>
            <div className="gap-5 flex p-5">
                <Button variant="contained" color="primary">
                    Get Started
                </Button> 
                <Button variant="contained" color="primary">
                    learn more
                </Button>
            </div>
        <div>
        </div>
    </div>
        </div>
    );
}