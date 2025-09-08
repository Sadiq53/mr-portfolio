import type { PageProps } from "../../types/ui";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import portfolio_1 from '../../assets/Videos/3D_Shoe.mp4';
import portfolio_2 from '../../assets/Videos/Coffee_Showcase.mp4';
import portfolio_3 from '../../assets/Videos/Cold_Coffee.mp4';
import portfolio_4 from '../../assets/Videos/Energy_Drink.mp4';
import portfolio_5 from '../../assets/Videos/Logo_SBC_Aimation_2.mp4';
import portfolio_6 from '../../assets/Videos/MohsinRaj_portfolio.mp4';
import portfolio_7 from '../../assets/Videos/Nike_Air_Max_270.mp4';
import portfolio_8 from '../../assets/Videos/SBC_Project_Showcase_2.mp4';
import portfolio_9 from '../../assets/Videos/SBC_Reel.mp4';
import portfolio_10 from '../../assets/Videos/Script.mp4';
import portfolio_11 from '../../assets/Videos/Shoe_Swing.mp4';
import portfolio_12 from '../../assets/Videos/Shoe_slide_show.mp4';
import portfolio_13 from '../../assets/Videos/Slideshow_2_main.mp4';
import portfolio_14 from '../../assets/Videos/spydey_render.mp4';
import portfolio_15 from '../../assets/Videos/wedding_render.mp4';

// Enhanced video configuration with metadata
const videoSources = [
    { src: portfolio_1, title: "3D Shoe Animation" },
    { src: portfolio_2, title: "Coffee Showcase" },
    { src: portfolio_3, title: "Cold Coffee" },
    { src: portfolio_4, title: "Energy Drink" },
    { src: portfolio_5, title: "Logo SBC Animation" },
    { src: portfolio_6, title: "MohsinRaj Portfolio" },
    { src: portfolio_7, title: "Nike Air Max 270" },
    { src: portfolio_8, title: "SBC Project Showcase" },
    { src: portfolio_9, title: "SBC Reel" },
    { src: portfolio_10, title: "Script Animation" },
    { src: portfolio_11, title: "Shoe Swing" },
    { src: portfolio_12, title: "Shoe Slideshow" },
    { src: portfolio_13, title: "Main Slideshow" },
    { src: portfolio_14, title: "Spidey Render" },
    { src: portfolio_15, title: "Wedding Render" }
];

interface VideoState {
    loading: boolean;
    error: boolean;
    canPlay: boolean;
}

