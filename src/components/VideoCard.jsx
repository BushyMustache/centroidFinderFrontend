import { useNavigate } from 'react-router-dom'

function VideoCard({ filename }) {
  const navigate = useNavigate()

  const thumbnailUrl =
    `/api/thumbnail/${encodeURIComponent(filename)}`

  function openVideo() {
    navigate(`/preview/${encodeURIComponent(filename)}`)
  }

  return (
    <button
      type="button"
      className="video-card"
      onClick={openVideo}
      aria-label={`Open ${filename}`}
    >
      <div className="video-card-image">
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${filename}`}
          loading="lazy"
        />

        <span className="video-card-play">
          ▶
        </span>
      </div>

      <div className="video-card-details">
        <span className="video-card-name" title={filename}>
          {filename}
        </span>
      </div>
    </button>
  )
}

export default VideoCard
