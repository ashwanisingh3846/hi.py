
import Button from "@mui/material/Button";



export default function Body() {
  return (
    <div>
        <div className="w-full  flex justify-center flex flex-col justify-between items-center">
            <h1 className="text-4xl font-bold p-10">
                Let choose your music by your fans
            </h1>
            <p>
                let choose your music by your fans And curate your own playlists . 
            </p>
            <div className="gap-5 flex p-5">
                <Button variant="contained" color="primary" href="/dashboard">
                    Get Started
                </Button> 
                <Button variant="contained" color="primary">
                    learn more
                </Button>
            </div>
            <div className="
             w-full flex flex-col gap-10 items-center py-20 bg-gradient-to-rt from-black-100 to-blue-400 text-white">
                <h1 className=" text-xl ">Key Features</h1>
                <div  className="flex flex-row gap-10 justify-center items-center w-full ">
                <div className="text-center">
                    <img className="w-30 h-30" src="https://cdn.icon-icons.com/icons2/2395/PNG/512/sound_music_songs_icon_145685.png" alt="" />
                    <p>play together</p>
                </div>
                <div  className="text-center">
                    <img className="w-30 h-30 rounded-full"  src="https://tse2.mm.bing.net/th/id/OIP.DsIV-Jv3_rYDZLp-qgZuZgHaHa?pid=Api&P=0&h=220&w=220" alt="" />
                    <p>Fan interaction</p>
                </div>
                <div  className="text-center">
                    <img src="https://thumbs.dreamstime.com/z/wifi-hotspot-icon-vector-isolated-yellow-circle-connecting-hotspot-icon-web-mobile-phone-wifi-hotspot-icon-vector-178013557.jpg" alt="" className="w-30 h-30 rounded-full color-white"/>
                    <p>Live streaming</p>
                </div>
                </div>
            </div>
        <div>
        </div>
    </div>
        </div>
    );
}