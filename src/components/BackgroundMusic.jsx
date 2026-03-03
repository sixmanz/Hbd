import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = ({ isPlaying }) => {
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }

        // Global click listener to unlock audio if autoplay was blocked
        const enableAudio = () => {
            if (audioRef.current && audioRef.current.paused && isPlaying) {
                audioRef.current.play().catch(e => console.log("Still blocked", e));
            }
        };

        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);

        return () => {
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay blocked. Waiting for user interaction...", error);
                });
            }
        }
    }, [isPlaying]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const [audioSource, setAudioSource] = useState(import.meta.env.BASE_URL + "song.mp3");

    const handleAudioError = () => {
        if (audioSource.endsWith("song.mp3")) {
            console.log("song.mp3 not found, falling back to generated audio.");
            setAudioSource(import.meta.env.BASE_URL + "guncharlie.wav");
        } else {
            console.error("All audio sources failed.");
        }
    };

    if (!isPlaying) return null;

    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleMute}
                className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white text-pink-500 transition-all"
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <audio
                ref={audioRef}
                src={audioSource}
                loop
                onError={handleAudioError}
            />
        </div>
    );
};

export default BackgroundMusic;
