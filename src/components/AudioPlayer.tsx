'use client'
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

export default function FloatingMusicWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const playAudio = () => {
        audioRef.current?.play().then(() => setIsPlaying(true)).catch((e) => console.error("Autoplay error:", e));
    };
    const pauseAudio = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(prev => !prev);
    };

     const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsMinimized(true);
        }, 5000); // 5 seconds of inactivity
    };

    useEffect(() => {
        const widgetElement = widgetRef.current;

        if (!widgetElement) return;

        // Listen to activity inside the widget
        const handleActivity = () => {
            resetInactivityTimer();
        };

        widgetElement.addEventListener('mousemove', handleActivity);
        widgetElement.addEventListener('touchstart', handleActivity);

        // Start timer initially
        resetInactivityTimer();

        return () => {
            widgetElement.removeEventListener('mousemove', handleActivity);
            widgetElement.removeEventListener('touchstart', handleActivity);
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

      return (
        <Draggable>
            <div 
                ref={widgetRef}
                className="fixed bottom-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700 rounded-full transition hover:shadow-2xl"
                style={{ padding: '0.5rem 1rem', width: isMinimized ? '60px' : '120px' }}
            >
                <audio ref={audioRef} src="/audio/mysong.mp3" loop preload="auto" />

                {isMinimized ? (
                    <div className='flex items-center justify-center space-x-2'>
                        <button
                            onClick={toggleMinimize}
                            className='text-gray-600 dark:text-gray-300'
                            aria-label='Expand player'
                        >
                            <FaMusic />
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center space-x-3'>
                        <button
                            onClick={playAudio}
                            className={`px-2 py-1 rounded ${isPlaying ? 'bg-transparent' : 'bg-transparent'} text-black`}
                            aria-label='Play Music'
                        >
                            <FaPlay />
                        </button>
                        <button
                            onClick={pauseAudio}
                            className='bg-transparent text-black px-2 py-1 rounded'
                            aria-label='Pause Music'
                        >
                            <FaPause />
                        </button>
                    </div>
                )}
            </div>
        </Draggable>
      );
}