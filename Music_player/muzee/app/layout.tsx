"use client";

import Appbar from "./components/Appbar";
import { SocketProvider } from "./components/roomContext";
import "./globals.css";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SocketProvider>
            <Appbar />
            {children}
            </SocketProvider>
        </Providers>
      </body>
    </html>
  );
}
