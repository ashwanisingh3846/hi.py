
import Button from "@mui/material/Button";



export default function Body() {
  return (
<div className="pt-24"> {/* Padding top to avoid Appbar overlap */}
  <div className="flex flex-col items-center text-center px-4">
    <h1 className="text-4xl font-bold mb-4">
      Let your fans choose the music
    </h1>
    <p className="mb-6 max-w-xl font-medium text-md">
      Empower your fans to curate your playlist and enjoy a collaborative music experience.
    </p>

    <div className="flex gap-5 mb-10">
      <Button variant="contained" color="primary" href="/dashboard">
        Get Started
      </Button>
      <Button variant="outlined" color="primary">
        Learn More
      </Button>
    </div>

    {/* Features Section */}
    <div className="w-full py-20 bg-gradient-to-r from-black via-blue-800 to-blue-400 text-white">
      <h2 className="text-2xl font-semibold mb-10">Key Features</h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Feature 1 */}
        <div className="text-center max-w-xs">
          <img
            className="w-20 h-20 mx-auto mb-4"
            src="https://cdn.icon-icons.com/icons2/2395/PNG/512/sound_music_songs_icon_145685.png"
            alt="Play Together"
          />
          <p>Play Together</p>
        </div>

        {/* Feature 2 */}
        <div className="text-center max-w-xs">
          <img
            className="w-20 h-20 rounded-full mx-auto mb-4"
            src="https://tse2.mm.bing.net/th/id/OIP.DsIV-Jv3_rYDZLp-qgZuZgHaHa?pid=Api&P=0&h=220&w=220"
            alt="Fan Interaction"
          />
          <p>Fan Interaction</p>
        </div>

        {/* Feature 3 */}
        <div className="text-center max-w-xs">
          <img
            className="w-20 h-20 rounded-full mx-auto mb-4"
            src="https://thumbs.dreamstime.com/z/wifi-hotspot-icon-vector-isolated-yellow-circle-connecting-hotspot-icon-web-mobile-phone-wifi-hotspot-icon-vector-178013557.jpg"
            alt="Live Streaming"
          />
          <p>Live Streaming</p>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}