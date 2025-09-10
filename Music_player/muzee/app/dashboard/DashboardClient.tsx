"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { ChevronUp , ChevronDown } from "lucide-react";
import Chat from "./Chat";
interface Video {
  id: string;
  title: string;
  upvotes: number;
  downvotes: number;
  smallThumbnail: string;
  extractedId: string;
  url: string;
  bigThumbnail: string;
  haveVoted: boolean;
}

export default function DashboardClient() {
  const [url, setUrl] = useState("");
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const playerRef = useRef<any>(null);
  const [isvoted, setIsVoted] = useState(false);
  const lastVideoIdRef = useRef<string | null>(null);
  const { data: session } = useSession();
  const refreshQueue = useCallback(async () => {
    const res = await fetch("/api/streams/my");
    if (!res.ok) return;
    const { streams } = await res.json();
    console.log("Fetched streams:", streams);
    console.log("this is the queue", queue);
    const sorted = [...streams].sort(
      (a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
    );
    setQueue(sorted);
    setCurrentVideo((cv) => {
      if (!cv) return sorted[0] ?? null;
      const stillInQueue = sorted.find((v) => v.id === cv.id);
      return stillInQueue ?? sorted[0];
    });
  }, []);

  useEffect(() => {
    refreshQueue();
    const iv = setInterval(refreshQueue, 10000);
    return () => clearInterval(iv);
  }, [refreshQueue]);

  const deleteCurrentVideo = async (videoId: string) => {
  if (!videoId) return;

  // Fire and forget — no `await`
  fetch("/api/streams", {
    method: "DELETE",
    body: JSON.stringify({ id: videoId }),
  }).catch((err) => {
    console.error("Failed to delete video", err);
    // Optional: Add a way to retry or notify user
  });
};

const playNextVideoByVotes = () => {
  if (!currentVideo) return;

  // Optimistically remove the current video from the queue
  const updatedQueue = queue.filter((v) => v.id !== currentVideo.id);

  // Sort the remaining queue by votes
  const sortedQueue = [...updatedQueue].sort(
    (a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
  );

  // Update state immediately
  setQueue(sortedQueue);
  setCurrentVideo(sortedQueue[0] ?? null);

  // Now send the delete request in the background
  deleteCurrentVideo(currentVideo.id);
};

  
  const handleVote = async (id: string, haveVoted: boolean) => {
    setIsVoted(voted => !voted)
    if (haveVoted) {
      setQueue((q) =>
        [...q]
          .map((v: Video) => {
            if (v.id === id) {
              return {
                ...v,
                upvotes: v.upvotes-1,
                haveVoted: false
              };
            }
            return v;
          })
          .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
      );
    } else {
      setQueue((q) =>
        [...q]
          .map((v: Video) => {
            if (v.id === id) {
              return {
                ...v,
                upvotes: v.upvotes + 1,
                haveVoted: true
              };
            }
            return v;
          })
          .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
      );
    }
    await fetch("/api/streams/upvotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ streamId: id }),
    });

    
  };

  const handleSubmit = async () => {
    if (!url.startsWith("https")) return;
    await fetch(`/api/streams`, {
      method: "POST",
      body: JSON.stringify({
        creatorId: session?.user?.id ?? "",
        url,
      }),
    });
    setUrl("");
    refreshQueue();
  };

  const share = () => {
    if (!currentVideo) return;
    const link = new URL(window.location.href);
    link.searchParams.set("play", currentVideo.id);
    navigator.clipboard.writeText(link.toString());
    alert("Share link copied!");
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    if (!currentVideo || !window.YT || !window.YT.Player) return;
    const currentId = currentVideo.extractedId;

    if (lastVideoIdRef.current === currentId) return;

    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (err) {
        console.warn("YT Player destroy failed:", err);
      }
      playerRef.current = null;
    }

    playerRef.current = new window.YT.Player("yt-player", {
      videoId: currentId,
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
        },
        onStateChange: async (event: any) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            await playNextVideoByVotes();
          }
        },
      },
    });

    lastVideoIdRef.current = currentId;
  }, [currentVideo]);
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (err) {
          console.warn("YT Player cleanup failed:", err);
        }
      }
    };
  }, []);

  return (
    <div className="bg-purple-700 min-h-screen text-white">
      
  <div className="flex flex-col md:flex-row h-full justify-center items-start md:items-center  py-10 space-y-10 md:space-y-0 md:space-x-10">
    
    {queue.length>0 && <div className="w-full md:w-1/3 p-6 bg-purple-800 rounded-lg overflow-y-auto max-h-[90vh] mt-8">
    <h2 className="text-2xl font-bold mb-6">Current Playlist</h2>
      <ul className="space-y-4">
        {queue.map((vid, key) => (
          <li
            key={vid.id}
            className="flex items-center space-x-4 p-4 bg-gray-800 rounded hover:bg-gray-600 transition-all duration-300"
          >
            <img
              src={vid.smallThumbnail}
              alt={vid.title}
              className="w-30 h-26 object-cover rounded"
            />
            <div className="flex-1 flex flex-col">
              <p className="font-semibold">{vid.title}</p>
              <div className="flex items-center mt-2 space-x-2">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-md transition-colors"
                  onClick={() => handleVote(vid.id, vid.haveVoted)}
                >
                  {vid.upvotes ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </div>
                <span>{vid.upvotes}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
}
    <div className="w-full md:w-1/3 p-6 bg-purple-800 rounded-lg flex flex-col items-center max-h-[90vh] overflow-y-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Now Playing</h1>

      <div className="w-full">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 mb-3 text-white"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={handleSubmit}
          className="w-full mb-4"
        >
          Add Video
        </Button>
        <div
          id="yt-player"
          className="rounded-lg shadow-lg bg-white w-full aspect-video mt-2"
        />
      </div>
      {currentVideo ? (
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
          <button
            className="flex-1 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors"
            onClick={playNextVideoByVotes}
          >
            Next ▶️
          </button>
          <button
            className="flex-1 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors"
            onClick={share}
          >
            Share
          </button>
        </div>
      ) : (
        <p className="text-gray-300 mt-6">No video to play...</p>
      )}
    </div>
    <div className="w-full md:w-1/3 p-6 rounded-lg flex flex-col justify-baseine items-end max-h-[90vh] overflow-y-auto mt-8 items-baseline">
      <Chat/>
    </div>
    
  </div>
</div>
  );
}
