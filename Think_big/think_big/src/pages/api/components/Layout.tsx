import Link from 'next/link';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
        <div className="min-h-screen bg-gradient-to-r from-sky-500 to-violet-600 text-white">
        <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
            <Link href="/" passHref>
                
                <img style={{"width":"80px"}} src="/thinkbig.png" alt="thinkbig logo" />
                </Link>
            
            </div>
            <nav className="flex items-center gap-4">
            <Link href="/onboarding">Start</Link>
            <Link href="/dashboard"> Dashboard</Link>
            </nav>
        </header>

        <main className="max-w-6xl mx-auto p-6">
            {children}
        </main>

        <footer className="mt-8 p-4 text-center text-sm opacity-90">© ThinkBig</footer>
        </div>
        </>
    );
};

export default Layout;
