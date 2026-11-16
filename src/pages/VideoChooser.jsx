import useVideos from "../hooks/useVideos";
import VideoCard from "../components/VideoCard";

export default function VideoChooser() {
    const { videos, loading, error } = useVideos();

    if (loading) return <h2>Loading videos...</h2>

    if (error) return <p>Error: {error}</p>

    return (
        <div className="video-chooser">
            <h1>Centroid Finder</h1>
            <p>Select a video to begin processing</p>

            <div className="video-list">
                {videos.map((video) => (
                    <div key={video} className="video-card">
                        <VideoCard key={video} filename={video} />
                    </div>
                ))}
            </div>
        </div>
    )
}