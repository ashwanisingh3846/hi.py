"use client";
import { createContext, useState, useRef, useContext, useEffect } from "react";

type SocketContextType = {
    roomId: string | null;
    messages: string[];
    sendMessage: (msg: string) => void;
    joinRoom: (id: string) => void;
    streams: string[];
    addVideoToRoom:() => void
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [roomId, setRoomId] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const socketRef = useRef<WebSocket | null>(null);
    const [streams, setStreams] = useState<string[]>([])
    useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    socketRef.current = socket;

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
            setMessages((prev) => [...prev, data.payload.message]);
        }
        else if (data.type === "join") {
            alert(data.payload.roomId)
            setRoomId(data.payload.roomId);
        }
        else if(data.type ==="add"){
            setStreams(data.payload.stream)
        }
    };

    return () => socket.close();

    }, []);

    function sendMessage(msg: string) {
        if (!roomId) return;
        socketRef.current?.send(
        JSON.stringify({ type: "chat", payload: { roomId, message: msg } })
        );
    }

    function joinRoom(name: string) {
        socketRef.current?.send(JSON.stringify({ type: "join", payload: { roomName: name } }));
    }
    function addVideoToRoom(){

    }
    
    return (
        <SocketContext.Provider value={{ roomId, messages, sendMessage, joinRoom,streams ,addVideoToRoom}}>
        {children}
        </SocketContext.Provider>
    );
    }
    export function useSocket() {
    const ctx = useContext(SocketContext);
    if (!ctx) throw new Error("useSocket must be used inside SocketProvider");
    return ctx;
}