const Portfolio = ({ activeSection, backSection }: PageProps) => {
    // Memoize video sources for stability
    const memoVideoSources = useMemo(() => videoSources, []);

    // Use ref for video elements
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Enhanced state management
    const [fullScreenIdx, setFullScreenIdx] = useState<number | null>(null);
    const [videoStates, setVideoStates] = useState<VideoState[]>(
        Array(videoSources.length).fill({ loading: true, error: false, canPlay: false })
    );
    const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver | null>(null);

    // Update video state helper
    const updateVideoState = useCallback((index: number, updates: Partial<VideoState>) => {
        setVideoStates(prev => prev.map((state, i) =>
            i === index ? { ...state, ...updates } : state
        ));
    }, []);

    // Enhanced fullscreen handling with better browser support
    const handleFullScreenChange = useCallback(() => {
        const fullscreenElement =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement;

        if (!fullscreenElement) {
            setFullScreenIdx(null);
            return;
        }

        const idx = videoRefs.current.findIndex(vid => vid === fullscreenElement);
        setFullScreenIdx(idx !== -1 ? idx : null);
    }, []);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const video = entry.target as HTMLVideoElement;
                        const index = videoRefs.current.findIndex(v => v === video);

                        if (index !== -1 && !videoStates[index].canPlay) {
                            // Preload video when it comes into view
                            video.load();
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        setIntersectionObserver(observer);

        return () => observer.disconnect();
    }, [videoStates]);

    // Setup fullscreen event listeners
    useEffect(() => {
        const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

        events.forEach(event => {
            document.addEventListener(event, handleFullScreenChange);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleFullScreenChange);
            });
        };
    }, [handleFullScreenChange]);

    // Enhanced fullscreen function with error handling
    const handleFullScreen = useCallback(async (index: number) => {
        const video = videoRefs.current[index];
        if (!video) return;

        try {
            // Ensure video is ready before going fullscreen
            if (video.readyState < 2) {
                await new Promise((resolve) => {
                    video.addEventListener('loadeddata', resolve, { once: true });
                });
            }

            setFullScreenIdx(index);

            // Try different fullscreen methods
            if (video.requestFullscreen) {
                await video.requestFullscreen();
            } else if ((video as any).webkitRequestFullscreen) {
                (video as any).webkitRequestFullscreen();
            } else if ((video as any).mozRequestFullScreen) {
                (video as any).mozRequestFullScreen();
            } else if ((video as any).msRequestFullscreen) {
                (video as any).msRequestFullscreen();
            }

            // Play video when entering fullscreen
            if (video.paused) {
                try {
                    await video.play();
                } catch (playError) {
                    console.warn('Could not play video:', playError);
                }
            }
        } catch (error) {
            console.error('Fullscreen failed:', error);
            setFullScreenIdx(null);
        }
    }, []);

    // Video event handlers
    const handleVideoLoadStart = useCallback((index: number) => {
        updateVideoState(index, { loading: true, error: false });
    }, [updateVideoState]);

    const handleVideoCanPlay = useCallback((index: number) => {
        updateVideoState(index, { loading: false, canPlay: true, error: false });
    }, [updateVideoState]);

    const handleVideoError = useCallback((index: number, error: any) => {
        console.error(`Video ${index} error:`, error);
        updateVideoState(index, { loading: false, error: true, canPlay: false });
    }, [updateVideoState]);

    const handleVideoLoadedData = useCallback((index: number) => {
        updateVideoState(index, { loading: false });
    }, [updateVideoState]);

    // Setup video observers when refs change
    useEffect(() => {
        if (intersectionObserver) {
            videoRefs.current.forEach((video) => {
                if (video) {
                    intersectionObserver.observe(video);
                }
            });
        }

        return () => {
            if (intersectionObserver) {
                videoRefs.current.forEach((video) => {
                    if (video) {
                        intersectionObserver.unobserve(video);
                    }
                });
            }
        };
    }, [intersectionObserver, memoVideoSources]);

    return (
        <section
            className={`portfolio section${activeSection === "portfolio" ? " active" : ""} ${backSection === "portfolio" ? " back-section" : ""}`}
            id="portfolio"
        >
            <div className="container">
                <div className="row">
                    {memoVideoSources.map((videoConfig, idx) => (
                        <div className="portfolio-item padd-15" key={`video-${idx}`}>
                            <div className="portfolio-item-inner shadow-dark">
                                <div className="portfolio-img" style={{ position: 'relative' }}>
                                    {/* Loading indicator */}
                                    {videoStates[idx]?.loading && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            color: '#fff',
                                            zIndex: 1
                                        }}>
                                            Loading...
                                        </div>
                                    )}

                                    {/* Error state */}
                                    {videoStates[idx]?.error && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'rgba(0, 0, 0, 0.7)',
                                            color: '#fff',
                                            zIndex: 1,
                                            flexDirection: 'column'
                                        }}>
                                            <div>⚠️ Video failed to load</div>
                                            <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
                                                {videoConfig.title}
                                            </div>
                                        </div>
                                    )}

                                    <video
                                        ref={el => { 
                                            videoRefs.current[idx] = el; 
                                        }}    
                                        src={videoConfig.src}
                                        width={320}
                                        height={240}
                                        controls={!videoStates[idx]?.loading}
                                        muted
                                        loop
                                        autoPlay
                                        playsInline // Important for mobile devices
                                        preload="metadata" // Changed from "auto" to reduce initial load
                                        crossOrigin="anonymous" // Handle CORS issues
                                        title={videoConfig.title}
                                        style={{
                                            objectFit: fullScreenIdx === idx ? "contain" : "cover",
                                            width: fullScreenIdx === idx ? "100vw" : "100%",
                                            height: fullScreenIdx === idx ? "100vh" : 240,
                                            maxWidth: fullScreenIdx === idx ? "none" : 320,
                                            cursor: videoStates[idx]?.canPlay ? "pointer" : "default",
                                            background: "#000",
                                            display: 'block'
                                        }}
                                        onClick={() => {
                                            if (videoStates[idx]?.canPlay) {
                                                handleFullScreen(idx);
                                            }
                                        }}
                                        onLoadStart={() => handleVideoLoadStart(idx)}
                                        onCanPlay={() => handleVideoCanPlay(idx)}
                                        onLoadedData={() => handleVideoLoadedData(idx)}
                                        onError={(e) => handleVideoError(idx, e)}
                                        onContextMenu={(e) => e.preventDefault()} // Disable right-click menu
                                    />

                                    {/* Enhanced fullscreen button */}
                                    {videoStates[idx]?.canPlay && (
                                        <button
                                            type="button"
                                            className="full-screen-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFullScreen(idx);
                                            }}
                                            title="Enter Fullscreen"
                                            style={{
                                                position: "absolute",
                                                right: 10,
                                                bottom: 10,
                                                zIndex: 2,
                                                background: "rgba(0, 0, 0, 0.7)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 4,
                                                padding: "8px 12px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                transition: "background 0.2s",
                                                backdropFilter: "blur(5px)"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "rgba(0, 0, 0, 0.9)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
                                            }}
                                        >
                                            ⛶
                                        </button>
                                    )}

                                    {/* Video title overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                                        color: '#fff',
                                        padding: '20px 10px 10px',
                                        fontSize: '0.9em',
                                        fontWeight: '500'
                                    }}>
                                        {videoConfig.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;