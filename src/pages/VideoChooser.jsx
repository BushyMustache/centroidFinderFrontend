import useVideos from '../hooks/useVideos'
import VideoCard from '../components/VideoCard'

function VideoChooser() {
  const { videos, loading, error } = useVideos()

  return (
    <main className="video-library">
      <header className="library-header">
        <div className="library-brand">
          <div>
            <h2>Centroid Finder</h2>
          </div>
        </div>
      </header>

      <section className="library-content">
        <div className="library-heading">
          <div>
            <h1>Select a video</h1>
            <p>
              Choose a video to configure color detection, track centroids, and generate a CSV of the results
            </p>
          </div>
        </div>

        {loading && <p>Loading videos...</p>}

        {error && (
          <p className="process-error">{error}</p>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="empty-library">
            No videos found. Add a video to your
            processor's sampleInput directory.
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="video-grid">
            {videos.map((filename) => (
              <VideoCard
                key={filename}
                filename={filename}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default VideoChooser
